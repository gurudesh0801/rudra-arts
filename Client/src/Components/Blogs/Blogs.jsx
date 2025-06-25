import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const placeholderImages = [
  "https://picsum.photos/id/10/600/400",
  "https://picsum.photos/id/20/600/400",
  "https://picsum.photos/id/30/600/400",
  "https://picsum.photos/id/40/600/400",
  "https://picsum.photos/id/50/600/400",
  "https://picsum.photos/id/60/600/400",
];

const generateBlogData = () => {
  const titles = [
    "The Art of Sculpture Making",
    "Ancient Techniques in Modern Art",
    "Exploring Cultural Heritage",
    "Materials That Shape History",
    "From Clay to Masterpiece",
    "Preserving Traditional Crafts",
  ];

  return titles.map((title, index) => ({
    id: index + 1,
    title,
    image: placeholderImages[index],
    shortDesc:
      "Discover the fascinating journey from raw materials to timeless artistry in this detailed exploration.",
    fullDesc:
      "In this article, we delve into the meticulous process of transforming raw clay into a finished sculpture...",
    date: "May 15, 2025",
    author: "Rudra Arts",
  }));
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Blogs = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      for (const key in form) {
        if (form[key]) formData.append(key, form[key]);
      }

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/submit`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to submit blog");

      setForm({ title: "", content: "", author: "", image: null });
      setSuccessMsg("✅ Blog submitted for admin review!");
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg("");
      }, 2000);
    } catch (err) {
      alert("❌ Failed to submit blog");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const blogData = generateBlogData();

  return (
    <div className="py-20 px-6 mt-20 bg-[#fdfaf6] relative font-sans">
      {/* Create Blog Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed z-50 top-32 right-8 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition"
      >
        <div className="flex items-center">
          <Plus /> <p>Create Blog</p>
        </div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-3xl text-center font-outfit font-semibold mb-4">
                Add a Blog
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Blog Title"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Blog Content"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  required
                  className="w-full"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-customBrown hover:bg-green-700"
                  } text-white px-4 py-2 rounded transition-all`}
                >
                  {loading ? "Submitting..." : "Submit Blog"}
                </button>

                {successMsg && (
                  <p className="text-green-600 text-sm">{successMsg}</p>
                )}
              </form>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl font-bold text-[#3b2f2f] font-montserrat">
          Artisan Blog
        </h1>
        <p className="text-gray-600 mt-2 text-base md:text-lg">
          Discover the world of traditional craftsmanship and stories behind
          each masterpiece.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {blogData.map((blog, i) => (
          <motion.div
            key={blog.id}
            variants={cardVariants}
            viewport={{ once: true }}
            custom={i}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                  {blog.author[0]}
                </div>
                <div className="text-sm">
                  <h4 className="font-semibold">{blog.author}</h4>
                  <p className="text-gray-500 text-xs">{blog.date}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 text-xl">
                ⋮
              </button>
            </div>

            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover mt-3"
            />

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#3b2f2f] mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">{blog.shortDesc}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-gray-500">
                  <button className="hover:text-red-500 transition">❤️</button>
                  <button className="hover:text-blue-500 transition">🔗</button>
                </div>
                <button
                  onClick={() => toggleExpand(blog.id)}
                  className={`text-sm text-gray-600 hover:text-black transition transform ${
                    expandedId === blog.id ? "rotate-180" : ""
                  }`}
                >
                  ⌄
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {expandedId === blog.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                >
                  <p className="text-sm text-gray-700 mt-2">{blog.fullDesc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
