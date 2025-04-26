from flask import Flask, render_template, request, Response, jsonify
from ultralytics import YOLO
import cv2
import numpy as np
from datetime import datetime
import os
import threading
import time
from queue import Queue
import concurrent.futures

app = Flask(__name__, static_url_path='/static')

# Initialize YOLO model
model = YOLO('best.pt')

# Global variables
camera = None
detection_active = False
last_detection_time = None
detection_history = []
current_camera_index = 0

class Camera:
    def __init__(self, camera_index=0, resolution=(640, 480), fps=30):
        self.camera_index = camera_index
        self.resolution = resolution
        self.fps = fps
        self.frame_queue = Queue(maxsize=2)  # Limit buffer size
        self.last_frame_time = 0
        self.frame_interval = 1.0 / fps  # Minimum time between frames
        
        # Initialize video capture
        self.video = cv2.VideoCapture(self.camera_index)
        self.video.set(cv2.CAP_PROP_FRAME_WIDTH, resolution[0])
        self.video.set(cv2.CAP_PROP_FRAME_HEIGHT, resolution[1])
        self.video.set(cv2.CAP_PROP_FPS, fps)
        
        if not self.video.isOpened():
            raise ValueError(f"Failed to open camera {camera_index}")
            
        # Start frame capture thread
        self.capture_thread = threading.Thread(target=self._capture_frames, daemon=True)
        self.capture_thread.start()
        
    def __del__(self):
        self.video.release()
        
    def _capture_frames(self):
        """Continuous frame capture thread"""
        while True:
            current_time = time.time()
            
            # Control frame rate
            if current_time - self.last_frame_time < self.frame_interval:
                time.sleep(0.001)  # Short sleep to prevent CPU overload
                continue
                
            success, frame = self.video.read()
            if success:
                # Resize frame for better performance
                frame = cv2.resize(frame, self.resolution)
                
                # Update frame buffer
                if self.frame_queue.full():
                    try:
                        self.frame_queue.get_nowait()  # Remove old frame
                    except:
                        pass
                self.frame_queue.put(frame)
                self.last_frame_time = current_time
                
    def get_frame(self):
        """Get the latest frame"""
        try:
            return self.frame_queue.get_nowait()
        except:
            return None

def process_frame(frame):
    """Process a single frame with YOLO detection"""
    if frame is None:
        return None, None
        
    # Run YOLO detection
    results = model.predict(frame, imgsz=640, conf=0.6)
    
    # Process detection results
    annotated_frame = results[0].plot()
    
    return annotated_frame, results[0]

def generate_frames():
    global detection_active, last_detection_time
    
    frame_count = 0
    skip_frames = 2  # Process every nth frame
    
    while True:
        if not detection_active:
            break
            
        frame_count += 1
        if frame_count % skip_frames != 0:
            continue
            
        frame = camera.get_frame()
        if frame is None:
            continue
            
        # Process frame with YOLO
        annotated_frame, results = process_frame(frame)
        if annotated_frame is None:
            continue
            
        # Handle detections
        if results is not None and len(results.boxes) > 0:
            last_detection_time = datetime.now()
            confidence = results.boxes.conf.cpu().numpy()[0]
            
            detection_history.append({
                'timestamp': last_detection_time.strftime('%Y-%m-%d %H:%M:%S'),
                'confidence': f'{confidence:.3f}'
            })
            
            # Save detected frame
            if not os.path.exists('static/detections'):
                os.makedirs('static/detections')
            filename = f"static/detections/fire_{last_detection_time.strftime('%Y%m%d_%H%M%S')}.jpg"
            cv2.imwrite(filename, annotated_frame)
        
        # Convert frame to jpg
        ret, buffer = cv2.imencode('.jpg', annotated_frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
        if not ret:
            continue
            
        frame_data = buffer.tobytes()
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_data + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_detection', methods=['POST'])
def start_detection():
    global camera, detection_active
    
    if not detection_active:
        try:
            # Initialize camera with optimized settings
            camera = Camera(
                current_camera_index,
                resolution=(640, 480),  # Reduced resolution
                fps=15  # Lower FPS for better performance
            )
            detection_active = True
            return jsonify({'status': 'success', 'message': 'Detection started'})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})
    return jsonify({'status': 'error', 'message': 'Detection already running'})

@app.route('/stop_detection', methods=['POST'])
def stop_detection():
    global detection_active, camera
    
    if detection_active:
        detection_active = False
        if camera:
            del camera
            camera = None
        return jsonify({'status': 'success', 'message': 'Detection stopped'})
    return jsonify({'status': 'error', 'message': 'Detection not running'})

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                   mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_detection_status')
def get_detection_status():
    return jsonify({
        'active': detection_active,
        'last_detection': last_detection_time.strftime('%Y-%m-%d %H:%M:%S') if last_detection_time else None,
        'detection_history': detection_history[-5:]
    })

if __name__ == '__main__':
    app.run(debug=True, threaded=True)