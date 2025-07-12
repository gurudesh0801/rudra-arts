"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AutoScrollCarousel() {
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products`
        );
        const data = await res.json();
        const sortedProducts = data.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        setProducts(sortedProducts.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchLatestProducts();
  }, []);

  useEffect(() => {
    const startAnimation = () => {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    const stopAnimation = () => {
      controls.stop();
    };

    if (isHovered) {
      stopAnimation();
    } else {
      startAnimation();
    }

    return () => stopAnimation();
  }, [isHovered, controls]);

  if (!products.length) return null;

  return (
    <div
      className="relative w-full py-12 overflow-hidden bg-transperent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Title */}
      <h2 className="text-3xl font-normal font-time  text-customBrown mb-8 px-8 pt-5">
        Latest Products
      </h2>

      <motion.div className="flex gap-8" animate={controls} ref={carouselRef}>
        {[...products, ...products].map((product, index) => (
          <motion.div
            key={`${product._id}-${index}`}
            className="relative cursor-pointer min-w-[280px]"
            onClick={() => navigate(`/product-details/${product._id}`)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.product_image?.[0] || "/placeholder-image.jpg"}
                alt={product.product_name}
                className="w-full h-48 object-cover rounded-2xl transform transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                <p className="font-semibold truncate">{product.product_name}</p>
                <p className="text-orange-400 font-bold">
                  ₹{product.product_price}
                </p>
              </div>

              {index < 3 && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  New
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
