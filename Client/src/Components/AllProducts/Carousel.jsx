"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AutoScrollCarousel() {
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();
  const progressRef = useRef(0);
  const animationRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products`
        );
        const data = await res.json();
        // Sort by newest first (assuming products have createdAt field)
        const sortedProducts = data.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        setProducts(sortedProducts.slice(0, 10)); // Show latest 10
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchLatestProducts();
  }, []);

  useEffect(() => {
    let rafId;
    let unsubscribe;

    const trackProgress = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        progressRef.current = progress;
      }
      rafId = requestAnimationFrame(trackProgress);
    };

    const startAnimation = async () => {
      if (!isHovered) {
        // Start from current progress
        await controls.start({
          x: [`${-progressRef.current}%`, "-100%"],
          transition: {
            duration: 40 * (1 - progressRef.current / 100),
            ease: "linear",
          },
        });

        // Infinite loop after first complete cycle
        animationRef.current = controls.start({
          x: ["0%", "-100%"],
          transition: {
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          },
        });

        // Start tracking progress
        rafId = requestAnimationFrame(trackProgress);
      } else {
        // Stop animation and progress tracking
        if (animationRef.current) {
          controls.stop();
        }
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      }
    };

    startAnimation();

    return () => {
      if (animationRef.current) {
        controls.stop();
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isHovered, controls]);

  if (!products.length) return null;

  return (
    <div
      className="relative w-full bg-gradient-to-b from-[#8C391B] to-[#2e0b05] py-12 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlays */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10" />

      {/* Title */}
      <h2 className="text-3xl font-bold text-white mb-8 px-8">
        Latest Products
        <span className="block w-16 h-1 bg-orange-500 mt-2"></span>
      </h2>

      <motion.div className="flex gap-8" animate={controls} ref={carouselRef}>
        {[...products, ...products].map((product, index) => (
          <motion.div
            key={`${product._id}-${index}`}
            className="relative group cursor-pointer min-w-[280px]"
            onClick={() => navigate(`/product-details/${product._id}`)}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={product.product_image?.[0] || "/placeholder-image.jpg"}
                alt={product.product_name}
                className="w-full h-48 object-cover rounded-2xl transform transition-all duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-black/70 backdrop-blur-sm p-3 rounded-lg">
                  <p className="text-white font-semibold truncate">
                    {product.product_name}
                  </p>
                  <p className="text-orange-400 font-bold">
                    ₹{product.product_price}
                  </p>
                </div>
              </div>

              {/* Floating tag - only show on first 3 newest products */}
              {index < 3 && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  New
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress indicator */}
      <div className="mt-8 px-8">
        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-500"
            initial={{ width: "0%" }}
            animate={{
              width: isHovered ? `${progressRef.current}%` : "100%",
            }}
            transition={{
              duration: isHovered ? 0 : 40 * (1 - progressRef.current / 100),
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
