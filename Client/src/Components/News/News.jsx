import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import img1 from "../../assets/images/blog1.jpg";
import img2 from "../../assets/images/blog2.jpg";
import img3 from "../../assets/images/blog3.jpg";
import aboutBg from "../../assets/images/about-bg.jpg";

// News Data
const NewsData = [
  {
    id: 1,
    slug: "https://www.instagram.com/p/C6eK0gjtaOr/?hl=en&img_index=1",
    title: "With Vicky Kaushal",
    image: img1,
    shortDesc:
      "मागील कित्येक महिन्यांपासून ‘छावा’ या छत्रपती संभाजी महाराजांच्या आयुष्यावर आधारित....",
    isExternal: true,
  },
  {
    id: 2,
    slug: "https://www.instagram.com/p/DGvmCIMM7QD/?hl=en",
    title: "Rajputana & Maratha Warrior Sculptures",
    image: img2,
    shortDesc:
      "How warrior sculptures represent the bravery of Rajput and Maratha traditions.",
    isExternal: true,
  },
  {
    id: 3,
    slug: "https://www.instagram.com/p/DHXxaICtlkY/?hl=en",
    title: "Wooden vs. Metal Handicrafts",
    image: img3,
    shortDesc:
      "A comparison between wooden and metal handicrafts for your home decor.",
    isExternal: true,
  },
];

const News = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

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
      className="py-20 min-h-screen bg-fixed bg-cover font-outfit bg-center text-white"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl text-[#706D54] font-bold font-outfit mb-3"
          >
            Rudra Arts & Handicrafts News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-gray-700"
          >
            Discover the rich heritage behind handcrafted art
          </motion.p>
        </div>

        {/* News Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {NewsData.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-xl shadow-xl overflow-hidden group bg-white text-gray-900"
            >
              {/* Image */}
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end z-10 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">{news.title}</h2>
                <p className="text-sm line-clamp-3 mb-4">{news.shortDesc}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      news.isExternal
                        ? window.open(news.slug, "_blank")
                        : handleShow(news)
                    }
                    className="bg-orange-600 hover:bg-orange-700 text-sm px-4 py-2 rounded font-medium"
                  >
                    Read More
                  </button>
                  {news.isExternal && (
                    <a
                      href={news.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-orange-300 text-xl transition"
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl max-w-xl w-full overflow-hidden text-gray-800 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Close */}
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-3xl font-light"
                >
                  &times;
                </button>

                {/* Modal Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    {selectedNews.title}
                  </h2>
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-60 object-contain mb-4 rounded"
                  />
                  <p className="text-gray-700 leading-relaxed">
                    {selectedNews.shortDesc}
                  </p>
                  <p className="mt-4 text-sm text-gray-500">
                    Follow us on Instagram for more!
                  </p>
                </div>
                <div className="px-6 pb-6 flex justify-end">
                  <button
                    onClick={handleClose}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
                  >
                    Close
                  </button>
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
