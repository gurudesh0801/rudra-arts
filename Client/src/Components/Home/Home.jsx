import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
// import video from "../../assets/images/herobgvideo.mp4";

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Initially muted for autoplay

  const handleShopNow = () => {
    navigate("/Products");
  };
  useEffect(() => {
    const handleFirstClick = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play();
      }
      setIsMuted(false);
      document.removeEventListener("click", handleFirstClick);
    };

    document.addEventListener("click", handleFirstClick);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {/* <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        loop
        autoPlay
        muted={isMuted}
        playsInline
        style={{ filter: "brightness(.6)" }}
        src={video}
      /> */}

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition"
        title={isMuted ? "Turn Sound On" : "Mute Sound"}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>

      {/* Main Content */}
      <div className="z-10 text-center text-white max-w-5xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-semibold font-montserrat"
        >
          Timeless Creations, Crafted with Soul
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-lg leading-relaxed"
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
            className="bg-white text-black hover:bg-red-900 hover:text-white transition duration-500 px-6 py-2 font-medium"
          >
            Shop Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
