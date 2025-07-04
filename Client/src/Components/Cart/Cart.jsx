import { useCart } from "../../Contexts/Contexts";
import { useState } from "react";
import { FaCartArrowDown, FaWhatsapp } from "react-icons/fa";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, isCartLoading } = useCart();
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
      // Prepare the product data we need to send
      const productsData = cartItems.map((item) => ({
        id: item._id,
        name: item.product_name,
        price: item.product_price,
        size: item.product_size,
        image: item.product_image?.[0],
      }));

      // Create the WhatsApp message on the client side
      const message = createWhatsAppMessage(productsData);
      const phoneNumber = "918668494090"; // Replace with your business number
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappURL, "_blank");
    } catch (err) {
      console.error("Error preparing WhatsApp message:", err);
      alert("Failed to prepare your order. Please try again.");
    } finally {
      setIsBuying(false);
    }
  };

  const createWhatsAppMessage = (products) => {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    const messageId = generateMessageId(); // Unique ID

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

  // ... rest of your component remains exactly the same ...
  if (isCartLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isCartLoading && cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center p-6">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <FiShoppingBag className="text-gray-400 text-5xl" />
        </div>
        <h2 className="text-2xl font-medium text-gray-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 max-w-md mb-6">
          Looks like you haven't added anything to your cart yet. Start shopping
          to see items here.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 mt-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={item.product_image?.[0]}
                  alt={item.product_name}
                  className="w-24 h-24 rounded-lg object-cover self-center"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.product_name}
                  </h2>
                  <p className="text-orange-600 font-medium mt-1">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(item.product_price)}
                  </p>
                </div>

                <div className="flex gap-2 self-center sm:self-end">
                  <button
                    onClick={() => handleBuyNow(item._id)}
                    className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    title="Buy via WhatsApp"
                  >
                    <FaWhatsapp className="text-green-600" />
                    <span className="hidden sm:inline">Buy</span>
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    title="Remove item"
                  >
                    <FiTrash2 />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Items ({cartItems.length})
                </span>
                <span className="font-medium">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(calculateTotal())}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">FREE</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-600">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(calculateTotal())}
                </span>
              </div>
            </div>

            <button
              onClick={handleBuyAll}
              disabled={isBuying}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <FaCartArrowDown />
              {isBuying
                ? "Processing..."
                : `Checkout (${cartItems.length} items)`}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              You'll complete your purchase on WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
