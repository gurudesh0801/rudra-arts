import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      className="relative min-h-screen py-24 px-6 text-gray-900 font-outfit"
      style={{
        backgroundImage: "url('/images/border.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-customBrown mb-4 mt-6 font-playfair">
            Get In Touch
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-60 h-1 bg-customBrown mx-auto mb-4"
          />
          <p className="text-lg text-black max-w-xl mx-auto">
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form First */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeIn}
            className="bg-white p-8 rounded-xl shadow-2xl"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-customBrown text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition font-medium shadow-lg mt-2"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info Second */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeIn}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-2xl"
          >
            <h3 className="text-2xl font-semibold mb-6 text-customBrown text-center">
              Contact Information
            </h3>

            <div className="space-y-6 ">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-customBrown rounded-full">
                  <FaMapMarkerAlt className="text-amber-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-black font-medium">Our Location</h4>
                  <p className="text-black/80">
                    Famous Chowk, Kirti Nagar Ln No. 1, Ganesh Nagar, Samata
                    Nagar, New Sangavi, Pune, Pimpri-Chinchwad, Maharashtra
                    411027
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-customBrown rounded-full">
                  <FaEnvelope className="text-amber-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-black font-medium">Email Address</h4>
                  <a
                    href="mailto:contact@rudraarts.com"
                    className="text-black/80 hover:text-orange-700 transition"
                  >
                    contact@rudraarts.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-customBrown rounded-full">
                  <FaPhone className="text-amber-400 text-xl" />
                </div>
                <div>
                  <h4 className="text-black font-medium">Phone Number</h4>
                  <a
                    href="tel:+917028996666"
                    className="text-black/80 hover:text-orange-700 transition"
                  >
                    +91 7028996666
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:rudraarts@gmail.com"
                className="flex items-center justify-center gap-2 bg-customBrown text-white px-6 py-3 rounded-lg hover:bg-amber-500 transition font-medium shadow-lg"
              >
                <FaEnvelope /> Email Us
              </a>
              <a
                href="https://wa.me/7028996666"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium shadow-lg"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
