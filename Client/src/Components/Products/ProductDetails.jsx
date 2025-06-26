import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../Contexts/Contexts";

const ZoomImage = ({ src, zoom = 2.5, radius = 180 }) => {
  const containerRef = useRef();
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setZoomPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      className="relative w-full h-[400px] overflow-hidden border rounded-lg"
    >
      <img
        src={src}
        alt="Zoom"
        className="w-full h-full object-cover"
        draggable={false}
      />
      {showZoom && (
        <div
          className="absolute pointer-events-none border-2 border-white shadow-2xl rounded-full"
          style={{
            width: radius,
            height: radius,
            top: zoomPosition.y - radius / 2,
            left: zoomPosition.x - radius / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${containerRef.current?.offsetWidth * zoom}px ${
              containerRef.current?.offsetHeight * zoom
            }px`,
            backgroundPosition: `-${zoomPosition.x * zoom - radius / 2}px -${
              zoomPosition.y * zoom - radius / 2
            }px`,
            backgroundRepeat: "no-repeat",
            transition: "opacity 0.1s ease",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.product_image?.[0]); // default main image
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2 gap-10 p-6 md:p-12"
      >
        <div>
          <ZoomImage src={selectedImage} />

          <div className="flex gap-3 mt-4 flex-wrap">
            {product.product_image?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`h-20 w-20 object-cover rounded-lg border cursor-pointer transition-transform duration-300 hover:scale-105 ${
                  selectedImage === img
                    ? "border-orange-500 ring-2 ring-orange-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
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
