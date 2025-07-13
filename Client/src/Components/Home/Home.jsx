import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Replace these with your actual image paths
  const slides = [
    "/images/maharaj1.jpg",
    // "/images/slide2.jpg",
    // "/images/slide3.jpg",
    "/images/slide4.jpg",
    "/images/slide5.jpg",
  ];

  const handleShopNow = () => {
    navigate("/Products");
  };

  const startSlider = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
  };

  const stopSlider = () => {
    clearInterval(intervalRef.current);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    if (isPlaying) {
      stopSlider();
      startSlider();
    }
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    if (isPlaying) {
      stopSlider();
      startSlider();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSlider();
    } else {
      startSlider();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    startSlider();
    return () => stopSlider();
  }, []);

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden bg-black pt-20 mt-20">
      {/* Image Carousel Background */}
      <div
        ref={sliderRef}
        className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden"
      >
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover brightness-[0.6]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Play/Pause Button (replacing mute button) */}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-6 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition hidden md:block"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-6 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition hidden md:block"
        aria-label="Next slide"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Main Content (unchanged from your original) */}
      {/* <div className="z-10 text-center text-white max-w-5xl px-4 mt-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-normal font-times"
        >
          Timeless Creations, Crafted with Soul
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-lg leading-relaxed font-times"
        >
          Discover the essence of heritage and artistry in every masterpiece. At
          Rudra Arts & Handicrafts, we bring stories <br />
          to life through intricate designs, preserving tradition while
          embracing creativity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={handleShopNow}
            className="flex items-center gap-2 bg-customBrown text-white hover:bg-red-900 hover:text-white transition duration-500 px-6 py-2 font-medium rounded font-times"
          >
            <img
              src="/images/dhaltalwar.png"
              alt="Icon"
              className="w-5 h-5 invert"
            />
            Shop Now
            <img
              src="/images/dhaltalwar.png"
              alt="Icon"
              className="w-5 h-5 invert"
            />
          </button>
        </motion.div>
      </div> */}
    </div>
  );
};

export default Home;
