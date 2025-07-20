import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
    <section className="min-h-screen py-16 px-6 bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12 mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-times font-normal text-amber-900 mb-4">
            <AnimatedUnderline>Contact Us</AnimatedUnderline>
          </h2>
          <p className="text-amber-800">
            We'd love to hear from you. Reach out with any questions or
            inquiries.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-amber-900">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-amber-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-amber-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full border border-amber-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-amber-900">
              Our Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="text-amber-600 mt-1">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-amber-800 text-sm">
                    Famous Chowk, Kirti Nagar Ln No. 1, Ganesh Nagar, Samata
                    Nagar, New Sangavi, Pune, Pimpri-Chinchwad,
                    Maharashtra 411027
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-amber-600 mt-1">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:contact@rudraarts.com"
                    className="text-amber-800 text-sm hover:text-amber-600"
                  >
                    rudra.arts30@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-amber-600 mt-1">
                  <FaPhone />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a
                    href="tel:+917028996666"
                    className="text-amber-800 text-sm hover:text-amber-600"
                  >
                    +91 7028996666
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="mailto:rudraarts@gmail.com"
                className="flex items-center justify-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition text-sm"
              >
                <FaEnvelope /> Email Us
              </a>
              <a
                href="https://wa.me/7028996666"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
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
