import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZoomIn, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import TeamComponent from "../TeamComponent/TeamComponent";

const images = [
  { src: "/images/bts2.jpg", title: "Crafting Perfection" },
  { src: "/images/bts3.jpg", title: "Artisan at Work" },
  { src: "/images/bts4.jpg", title: "Traditional Techniques" },
  { src: "/images/bts5.jpg", title: "Master's Touch" },
  { src: "/images/bts6.jpg", title: "Detail Oriented" },
  { src: "/images/bts7.jpg", title: "Heritage in Making" },
  { src: "/images/bts8.jpg", title: "Skilled Hands" },
  { src: "/images/bts9.jpg", title: "Timeless Creation" },
  { src: "/images/bts10.jpg", title: "Precision Work" },
  { src: "/images/bts12.jpg", title: "Material Selection" },
  { src: "/images/bts13.jpg", title: "Quality Inspection" },
  { src: "/images/bts14.jpg", title: "Ancient Methods" },
  { src: "/images/bts15.jpg", title: "Artistic Process" },
  { src: "/images/bts16.jpg", title: "Handcrafted Beauty" },
  { src: "/images/bts18.jpg", title: "Workshop Moments" },
  { src: "/images/bts19.jpg", title: "Craftsmanship" },
  { src: "/images/bts20.jpg", title: "Detail Work" },
  { src: "/images/bts21.jpg", title: "Creative Flow" },
  { src: "/images/bts1.jpg", title: "Traditional Tools" },
  { src: "/images/bts22.jpg", title: "Finishing Touches" },
];

const BTS = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openImage = (index) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="px-4 py-8 bg-gradient-to-b from-amber-50 to-amber-100">
      <TeamComponent />

      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-amber-900 mb-4 mt-10">
            Shaped by Skill, Guided by Legacy
          </h2>
          <p className="text-lg italic text-amber-700 max-w-2xl mx-auto">
            "Witness the sacred process where tradition meets mastery"
          </p>
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent w-1/2 mx-auto" />
        </motion.div>

        {/* Interactive Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => openImage(index)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-all duration-500"
                style={{
                  transform:
                    hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                  filter:
                    hoveredIndex === index
                      ? "brightness(0.8)"
                      : "brightness(0.9)",
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-medium">{img.title}</h3>
                  <div className="flex items-center mt-1">
                    <FiZoomIn className="mr-1" />
                    <span className="text-xs">Click to enlarge</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeImage}
            >
              <button
                className="absolute top-6 right-6 text-white text-2xl z-10"
                onClick={closeImage}
              >
                <FiX />
              </button>

              <motion.div
                className="relative max-w-6xl w-full max-h-[90vh]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].title}
                  className="w-full h-full object-contain max-h-[80vh] mx-auto"
                />
                <div className="mt-4 text-center text-white">
                  <h3 className="text-xl font-medium">
                    {images[selectedImage].title}
                  </h3>
                  <p className="text-sm text-amber-200 mt-1">
                    {selectedImage + 1} of {images.length}
                  </p>
                </div>
              </motion.div>

              {/* Navigation Arrows */}
              {selectedImage > 0 && (
                <button
                  className="absolute left-4 md:left-8 text-white text-3xl z-10 bg-black/50 rounded-full p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => prev - 1);
                  }}
                >
                  &larr;
                </button>
              )}
              {selectedImage < images.length - 1 && (
                <button
                  className="absolute right-4 md:right-8 text-white text-3xl z-10 bg-black/50 rounded-full p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => prev + 1);
                  }}
                >
                  &rarr;
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-amber-700 italic mb-4">
            "Every piece tells a story of dedication passed through generations"
          </p>
          <Link to="/explore-process">
            <button className="px-6 py-2 border border-amber-600 text-amber-700 rounded-full hover:bg-amber-600 hover:text-white transition-colors">
              Explore Our Process
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BTS;
