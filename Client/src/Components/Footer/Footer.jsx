import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-customBrown text-white pt-10 font-times">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-[#D4AF37] inline-block pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-white">
                Blogs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Google Map */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-[#D4AF37] inline-block pb-2">
            Our Location
          </h3>
          <div className="rounded overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              className="w-full h-40"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.905637468456!2d144.95605511578965!3d-37.81621897975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df3f39f3d%3A0xa63d9d0c4b29f4f5!2sVictoria%20Market!5e0!3m2!1sen!2sus!4v1632835554865!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-[#D4AF37] inline-block pb-2">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-xl text-gray-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* WhatsApp Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-[#D4AF37] pb-2">
            Contact Us
          </h3>
          <p className="text-white mt-4">
            Famous Chowk, Kirti Nagar Ln No. 1, Ganesh Nagar, Samata Nagar, New
            Sangavi, Pune, Pimpri-Chinchwad, Maharashtra 411027
          </p>
          <a
            href="https://wa.me/917028996666"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-green-400 hover:text-white mt-2"
          >
            <FaWhatsapp className="mr-2" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Border line before copyright */}
      <div className="border-t border-[#D4AF37] mx-4"></div>

      {/* Copyright */}
      <div className="bg-customBrown py-4 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} Rudra Arts & Handicrafts. All Rights
        Reserved.
        <br />
        <span className="text-white text-xs">
          Design & Develop by{" "}
          <a
            href="https://powerhousetechsolutions.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-green-400"
          >
            Powerhouse Tech Solutions
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
