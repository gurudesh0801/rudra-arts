import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      Cookies.remove("adminToken", { path: "/" });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="bg-white px-6 py-4 flex items-center justify-between shadow-md border-b border-orange-100 z-50"
    >
      {/* Logo / Title */}
      <motion.div
        className="text-2xl sm:text-3xl font-bold text-black tracking-wide"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        Welcome, <span className="text-customBrown">Satyajeet</span>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        className="flex items-center gap-2 text-white font-medium bg-customBrown hover:bg-orange-800 px-4 py-2 rounded-lg transition-all shadow-md"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogOut size={18} />
        Logout
      </motion.button>
    </motion.header>
  );
};

export default Navbar;
