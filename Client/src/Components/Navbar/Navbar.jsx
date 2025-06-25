import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../Contexts/Contexts";
import { FaShoppingCart } from "react-icons/fa";

import logo from "../../../public/images/logo.png"; // Adjust the path as necessary

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHome && !scrolled
          ? "bg-transparent text-white"
          : "bg-[#fdf6ec] text-[#5c3a1d] shadow-md border-[#e2caa7]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className={`w-30 h-30 object-contain transition duration-300 ${
              scrolled || !isHome ? "" : "invert"
            }`}
          />
        </Link>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 font-medium font-merriweather text-[17px]">
          {[
            "Home",
            "About",
            "News",
            "Blogs",
            "Lorem",
            "Products",
            "Contact",
          ].map((item) => (
            <li key={item}>
              <Link
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className="hover:text-[#8a4b1f] transition"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1.5 text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#fdf6ec] px-6 py-4 space-y-4 text-[#5c3a1d] font-medium font-merriweather shadow"
          >
            {[
              "Home",
              "About",
              "News",
              "Blogs",
              "Lorem",
              "Products",
              "Contact",
            ].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-xl" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1.5 text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
