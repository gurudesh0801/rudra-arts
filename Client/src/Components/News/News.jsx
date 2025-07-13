import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const fetchLatestNews = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/news?limit=4&sort=desc`
      );
      const data = await res.json();
      const filteredNews = (data.newsItems || []).filter(
        (news) => !news.isHide
      );
      setNewsData(filteredNews);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const handleShow = (news) => {
    setSelectedNews(news);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedNews(null);
    setShowModal(false);
  };

  return (
    <div
      className="py-16 min-h-screen bg-[#FFF1DE] text-black"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl text-customBrown font-normal mb-3"
          >
            <AnimatedUnderline>Rudra Arts & Handicrafts News</AnimatedUnderline>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base text-gray-600 max-w-2xl mx-auto"
          >
            Discover the rich heritage behind handcrafted art
          </motion.p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsData.map((news, index) => (
            <motion.div
              key={news._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-sm overflow-hidden group border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/placeholder-news.jpg";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold mb-2 text-customBrown leading-tight">
                    {news.title}
                  </h2>
                  <div className="h-px w-8 bg-customBrown my-2"></div>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                    {news.shortDescription ||
                      news.description.substring(0, 100) + "..."}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                  <button
                    onClick={() =>
                      news.isExternal
                        ? window.open(news.slug, "_blank")
                        : handleShow(news)
                    }
                    className="text-customBrown hover:text-orange-700 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>Read More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>

                  {news.isExternal && (
                    <a
                      href={news.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-customBrown transition-colors text-sm"
                    >
                      <FaInstagram />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && selectedNews && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {/* Close */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                  &times;
                </button>

                {/* Modal Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-900">
                    {selectedNews.title}
                  </h2>

                  <div className="mb-5">
                    <img
                      src={selectedNews.image}
                      alt={selectedNews.title}
                      className="w-full h-48 object-cover rounded mb-3"
                    />

                    <div className="text-sm text-gray-700 leading-relaxed">
                      {selectedNews.description
                        .split("\n")
                        .map((paragraph, i) => (
                          <p key={i} className="mb-3 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-gray-100 pt-3">
                    <button
                      onClick={handleClose}
                      className="px-4 py-1.5 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default News;
