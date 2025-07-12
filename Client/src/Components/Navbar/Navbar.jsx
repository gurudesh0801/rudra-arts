import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../Contexts/Contexts";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../../public/images/rudralogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Blog", path: "/blogs" },
    { name: "Wall of Fame", path: "/lorem" },
    { name: "Hands Behind Rudra arts", path: "/handsbehindrudrarts" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHome && !scrolled
          ? "bg-transparent text-white"
          : "bg-darkBrown text-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Search, Logo, Cart */}
        <div className="flex items-center justify-between h-16 py-2">
          {/* Search Bar - Left */}
          <div className="flex-1 flex items-center justify-start">
            <form onSubmit={handleSearch} className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
            </form>
          </div>

          {/* Logo - Center */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link to="/" className="flex items-center">
              <motion.img
                src={logo}
                alt="logo"
                className={`h-10 object-contain transition duration-300 ${
                  scrolled || !isHome ? "invert" : "invert"
                }`}
                whileHover={{ scale: 1.05 }}
              />
              <p className="ml-2 font-times font-normal hidden md:block">
                Rudra Arts & Handicrafts
              </p>
            </Link>
          </div>

          {/* Cart - Right */}
          <div className="flex-1 flex items-center justify-end">
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-10 transition-colors"
            >
              <FaShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-4 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-label="Main menu"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu - Below */}
        <div className="hidden md:block border-t border-gray-200 border-opacity-20 pt-2 pb-1">
          <div className="flex items-center justify-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors font-times uppercase ${
                  location.pathname === item.path
                    ? "text-[#ff8732] font-semibold"
                    : "hover:text-orange-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? "bg-[#f3e9dd] text-[#8a4b1f]"
                      : "hover:bg-gray-50 hover:text-[#8a4b1f]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
