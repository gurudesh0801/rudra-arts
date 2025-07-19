import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiZoomIn } from "react-icons/fi";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const images = [
  { src: "/images/IMG-20250617-WA0035.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0022.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0007.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0006.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0011.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0043.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0008.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0034.jpg", title: "Mountain View" },
  { src: "/images/img3.webp", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0009.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0013.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0015.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0012.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0014.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0017.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0029.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0030.jpg", title: "Mountain View" },
  { src: "/images/img1.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0018.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0021.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0019.jpg", title: "Mountain View" },
  { src: "/images/img5.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0020.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0023.jpg", title: "Mountain View" },
  { src: "/images/img4.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0024.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0025.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0026.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0027.jpg", title: "Mountain View" },
  { src: "/images/img6.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0028.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0010.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0033.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0016.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0031.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0032.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0042.jpg", title: "Mountain View" },
  { src: "/images/img2.jpg", title: "Mountain View" },
  { src: "/images/img8.jpg", title: "Mountain View" },
  { src: "/images/img9.jpg", title: "Mountain View" },
  { src: "/images/img10.jpg", title: "Mountain View" },
  { src: "/images/img11.jpg", title: "Mountain View" },
  { src: "/images/img12 .jpg", title: "Mountain View" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Smooth easing
    },
  }),
};

const Gallery = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-gradient-to-b from-amber-50 to-amber-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Gallery Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-normal text-amber-900 mb-4 font-times">
            <AnimatedUnderline>Heritage Gallery</AnimatedUnderline>
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid mb-6 relative group"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              variants={fadeIn}
            >
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    className="p-2 bg-amber-700/80 rounded-full text-white"
                  >
                    <FiZoomIn className="text-2xl" />
                  </motion.div>
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-medium text-white font-times">
                    {img.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Gallery;
