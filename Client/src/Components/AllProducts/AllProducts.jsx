// Enhanced AllProducts component with added features: search, sort, badges, skeletons, and rating

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaFilter, FaStar } from "react-icons/fa";
import { ShoppingCartIcon, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AutoScrollCarousel from "./Carousel";
import weaponsBg from "../../assets/images/Weponsbg.jpg";
import { Box, Skeleton } from "@mui/material";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        const productsWithExtras = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((product) => ({
            ...product,
            isFavorite: false,
            category: product.product_category || "Uncategorized",
          }));

        setProducts(productsWithExtras);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory
    )
    .filter((p) =>
      p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "price-low") return a.product_price - b.product_price;
      if (sortOption === "price-high") return b.product_price - a.product_price;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const toggleFavorite = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  const handleAddToCartAndNavigate = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", py: 4 }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${weaponsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1400px",
          margin: "6rem auto",
          px: { xs: 2, sm: 4, lg: 6 },
        }}
      >
        <AutoScrollCarousel />

        <Box sx={{ textAlign: "center", mb: 6, mt: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-montserrat font-bold mb-4 text-gray-900">
              Heritage Artisans Collection
            </h1>
            <p className="text-gray-700 max-w-xl mx-auto mb-6">
              Handcrafted with devotion, each piece tells a story of our
              glorious past and spiritual traditions.
            </p>
          </motion.div>
        </Box>

        {/* Controls */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            backgroundColor: "rgba(255,255,255,0.8)",
            p: 3,
            borderRadius: 2,
            backdropFilter: "blur(4px)",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full sm:w-64 text-gray-700"
            />
          </Box>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border py-2 px-3 rounded-md text-gray-700"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border py-2 px-3 rounded-md text-gray-700"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </Box>

        {/* Products Grid */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            p: 3,
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(0,0,0,0.1)",
            mb: 4,
          }}
        >
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {loading
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="rectangular"
                    height={300}
                    sx={{ borderRadius: 2 }}
                  />
                ))
              : filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col relative"
                  >
                    <img
                      src={product.product_image[0]}
                      alt={product.product_name}
                      className="h-48 w-full object-contain bg-gray-100"
                      loading="lazy"
                    />

                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                        {product.product_name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                        {product.product_description}
                      </p>
                      <h6 className="text-gray-600 font- mb-2 line-clamp-3">
                        - {product.product_size}
                      </h6>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xl font-bold text-customBrown">
                          ₹{product.product_price}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-500">
                          <FaStar className="text-sm" />{" "}
                          {product.product_rating || "4.5"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        <button
                          onClick={() => toggleFavorite(product._id)}
                          aria-label="Toggle Favorite"
                          className="text-customBrown hover:text-orange-800 transition text-xl"
                        >
                          {product.isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleAddToCartAndNavigate(product._id)
                          }
                          className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2 rounded-full transition flex items-center gap-2"
                        >
                          <ShoppingCartIcon size={16} /> View & Buy
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default AllProducts;
