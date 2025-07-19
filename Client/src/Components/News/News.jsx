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
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/news?limit=3&sort=desc`
      );
      const data = await res.json();
      const filteredNews = (data.newsItems || []).filter(
        (news) => !news.isHide
      );
      setNewsData(filteredNews.reverse());
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
      className="py-16 min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 text-black"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl text-customBrown font-normal mb-3"
          >
            <div className="flex items-center justify-center gap-3">
              <img
                src="/images/dhaltalwar.png"
                alt="Left Icon"
                className="w-10 h-10"
              />
              <AnimatedUnderline>
                Rudra Arts & Handicrafts News
              </AnimatedUnderline>
              <img
                src="/images/dhaltalwar.png"
                alt="Right Icon"
                className="w-10 h-10"
              />
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {newsData.map((news, index) => (
            <motion.div
              key={news._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Top Image */}
              <div className="relative">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-news.jpg";
                  }}
                />
                <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  Latest
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between h-[260px]">
                <div>
                  <h3 className="text-lg font-semibold text-customBrown mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {news.shortDescription ||
                      news.description.substring(0, 100) + "..."}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() =>
                      news.isExternal
                        ? window.open(news.slug, "_blank")
                        : handleShow(news)
                    }
                    className="group inline-flex items-center gap-1 text-amber-700 text-sm font-medium hover:text-amber-900 transition"
                  >
                    <span>Read More</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>

                  {news.isExternal && (
                    <a
                      href={news.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:text-amber-900 transition text-lg"
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
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {/* Close */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
                >
                  &times;
                </button>

                {/* Modal Content */}
                <div>
                  <div className="relative h-64 w-full">
                    <img
                      src={selectedNews.image}
                      alt={selectedNews.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                      {selectedNews.title}
                    </h2>

                    <div className="text-gray-700 leading-relaxed space-y-4">
                      {selectedNews.description
                        .split("\n")
                        .map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={handleClose}
                        className="px-6 py-2 bg-amber-700 text-white text-sm rounded hover:bg-amber-800 transition-colors"
                      >
                        Close
                      </button>
                    </div>
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
