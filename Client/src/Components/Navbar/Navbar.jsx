import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../Contexts/Contexts";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../../public/images/rudralogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

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

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Blog", path: "/blogs" },
    { name: "Wall of Fame", path: "/lorem" },
    { name: "Franchise", path: "/franchises" },
    { name: "Our Team", path: "/handsbehindrudrarts" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999]">
      {/* Top Header */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className={`w-full bg-gradient-to-b from-amber-50 to-amber-100 text-black text-white"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20 py-2">
                {/* LEFT: Search icon + input */}
                <div className="flex-1 flex items-center justify-start relative">
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-2 rounded-full hover:bg-gray-200/40 transition"
                  >
                    <FiSearch className="h-5 w-5" />
                  </button>

                  <AnimatePresence>
                    {searchOpen && (
                      <motion.form
                        onSubmit={handleSearch}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "12rem", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-2 relative"
                      >
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-4 pr-4 py-1 rounded-full text-sm text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full"
                        />
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                {/* CENTER: Logo */}
                <div className="flex-shrink-0 flex items-center justify-center">
                  <Link to="/" className="flex items-center">
                    <motion.img
                      src={logo}
                      alt="logo"
                      className="h-14 object-contain"
                      whileHover={{ scale: 1.05 }}
                    />
                    <p className="ml-2 text-xl font-times font-normal hidden md:block">
                      Rudra Arts & Handicrafts
                    </p>
                  </Link>
                </div>

                {/* RIGHT: Cart + Mobile menu */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Menu Row */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-darkBrown text-white shadow-sm fixed top-0 left-0 z-[9999]"
            : "bg-darkBrown text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Mobile Nav */}
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
      </div>
    </nav>
  );
};

export default Navbar;
