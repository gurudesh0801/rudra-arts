import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../Contexts/Contexts";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowLeft,
  FiCheck,
} from "react-icons/fi";

// ZoomImage component remains exactly the same
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

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
        setSelectedImage(data.product_image?.[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleNextImage = () => {
    if (!product?.product_image) return;
    const nextIndex = (currentImageIndex + 1) % product.product_image.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(product.product_image[nextIndex]);
    scrollThumbnail(nextIndex);
  };

  const handlePrevImage = () => {
    if (!product?.product_image) return;
    const prevIndex =
      (currentImageIndex - 1 + product.product_image.length) %
      product.product_image.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(product.product_image[prevIndex]);
    scrollThumbnail(prevIndex);
  };

  const scrollThumbnail = (index) => {
    if (thumbnailContainerRef.current) {
      const thumbnailWidth = 88;
      thumbnailContainerRef.current.scrollTo({
        left: index * thumbnailWidth - thumbnailWidth * 2,
        behavior: "smooth",
      });
    }
  };

  const handleThumbnailClick = (img, index) => {
    setSelectedImage(img);
    setCurrentImageIndex(index);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
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
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <FiCheck className="text-xl" />
              <span>Product Added to Cart!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-orange-600 mb-8 transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden bg-gray-50">
              <ZoomImage src={selectedImage} />

              {product.product_image?.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md transition-all duration-300 z-20 hover:bg-white hover:scale-110"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md transition-all duration-300 z-20 hover:bg-white hover:scale-110"
                    aria-label="Next image"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.product_image?.length > 1 && (
              <div className="relative">
                <div
                  ref={thumbnailContainerRef}
                  className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide"
                >
                  {product.product_image.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(img, index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentImageIndex === index
                          ? "border-orange-500 ring-1 ring-orange-300"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="lg:pt-8">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                {product.product_name}
              </h1>

              <div className="flex items-center space-x-4">
                <p className="text-3xl font-semibold text-orange-600">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(product.product_price)}
                </p>
              </div>

              {product.product_size && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Size:</span>
                  <span className="font-medium">{product.product_size}</span>
                </div>
              )}

              <div className="prose text-gray-500 max-w-none">
                <p>
                  {product.product_description || "No description provided."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
