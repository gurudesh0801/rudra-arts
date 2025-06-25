import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaFilter, FaEnvelope } from "react-icons/fa";
import { ShoppingCartIcon } from "lucide-react";
import AutoScrollCarousel from "./Carousel";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch products from API (expects a flat array of products)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        // Add default fields like isFavorite to each product
        const productsWithExtras = data.map((product) => ({
          ...product,
          isFavorite: false,
          category: product.product_category || "Uncategorized", // fallback category
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

  // Extract unique categories for filter dropdown
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleFavorite = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  const handleEnquiry = (productId) => {
    alert(`Enquiry sent for product ID: ${productId}`);
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        Loading products...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8 py-12">
      <AutoScrollCarousel />
      {/* Header */}
      <div className="text-center mb-12 mt-12">
        <h1 className="text-5xl sm:text-5xl font-montserrat font-bold mb-4 text-gray-900">
          Heritage Artisans Collection
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Handcrafted with devotion, each piece tells a story of our glorious
          past and spiritual traditions.
        </p>
        <button
          className="bg-customBrown font-outfit hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1"
          type="button"
        >
          Explore Craftsmanship
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold font-outfit text-gray-800 mb-1 flex items-center gap-2">
            📦{" "}
            {selectedCategory === "All"
              ? "All Heritage Collections"
              : selectedCategory}
          </h2>
          <p className="text-gray-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            className="flex items-center gap-2 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition"
            type="button"
          >
            <FaFilter />
            More Filters
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            layout
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            }}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col relative"
          >
            {/* Image */}
            <img
              src={product.product_image}
              alt={product.product_name}
              className="h-48 w-full object-contain bg-gray-100"
              loading="lazy"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold font-outfit text-gray-900 mb-2 line-clamp-2">
                {product.product_name}
              </h3>
              {/* You can add description if you have */}
              <p className="text-gray-600 flex-grow text-sm mb-4 line-clamp-3">
                {product.product_description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-customBrown">
                  ₹{product.product_price}
                </span>
                {/* Optional: Ratings or tags here */}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleFavorite(product._id)}
                  aria-label="Toggle Favorite"
                  className="text-customBrown hover:text-orange-800 transition text-xl"
                >
                  {product.isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button
                  onClick={() => handleEnquiry(product._id)}
                  aria-label="Send Enquiry"
                  className="outline rounded-2xl text-customBrown p-2 hover:text-gray-700 transition text-xs"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-sm">
                      <ShoppingCartIcon />
                    </span>
                    <p>Add to Cart</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllProducts;
