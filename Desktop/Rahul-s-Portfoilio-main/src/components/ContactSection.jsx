import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function ContactSection() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      user_name: name,
      user_email: email,
      subject: subject,
      message: message,
    };

    emailjs
      .send(
        "service_ug1s6e2", // Replace with your EmailJS Service ID
        "template_m4kb07g", // Replace with your EmailJS Template ID
        templateParams,
        "zdMmFSzeHeonH77i5" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          setSuccess(true);
          setLoading(false);
          setName("");
          setSubject("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          setSuccess(false);
          setLoading(false);
        }
      );
  };

  return (
    <section className="py-12 px-6 section-glow-on-hover">
      <h2 className="text-4xl font-bold mb-6 text-primary-orange text-center">
        Get in Touch
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Feel free to reach out for collaborations, questions, or just a friendly chat!
      </p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-dark-background p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">Your Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-primary-orange focus:outline-none transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">Subject</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-primary-orange focus:outline-none transition-all"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-primary-orange focus:outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">Your Message</label>
          <textarea
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-primary-orange focus:outline-none transition-all"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            rows="5"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            className="bg-primary-orange text-dark-background font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-orange"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
        {success === true && <p className="text-green-500 text-center mt-4">Message sent successfully! ✅</p>}
        {success === false && <p className="text-red-500 text-center mt-4">Failed to send message. ❌</p>}
      </form>
    </section>
  );
}

export default ContactSection;
