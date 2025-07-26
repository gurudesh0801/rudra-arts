import { useEffect } from "react";
import { useCart } from "../../Contexts/Contexts";
import { useState } from "react";
import { FaCartArrowDown, FaWhatsapp } from "react-icons/fa";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { cartItems, removeFromCart, clearCart, isCartLoading } = useCart();
  const [isBuying, setIsBuying] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = async (id) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL_PRODUCTION
        }/api/products/${id}/whatsapp-message`
      );
      const data = await response.json();
      if (data.whatsappURL) window.open(data.whatsappURL, "_blank");
    } catch (err) {
      console.error("Error sending WhatsApp message:", err);
    }
  };

  const handleBuyAll = async () => {
    setIsBuying(true);
    try {
      const productsData = cartItems.map((item) => ({
        id: item._id,
        name: item.product_name,
        price: item.product_price,
        size: item.product_size,
        image: item.product_image?.[0],
      }));
      const message = createWhatsAppMessage(productsData);
      const phoneNumber = "917028996666";
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/checkout/increment`,
        {
          method: "POST",
        }
      );

      window.open(whatsappURL, "_blank");
      // ✅ Clear the cart
      clearCart();
    } catch (err) {
      console.error("Error preparing WhatsApp message:", err);
      alert("Failed to prepare your order. Please try again.");
    } finally {
      setIsBuying(false);
    }
  };

  const createWhatsAppMessage = (products) => {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    const messageId = generateMessageId();

    let message = `*Purchase Inquiry - ${messageId}*\n\nHello! I'm interested in buying the following products:\n`;

    products.forEach((product, index) => {
      message += `\n*${index + 1}. ${product.name}*\n`;
      message += `Size: ${product.size || "N/A"}\n`;
      message += `Price: ${formatPrice(product.price)}\n`;
      if (product.image) {
        message += `Image: ${product.image}\n`;
      }
    });

    message += `\n*Total Items:* ${products.length}`;
    message += `\n*Total Amount:* ${formatPrice(total)}\n`;
    message += `\nKindly confirm availability and payment instructions.\n`;

    return message;
  };

  const generateMessageId = () => {
    return `ORDER-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product_price, 0);
  };

  if (isCartLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-[60vh]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"
        ></motion.div>
      </motion.div>
    );
  }

  if (!isCartLoading && cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center min-h-[60vh] text-center p-6 bg-gradient-to-b from-amber-50 to-amber-100 mt-20"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-gray-100 p-8 rounded-full mb-6 mt-20"
        >
          <FiShoppingBag className="text-gray-400 text-5xl" />
        </motion.div>
        <motion.h2
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-2xl font-medium text-gray-700 mb-2"
        >
          Your cart is empty
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 max-w-md mb-6"
        >
          Looks like you haven't added anything to your cart yet. Start shopping
          to see items here.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/products")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Shop Now
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-4 sm:px-6 py-12 pt-20 pb-32 bg-gradient-to-b from-amber-50 to-amber-100 font-times font-normal mt-10"
    >
      {/* Mobile Header */}
      <div className="md:hidden top-0 z-10 bg-customBrown text-white p-4 mb-6 shadow-md">
        <h1 className="text-3xl font-normal text-center">Your Cart</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto mt-20">
        {/* Cart Items - Full width on mobile */}
        <div className="w-full md:w-2/3">
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ type: "spring" }}
            className="hidden md:block text-3xl md:text-4xl font-normal text-customBrown mb-6"
          >
            Your Cart
          </motion.h1>

          <div className="space-y-3">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  layout
                  className="rounded-lg shadow-sm border border-gray-100 p-3 flex gap-3 hover:shadow-md transition-shadow bg-white"
                >
                  <Link
                    to={`/product-details/${item._id}`}
                    className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24"
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={item.product_image?.[0]}
                      alt={item.product_name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <h2 className="text-lg sm:text-xl font-normal text-gray-800 line-clamp-2">
                      {item.product_name}
                    </h2>
                    <p className="text-orange-600 font-bold mt-1 text-sm sm:text-base">
                      {formatPrice(item.product_price)}
                    </p>

                    <div className="mt-auto flex justify-end">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item._id)}
                        className="flex items-center gap-1 bg-red-400 hover:bg-red-500 text-white px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-colors rounded"
                        title="Remove item"
                      >
                        <FiTrash2 className="text-sm" />
                        <span className="hidden xs:inline">Remove</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary - Sticky at bottom on mobile */}
        <div className="w-full md:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:sticky md:top-8"
          >
            <h2 className="text-xl sm:text-2xl font-normal text-gray-800 mb-3">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between text-sm sm:text-base"
              >
                <span className="text-gray-600">
                  Items ({cartItems.length})
                </span>
                <span className="font-bold">
                  {formatPrice(calculateTotal())}
                </span>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="border-t border-gray-200 my-2"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-between items-center"
              >
                <span className="text-lg sm:text-xl font-normal">Total</span>
                <span className="text-orange-600 font-bold text-lg sm:text-xl">
                  {formatPrice(calculateTotal())}
                </span>
              </motion.div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyAll}
              disabled={isBuying}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
            >
              <motion.span
                animate={isBuying ? { rotate: 360 } : {}}
                transition={
                  isBuying
                    ? { repeat: Infinity, duration: 1, ease: "linear" }
                    : {}
                }
              >
                <FaCartArrowDown />
              </motion.span>
              {isBuying
                ? "Processing..."
                : `Checkout (${cartItems.length} ${
                    cartItems.length > 1 ? "items" : "item"
                  })`}
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-gray-500 mt-3 text-center"
            >
              You'll complete your purchase on WhatsApp
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Mobile Checkout Bar - Fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 z-20">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-lg font-bold text-orange-600">
              {formatPrice(calculateTotal())}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyAll}
            disabled={isBuying}
            className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 text-sm"
          >
            <FaCartArrowDown />
            {isBuying ? "Processing..." : "Checkout"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
