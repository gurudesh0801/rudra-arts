"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const latestProducts = useMemo(() => {
    return [...products].reverse().slice(0, 8);
  }, [products]);

  const sendWhatsAppMessage = async (productId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL_PRODUCTION
        }/api/products/${productId}/whatsapp-message`
      );
      const data = await response.json();
      if (data.whatsappURL) window.open(data.whatsappURL, "_blank");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#fffaf0] py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#706D54] uppercase mb-3">
          Products
        </h1>
        <p className="italic text-gray-600 mb-12 text-lg">
          Reliving History Through Every Creation
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {latestProducts.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-200 transform hover:scale-[1.02] transition duration-200 will-change-transform"
            >
              <img
                src={product.product_image?.[0] || "/placeholder.jpg"}
                alt={product.product_name}
                className="w-full h-48 object-cover"
                loading="lazy" // ✅ Lazy load to prevent blocking render
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.product_name}
                </h2>
                <p className="text-md text-orange-700 mt-1 mb-2 font-medium">
                  ₹ {product.product_price}
                </p>
                <button
                  onClick={() => navigate(`/product-details/${product._id}`)}
                  className="w-full bg-customBrown hover:bg-orange-700 text-white font-semibold py-2 rounded-md mt-2"
                >
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button
            onClick={() => navigate("/Products")}
            className="px-6 py-2 border border-orange-700 text-orange-700 hover:bg-orange-100 rounded-md"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
