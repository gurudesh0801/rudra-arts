import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiCalendar, FiTag, FiLayers } from "react-icons/fi";

const YourProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    setProducts(storedProducts);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12 px-4 sm:px-6 mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12 mt-10"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-normal text-customBrown mb-2"
          >
            Your Purchased Treasures
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Relive your shopping moments with these beautiful finds
          </motion.p>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <motion.div
                animate={{ rotate: -10 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                }}
                className="bg-white p-6 rounded-full shadow-md mb-6"
              >
                <FiShoppingBag className="text-4xl text-gray-400" />
              </motion.div>
              <h2 className="text-2xl font-medium text-gray-700 mb-2">
                No purchases yet
              </h2>
              <p className="text-gray-500 max-w-md mb-6">
                Your purchased items will appear here after checkout
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/products")}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={`${product._id}-${index}`}
                variants={item}
                layout
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="relative h-48 w-full overflow-hidden"
                >
                  <img
                    src={product.product_image?.[0]}
                    alt={product.product_name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium"
                  >
                    #{index + 1}
                  </motion.div>
                </motion.div>

                {/* Product Details */}
                <div className="p-4">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-normal text-lg text-gray-800 mb-2 line-clamp-2"
                  >
                    {product.product_name}
                  </motion.h3>

                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center text-gray-700"
                    >
                      <FiTag className="mr-2 text-orange-500" />
                      <span className="font-medium">
                        ₹{product.product_price.toLocaleString()}
                      </span>
                    </motion.div>

                    {product.product_size && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="flex items-center text-gray-700"
                      >
                        <FiLayers className="mr-2 text-orange-500" />
                        <span>Size: {product.product_size}</span>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center text-gray-500 text-sm"
                    >
                      <FiCalendar className="mr-2 text-orange-500" />
                      <span>
                        Purchased:{" "}
                        {new Date(product.purchaseDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default YourProducts;
