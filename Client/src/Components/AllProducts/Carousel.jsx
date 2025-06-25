"use client";

import { motion } from "framer-motion";
import img1 from "../../assets/images/frame1.jpg";
import img2 from "../../assets/images/swarajyalakshmi.jpg";

const images = [img1, img2];

export default function AutoScrollCarousel() {
  return (
    <div className="overflow-hidden w-full bg-black py-4 mt-16">
      <motion.div
        className="flex gap-6"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`carousel-${index}`}
            className="w-64 h-40 object-cover rounded-xl shadow-md"
          />
        ))}
      </motion.div>
    </div>
  );
}
