import { useCart } from "../../Contexts/Contexts";

const Cart = () => {
  const { cartItems, removeFromCart, isCartLoading } = useCart(); // ✅ Get flag

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

  if (isCartLoading) {
    return <div className="p-6 text-center text-xl">Loading your cart...</div>;
  }

  if (cartItems.length === 0) {
    return <div className="p-6 text-center text-xl">Your cart is empty.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto my-20 py-10">
      <div className="p-6 text-center text-xl flex justify-center items-center min-h-[40vh]">
        <span className="animate-pulse text-gray-500">
          Loading your cart...
        </span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row items-center justify-between p-4 border rounded mb-4 gap-4"
        >
          <div className="flex gap-4 items-center w-full md:w-auto">
            <img
              src={item.product_image?.[0]}
              alt={item.product_name}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h2 className="font-semibold">{item.product_name}</h2>
              <p className="text-orange-700 font-bold">₹{item.product_price}</p>
            </div>
          </div>

          <div className="flex gap-2 md:items-end">
            <button
              onClick={() => handleBuyNow(item._id)}
              className="bg-orange-600 text-white py-1.5 px-4 rounded hover:bg-orange-700 transition md:mb-0"
            >
              Buy
            </button>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-600 outline outline-1 outline-red-600 hover:bg-red-600 hover:text-white py-1.5 px-4 rounded transition"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
