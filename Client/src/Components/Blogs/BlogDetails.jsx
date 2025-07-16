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
      className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 mt-20 pt-10"
    >
      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-amber-800 font-medium"
      >
        <FiArrowLeft /> Back to Blogs
      </motion.button>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image Section - Full Height */}
        {blog.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/2 h-screen lg:h-auto lg:min-h-screen sticky top-0"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full max-h-screen object-contain"
            />
          </motion.div>
        )}

        {/* Text Content Section */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-1/2 p-8 md:p-12 lg:p-16 bg-white"
        >
          {/* Category Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
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
            className="text-3xl md:text-4xl font-normal text-amber-900 mb-6 leading-tight font-times"
          >
            {blog.title}
          </motion.h1>

          {/* Author and Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center text-white font-medium">
              {blog.author?.[0] || "A"}
            </div>
            <div>
              <p className="font-medium text-amber-900">
                {blog.author || "Anonymous"}
              </p>
              <p className="text-amber-600 text-sm">
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
            className="prose max-w-none text-amber-900"
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
