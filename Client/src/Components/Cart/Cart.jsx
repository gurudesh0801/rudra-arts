import { useCart } from "../../Contexts/Contexts";
import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart, isCartLoading } = useCart();
  const [isBuying, setIsBuying] = useState(false);

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
    for (let item of cartItems) {
      await handleBuyNow(item._id);
    }
    setIsBuying(false);
  };

  if (isCartLoading) {
    return (
      <div className="p-6 text-center text-xl animate-pulse text-gray-600">
        Loading your cart...
      </div>
    );
  }

  console.log("🛒 Cart items:", cartItems);
  if (isCartLoading) {
    return (
      <div className="p-6 text-center text-xl animate-pulse text-gray-600">
        Loading your cart...
      </div>
    );
  }

  if (!isCartLoading && cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="w-60 h-60 mb-4 opacity-70"
        />
        <h2 className="text-xl font-semibold text-gray-500">
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4 pb-20 pt-10 font-outfit">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#4b2e10]">
        Royal Cart
      </h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-[#fdf7f2] border border-[#e4d5c0] rounded-xl shadow-md p-5 relative flex flex-col md:flex-row items-center justify-between transition-transform hover:scale-[1.01]"
            style={{
              backgroundImage:
                "url(https://www.transparenttextures.com/patterns/paper-fibers.png)",
              backgroundBlendMode: "overlay",
            }}
          >
            <div className="flex items-center gap-5 w-full md:w-auto">
              <img
                src={item.product_image?.[0]}
                alt={item.product_name}
                className="w-24 h-24 rounded-md border border-[#d5b79b] object-cover shadow-sm"
              />
              <div>
                <h2 className="text-lg font-bold text-[#4b2e10] tracking-wide">
                  {item.product_name}
                </h2>
                <p className="text-[#a15c1b] text-xl font-semibold mt-1">
                  ₹{item.product_price}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              {cartItems.length === 1 && (
                <button
                  onClick={() => handleBuyNow(item._id)}
                  className="bg-[#9f6b1d] hover:bg-[#8a5410] text-white px-5 py-2 rounded-lg transition font-semibold"
                >
                  Buy Now
                </button>
              )}
              <button
                onClick={() => removeFromCart(item._id)}
                className="border border-red-500 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 1 && (
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleBuyAll}
            disabled={isBuying}
            className="bg-customBrown hover:bg-[#7C444F] text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition duration-300"
          >
            <FaCartArrowDown size={20} />
            {isBuying ? "Processing..." : "Buy All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
