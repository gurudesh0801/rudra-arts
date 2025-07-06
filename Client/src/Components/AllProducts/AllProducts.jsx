import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AutoScrollCarousel from "./Carousel";
import aboutBg from "/images/border.jpg";
import { Box, Skeleton, Chip, useTheme, Typography } from "@mui/material";
import img from "../../assets/images/Weponsbg.jpg";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12); // Initial number of products to show
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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
            rating: product.product_rating || Math.random() * 1 + 4,
            isNew:
              Date.now() - new Date(product.createdAt).getTime() < 604800000,
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
    .filter(
      (p) =>
        p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.product_description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "price-low") return a.product_price - b.product_price;
      if (sortOption === "price-high") return b.product_price - a.product_price;
      if (sortOption === "rating") return b.rating - a.rating;
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

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 12); // Load 12 more products
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        py: 4,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #121212 0%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
        overflow: "hidden",
      }}
    >
      {/* Fixed Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          backgroundImage: `url(${aboutBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content Container */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1600px",
          margin: "0 auto",
          px: { xs: 2, sm: 4, lg: 6 },
        }}
      >
        <AutoScrollCarousel />

        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
            mt: { xs: 4, md: 8 },
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                fontWeight: 800,
                mb: 2,
                lineHeight: 1.1,
                letterSpacing: "-1px",
                fontFamily: '"Playfair Display", serif',
              }}
              className="text-customBrown"
            >
              Heritage Artisans Collection
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(0,0,0,0.8)",
                maxWidth: "800px",
                mx: "auto",
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              Handcrafted with devotion, each piece tells a story of our
              glorious past and spiritual traditions.
            </Typography>
          </motion.div>
        </Box>

        {/* Controls Section */}
        <Box
          sx={{
            mb: 6,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              alignItems: { xs: "stretch", md: "center" },
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            {/* Search Bar */}
            <Box
              sx={{
                position: "relative",
                flexGrow: 1,
                maxWidth: "600px",
              }}
            >
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white/80 backdrop-blur-sm text-gray-800"
              />
            </Box>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm border-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <FaFilter />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown (Desktop) */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                minWidth: "200px",
              }}
            >
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white/80 backdrop-blur-sm text-gray-800 appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </Box>
          </Box>

          {/* Category Filters */}
          <AnimatePresence>
            <Box
              sx={{
                maxWidth: 300,
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "0.9rem",
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(0,0,0,0.8)",
                }}
              >
                Filter by Category
              </Typography>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white/80 backdrop-blur-sm text-gray-800 appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </Box>
          </AnimatePresence>
        </Box>

        {/* Products Grid */}
        <Box
          sx={{
            position: "relative",
            minHeight: "500px",
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                  lg: "1fr 1fr 1fr 1fr",
                },
                gap: 4,
              }}
            >
              {Array.from({ length: 8 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                    <Skeleton variant="rectangular" width="100%" height={220} />
                    <Box sx={{ p: 3 }}>
                      <Skeleton width="80%" height={24} />
                      <Skeleton width="60%" height={20} sx={{ mt: 1 }} />
                      <Skeleton width="40%" height={20} sx={{ mt: 2 }} />
                      <Skeleton width="70%" height={36} sx={{ mt: 2 }} />
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          ) : filteredProducts.length > 0 ? (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.slice(0, visibleProducts).map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{
                        y: -8,
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      className="relative group"
                    >
                      {/* Product Card */}
                      <Link
                        to={`/product-details/${product._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "white",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backdropFilter: "blur(2rem)",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: theme.shadows[2],
                            border:
                              theme.palette.mode === "dark"
                                ? "1px solid rgba(255,255,255,0.05)"
                                : "1px solid rgba(0,0,0,0.05)",
                            transition: "all 0.3s ease-out",
                          }}
                        >
                          {/* Image Container */}
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: "220px",
                              overflow: "hidden",
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? "rgba(30,30,30,0.5)"
                                  : "rgba(250,250,250,0.5)",
                            }}
                          >
                            <img
                              src={product.product_image[0]}
                              alt={product.product_name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              style={{ objectFit: "cover" }} // Changed from object-contain to object-cover
                            />

                            {/* Badges */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                display: "flex",
                                gap: 1,
                                zIndex: 2,
                              }}
                            >
                              {product.isNew && (
                                <Chip
                                  label="New"
                                  size="small"
                                  sx={{
                                    backgroundColor: "#10B981",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "0.7rem",
                                  }}
                                />
                              )}
                              {product.product_price > 5000 && (
                                <Chip
                                  label="Premium"
                                  size="small"
                                  sx={{
                                    backgroundColor:
                                      theme.palette.mode === "dark"
                                        ? "#E67E51"
                                        : "#8C391B",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "0.7rem",
                                  }}
                                />
                              )}
                            </Box>

                            {/* Favorite Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(product._id);
                              }}
                              aria-label="Toggle Favorite"
                              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition"
                            >
                              {product.isFavorite ? (
                                <FaHeart className="text-red-500" />
                              ) : (
                                <FaRegHeart className="text-gray-700 hover:text-red-500 transition" />
                              )}
                            </button>
                          </Box>

                          {/* Product Info */}
                          <Box
                            sx={{
                              p: 3,
                              flexGrow: 1,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant="h3"
                              sx={{
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                mb: 1,
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#fff"
                                    : "#1a1a1a",
                                lineHeight: 1.3,
                              }}
                            >
                              {product.product_name}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: "0.875rem",
                                color:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.7)"
                                    : "rgba(0,0,0,0.7)",
                                mb: 2,
                                flexGrow: 1,
                                lineHeight: 1.5,
                              }}
                            >
                              {product.product_description.length > 100
                                ? `${product.product_description.substring(
                                    0,
                                    100
                                  )}...`
                                : product.product_description}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Box sx={{ display: "flex" }}>
                                {renderStars(product.rating)}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "0.8rem",
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "rgba(255,255,255,0.6)"
                                      : "rgba(0,0,0,0.6)",
                                  ml: 0.5,
                                }}
                              >
                                ({product.rating.toFixed(1)})
                              </Typography>
                            </Box>

                            <Typography
                              sx={{
                                fontSize: "0.875rem",
                                color:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.8)"
                                    : "rgba(0,0,0,0.8)",
                                mb: 2,
                                fontStyle: "italic",
                              }}
                            >
                              Size: {product.product_size}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: "auto",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "1.25rem",
                                  fontWeight: 700,
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#E67E51"
                                      : "#8C391B",
                                }}
                              >
                                ₹{product.product_price.toLocaleString()}
                              </Typography>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleAddToCartAndNavigate(product._id);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition"
                                style={{
                                  background:
                                    theme.palette.mode === "dark"
                                      ? "linear-gradient(90deg, #E67E51 0%, #F9A875 100%)"
                                      : "linear-gradient(90deg, #8C391B 0%, #D45B2B 100%)",
                                  color: "white",
                                }}
                              >
                                <ShoppingCart size={16} />
                                View Details
                              </motion.button>
                            </Box>
                          </Box>
                        </Box>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Load More Button */}
              {visibleProducts < filteredProducts.length && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 6,
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={loadMoreProducts}
                    className="px-8 py-3 rounded-full font-outfit transition bg-customBrown text-white"
                    style={{
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(0,0,0,0.8)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    Load More
                  </motion.button>
                </Box>
              )}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
                textAlign: "center",
                p: 4,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                borderRadius: "16px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  mb: 2,
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(0,0,0,0.8)",
                }}
              >
                No products found
              </Typography>
              <Typography
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(0,0,0,0.6)",
                  mb: 3,
                  maxWidth: "500px",
                }}
              >
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </Typography>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSortOption("newest");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition"
                style={{
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(0,0,0,0.8)",
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.1)",
                }}
              >
                Reset filters
                <ArrowRight size={16} />
              </button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllProducts;
