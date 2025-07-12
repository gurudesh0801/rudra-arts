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
    return [...products].reverse().slice(0, 4);
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
    <section className="bg-gradient-to-br from-[#fffaf0] to-[#fef6e4] py-16 px-4 font-times">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-normal text-orange-900 mb-2 font-times">
          Featured Products
        </h1>
        <p className="text-gray-600 italic text-lg mb-12">
          Reliving History Through Every Creation
        </p>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {latestProducts.map((product) => (
            <div
              key={product._id}
              className="relative bg-white/70 backdrop-blur-xl shadow-2xl border border-orange-200 rounded-2xl overflow-hidden transition-transform hover:scale-[1.025] duration-300"
            >
              <img
                src={product.product_image?.[0] || "/placeholder.jpg"}
                alt={product.product_name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate(`/product-details/${product._id}`)}
              />

              <div className="p-5 text-left">
                <h2 className="text-xl font-normal text-gray-900 mb-2 line-clamp-1">
                  {product.product_name}
                </h2>

                <div className="flex justify-between items-center mb-3">
                  <span className="bg-orange-100 text-orange-700 font-normal text-sm px-3 py-1 rounded-full">
                    ₹ {product.product_price}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/product-details/${product._id}`)}
                  className="w-full bg-customBrown hover:bg-orange-700 text-white font-normal py-2 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <img
                    src="/images/dhaltalwar.png"
                    alt="Icon Left"
                    className="w-5 h-5 invert"
                  />
                  <span>View Details</span>
                  <img
                    src="/images/dhaltalwar.png"
                    alt="Icon Right"
                    className="w-5 h-5 invert"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <button
            onClick={() => navigate("/Products")}
            className="px-6 py-2 border border-orange-600 text-orange-700 hover:bg-orange-100 font-normal transition"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
