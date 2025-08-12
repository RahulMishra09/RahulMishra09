## ARU-NET and U-Net Architectures for Brain MRI Segmentation

A collection of Jupyter notebooks implementing U-Net variants (2D/3D U-Net and ARU-Net) for brain tumor MRI segmentation, with experiments on BraTS 2018/2019/2020 datasets.

This repository contains runnable, self-contained notebooks for training and inference. Some notebooks use PyTorch; others use TensorFlow/Keras. Medical-imaging utilities such as `nibabel`, `SimpleITK`, and optionally `MONAI` are used for handling NIfTI volumes and preprocessing.

### Repository contents
- `UNET.ipynb`: 2D U-Net baseline for MRI slices (PyTorch; medical imaging I/O with `nibabel`/`SimpleITK`).
- `3D-UNET.ipynb`: 3D U-Net for volumetric segmentation (PyTorch; may require more GPU memory).
- `aru-net-brats2018.ipynb`: ARU-Net experiment tailored for BraTS 2018 (TensorFlow/Keras).
- `aru-net-brats2019.ipynb`: ARU-Net experiment tailored for BraTS 2019 (TensorFlow/Keras).
- `aru_net_brats2020.ipynb`: ARU-Net experiment tailored for BraTS 2020 (TensorFlow/Keras).
- `latup-doudt.ipynb`: Additional experiments/utilities (TensorFlow/Keras) that support data loading, augmentation, or ablations.
- `Aru-net.pdf`, `Aru-net Architecture.pdf`, `ARU.pptx`: Slides and papers for ARU-Net design and results.

### What you can do with this project
- Train U-Net/ARU-Net models on BraTS datasets.
- Run inference on preprocessed NIfTI volumes.
- Customize augmentations, loss functions, and evaluation metrics (Dice, Hausdorff, etc.).

---

## Setup

Use either Conda or pip. Python 3.9–3.11 is recommended.

### Option A: Conda (recommended)
```bash
conda create -n unet python=3.10 -y
conda activate unet
# Core scientific stack
pip install numpy scipy scikit-image scikit-learn matplotlib seaborn tqdm
# Medical imaging
pip install nibabel SimpleITK
# Optional but helpful for medical DL
pip install monai
# Jupyter
pip install jupyter jupyterlab ipywidgets
# Deep learning (choose one family or install both if you plan to run all notebooks)
## PyTorch (with CPU/MPS/GPU per your platform)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
## TensorFlow (macOS/CPU)
pip install tensorflow
```

Notes:
- For NVIDIA GPUs, install the CUDA-enabled PyTorch build from the official selector, e.g. replace the `--index-url` line with the one provided at the PyTorch website.
- On Apple Silicon, PyTorch MPS backend is available in stable PyTorch; for TensorFlow, consider `tensorflow-macos` and `tensorflow-metal`.

### Option B: pip (virtualenv)
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install numpy scipy scikit-image scikit-learn matplotlib seaborn tqdm nibabel SimpleITK monai jupyter jupyterlab ipywidgets
# Pick one or install both depending on notebooks you want to run
pip install torch torchvision torchaudio
pip install tensorflow
```

---

## Datasets

These notebooks are designed for the BraTS datasets:
- BraTS 2018
- BraTS 2019
- BraTS 2020


You may need to adjust dataset paths in the first cells of each notebook (look for variables like `DATA_DIR`, `TRAIN_DIR`, or similar).

---

## Running the notebooks

1) Start Jupyter:
```bash
jupyter lab
# or
jupyter notebook
```

2) Open any of the notebooks:
- `UNET.ipynb`: 2D baseline; faster to iterate; less VRAM required.
- `3D-UNET.ipynb`: Full 3D model; ensure you have sufficient GPU memory.
- `aru-net-brats2018.ipynb`, `aru-net-brats2019.ipynb`, `aru_net_brats2020.ipynb`: ARU-Net variants for the corresponding BraTS releases.

3) Configure paths and parameters:
- Set dataset directories in the first configuration cell.
- Adjust training parameters (patch size, batch size, learning rate, epochs) as needed.
- Select the device (CPU/GPU). For PyTorch, `torch.device("cuda"/"mps"/"cpu")`. For TensorFlow, GPU is used automatically if available.

4) Run all cells. The notebooks will handle preprocessing, training, validation, and (optionally) saving predictions.

---

## Tips and troubleshooting

- If you get out-of-memory errors on 3D U-Net, reduce patch size or batch size.
- For mixed environments (both TensorFlow and PyTorch), it can be convenient to keep separate Conda envs: one for PyTorch, one for TensorFlow.
- macOS + Apple Silicon: prefer the latest stable versions of frameworks; enable `mps` in PyTorch for acceleration.
- Install `monai` to leverage medical-imaging transforms, sliding window inference, and utilities.

---

## Citations and references

- U-Net: Ronneberger O., Fischer P., Brox T. “U-Net: Convolutional Networks for Biomedical Image Segmentation.” MICCAI 2015.
- ARU-Net: See `Aru-net.pdf` and `Aru-net Architecture.pdf` in this repository for the architecture and ablation details.
- BraTS: Menze et al., Bakas et al. Brain Tumor Segmentation (BraTS) Challenges 2012–2020.

If you use this repository in academic work, please cite the appropriate papers above.


