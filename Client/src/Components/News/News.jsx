import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const isYouTubeLink = (url) => {
    return url?.includes("youtube.com") || url?.includes("youtu.be");
  };

  const isExternalLink = (url) => {
    return url?.startsWith("http") || url?.startsWith("www");
  };

  const getLinkIcon = (url) => {
    if (isYouTubeLink(url)) return <FaYoutube />;
    if (isExternalLink(url)) return <FaExternalLinkAlt />;
    return <FaExternalLinkAlt />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-amber-50 to-amber-100 text-black font-times">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl text-customBrown font-normal mb-3"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <img
                src="/images/dhaltalwar.png"
                alt="Left Icon"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <AnimatedUnderline>
                Rudra Arts & Handicrafts News
              </AnimatedUnderline>
              <img
                src="/images/dhaltalwar.png"
                alt="Right Icon"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto"
          >
            Discover the rich heritage behind handcrafted art
          </motion.p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {newsData.map((news, index) => (
            <motion.div
              key={news._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Top Image */}
              <div className="relative">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-40 sm:h-52 object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-news.jpg";
                  }}
                  loading="lazy"
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-amber-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full shadow">
                  Latest
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col justify-between h-[220px] sm:h-[260px]">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-customBrown mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                    {news.shortDescription ||
                      (news.description &&
                        news.description.substring(0, 100) + "...") ||
                      "No description available"}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                  <a
                    href={news.slug || news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-amber-700 text-xs sm:text-sm font-medium hover:text-amber-900 transition"
                  >
                    <span>Read More</span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
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
                  </a>

                  {(news.slug || news.link) && (
                    <a
                      href={news.slug || news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:text-amber-900 transition text-sm sm:text-lg"
                      title={
                        isYouTubeLink(news.slug)
                          ? "Watch on YouTube"
                          : "View External Link"
                      }
                    >
                      {getLinkIcon(news.slug || news.link)}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
