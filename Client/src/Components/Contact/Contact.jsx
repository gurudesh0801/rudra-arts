import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const ContactSection = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 font-times bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-normal text-amber-900 mb-6 relative inline-block mt-20"
          >
            <AnimatedUnderline>Get In Touch</AnimatedUnderline>
          </motion.h2>
          <motion.p
            variants={item}
            className="text-lg text-amber-800 max-w-2xl mx-auto"
          >
            We cherish every conversation about our traditional craftsmanship.
            Reach out for inquiries, collaborations, or just to say hello.
          </motion.p>
        </motion.div>

        {/* Contact Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {/* Contact Form */}
          <motion.div
            variants={item}
            className="bg-white p-8 rounded-xl shadow-lg border border-amber-100"
          >
            <div className="flex items-center mb-8">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <FaPaperPlane className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-2xl font-normal text-amber-900">
                Send Us a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={item}>
                <label className="block text-amber-800 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-b border-customBrown focus:border-amber-800 outline-none bg-transparent transition-all"
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div variants={item}>
                <label className="block text-amber-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-b border-customBrown focus:border-amber-800 outline-none bg-transparent transition-all"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div variants={item}>
                <label className="block text-amber-800 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full px-4 py-3 border-b border-customBrown focus:border-amber-800 outline-none bg-transparent transition-all"
                  placeholder="Share your thoughts with us..."
                />
              </motion.div>

              <motion.div variants={item}>
                <button
                  type="submit"
                  className="mt-6 px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-all flex items-center gap-2 mx-auto lg:mx-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={item} className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-100">
              <div className="flex items-center mb-8">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-amber-600 text-xl" />
                </div>
                <h3 className="text-2xl font-normal text-amber-900">
                  Our Studio
                </h3>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="text-amber-600 mt-1">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-900 mb-1">Address</h4>
                    <p className="text-amber-800">
                      Famous Chowk, Kirti Nagar Ln No. 1,
                      <br />
                      Ganesh Nagar, Samata Nagar,
                      <br />
                      New Sangavi, Pune, Pimpri-Chinchwad,
                      <br />
                      Maharashtra 411027
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="text-amber-600 mt-1">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-900 mb-1">Email</h4>
                    <a
                      href="mailto:rudra.arts30@gmail.com"
                      className="text-amber-800 hover:text-amber-600 transition"
                    >
                      rudra.arts30@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="text-amber-600 mt-1">
                    <FaPhone />
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-900 mb-1">Phone</h4>
                    <a
                      href="tel:+917028996666"
                      className="text-amber-800 hover:text-amber-600 transition"
                    >
                      +91 7028996666
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.a
                href="mailto:rudra.arts30@gmail.com"
                className="bg-amber-600 text-white p-4 rounded-lg hover:bg-amber-700 transition flex flex-col items-center justify-center text-center"
                whileHover={{ y: -5 }}
              >
                <FaEnvelope className="text-2xl mb-2" />
                <span>Email Us</span>
              </motion.a>

              <motion.a
                href="https://wa.me/7028996666"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition flex flex-col items-center justify-center text-center"
                whileHover={{ y: -5 }}
              >
                <FaWhatsapp className="text-2xl mb-2" />
                <span>WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
