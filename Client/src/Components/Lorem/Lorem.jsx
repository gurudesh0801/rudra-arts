import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const images = [
  { src: "/images/IMG-20250617-WA0035.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0022.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0006.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0007.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0011.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0043.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0008.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0034.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0009.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0013.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0015.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0012.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0014.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0017.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0029.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0030.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0018.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0021.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0019.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0020.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0023.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0024.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0025.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0026.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0027.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0028.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0010.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0033.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0016.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0031.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0032.jpg", title: "Mountain View" },
  { src: "/images/IMG-20250617-WA0042.jpg", title: "Mountain View" },
];

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const Lorem = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="px-6 py-12 bg-gray-100 mt-12">
      <h2 className="text-5xl font-bold font-playfair text-customBrown text-center mb-5 mt-10">
        <AnimatedUnderline>Collage Gallery</AnimatedUnderline>
      </h2>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="break-inside-avoid overflow-hidden rounded-xl shadow-md relative group"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full object-cover transition duration-300 group-hover:brightness-75"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {img.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Lorem;
