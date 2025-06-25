import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../Contexts/Contexts";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = async () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-red-600 mt-10 text-xl font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-orange-50 via-white to-orange-100 py-20 px-6 mt-16">
      {/* Modal for full image preview */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[90%] max-h-[80vh] rounded-xl shadow-xl border-4 border-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2 gap-10 p-6 md:p-12"
      >
        <div>
          <img
            src={product.product_image?.[0]}
            alt={product.product_name}
            className="rounded-2xl w-full h-[400px] object-cover shadow-md border border-orange-200 cursor-pointer"
            onClick={() => {
              setSelectedImage(product.product_image?.[0]);
              setShowModal(true);
            }}
          />

          {/* Thumbnail Gallery */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {product.product_image?.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className="h-20 w-20 object-cover rounded-lg border border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  setSelectedImage(img);
                  setShowModal(true);
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-[#5C4A1C] mb-4 tracking-tight leading-tight">
            {product.product_name}
          </h1>
          <p className="text-md text-gray-600 mb-6 leading-relaxed">
            {product.product_description || "No description provided."}
          </p>
          <p className="text-3xl font-bold text-orange-700 mb-8">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(product.product_price)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-orange-600 hover:bg-orange-700 text-white text-lg font-medium py-2 px-6 rounded-lg transition duration-300"
            >
              Add to cart
            </button>
            <button
              onClick={() => navigate(-1)}
              className="border border-orange-500 hover:bg-orange-50 text-orange-700 font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Back to Products
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
