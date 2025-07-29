import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true); // 🔥 New

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    console.log("💾 Loaded from localStorage:", savedCart);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsCartLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (!exists) setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
  };

  const clearCart = () => {
    setCartItems([]); // or however you're managing state
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        clearCart,
        removeFromCart,
        isCartLoading,
        increaseQuantity,
        decreaseQuantity,
      }} // ✅ pass flag
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
