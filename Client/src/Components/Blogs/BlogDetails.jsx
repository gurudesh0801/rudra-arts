import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/${id}`
        );
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-amber-700">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-amber-700">Blog not found</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 pt-20 pb-10"
    >
      {/* Back Button - Fixed position for mobile */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-20 flex items-center gap-2 text-amber-800 font-medium bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm"
      >
        <FiArrowLeft />
        <span className="hidden sm:inline">Back to Blogs</span>
      </motion.button>

      {/* Main Content - Column layout for mobile */}
      <div className="flex flex-col lg:flex-row">
        {/* Image Section - Full width on mobile, fixed height */}
        {blog.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto max-h-[50vh] lg:max-h-screen lg:h-full object-contain object-center bg-white p-4"
            />
          </motion.div>
        )}

        {/* Text Content Section - Full width on mobile */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 bg-white lg:min-h-screen"
        >
          {/* Category Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              {blog.category || "General"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-normal text-amber-900 mb-4 sm:mb-6 leading-tight font-times"
          >
            {blog.title}
          </motion.h1>

          {/* Author and Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mb-6 sm:mb-8"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-700 flex items-center justify-center text-white font-medium">
              {blog.author?.[0] || "A"}
            </div>
            <div>
              <p className="font-medium text-amber-900 text-sm sm:text-base">
                {blog.author || "Anonymous"}
              </p>
              <p className="text-amber-600 text-xs sm:text-sm">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="prose max-w-none text-amber-900 text-sm sm:text-base"
          >
            {blog.content.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
