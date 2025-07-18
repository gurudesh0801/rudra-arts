import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../Contexts/Contexts";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../../public/images/rudralogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    // In your Navbar component, update the Products dropdown items:
    {
      name: "Products",
      path: "/products",
      dropdown: [
        { name: "All Products", path: "/products" },
        {
          name: "Maharaj Idol Series",
          path: "/products/category/Maharaj Idol Series",
        },
        {
          name: "Miniature Weapon Sets & Figurines",
          path: "/products/category/Miniature Weapon Sets & Figurines",
        },
        {
          name: "Mavale & Warrior Statues",
          path: "/products/category/Mavale & Warrior Statues",
        },
      ],
    },
    { name: "Blog", path: "/blogs" },
    { name: "Maharaj", path: "/maharaj" },
    { name: "Wall of Fame", path: "/lorem" },
    { name: "Franchise", path: "/franchises" },
    {
      name: "Our Team",
      path: "/handsbehindrudrarts",
    },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setSearchOpen(false);
  };

  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const isActive = (path, dropdownItems = []) => {
    return (
      location.pathname === path ||
      dropdownItems.some((item) => location.pathname === item.path)
    );
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
                <div key={item.name} className="relative" ref={dropdownRef}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors font-times uppercase flex items-center ${
                          isActive(item.path, item.dropdown)
                            ? "text-[#ff8732] font-semibold"
                            : "hover:text-orange-500"
                        }`}
                      >
                        {item.name}
                        {openDropdown === item.name ? (
                          <FiChevronUp className="ml-1" />
                        ) : (
                          <FiChevronDown className="ml-1" />
                        )}
                      </button>

                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                          >
                            <div className="py-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  className={`block px-4 py-2 text-sm ${
                                    location.pathname === subItem.path
                                      ? "bg-amber-100 text-darkBrown"
                                      : "text-gray-700 hover:bg-amber-50 hover:text-darkBrown"
                                  }`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors font-times uppercase ${
                        location.pathname === item.path
                          ? "text-[#ff8732] font-semibold"
                          : "hover:text-orange-500"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
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
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium ${
                            isActive(item.path, item.dropdown)
                              ? "bg-[#f3e9dd] text-[#8a4b1f]"
                              : "hover:bg-gray-50 hover:text-[#8a4b1f]"
                          }`}
                        >
                          {item.name}
                          {openDropdown === item.name ? (
                            <FiChevronUp className="ml-1" />
                          ) : (
                            <FiChevronDown className="ml-1" />
                          )}
                        </button>

                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4"
                            >
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setOpenDropdown(null);
                                  }}
                                  className={`block px-3 py-2 rounded-md text-sm ${
                                    location.pathname === subItem.path
                                      ? "bg-[#f3e9dd] text-[#8a4b1f]"
                                      : "hover:bg-gray-50 hover:text-[#8a4b1f]"
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
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
                    )}
                  </div>
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
