import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Initially muted for autoplay
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleShopNow = () => {
    navigate("/Products");
  };

  useEffect(() => {
    // Try to autoplay when component mounts
    const tryAutoplay = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
        }
      } catch (err) {
        console.log("Autoplay prevented:", err);
        // Fallback to click-to-play
        const handleFirstClick = () => {
          if (videoRef.current) {
            videoRef.current
              .play()
              .catch((e) => console.log("Play failed:", e));
          }
          document.removeEventListener("click", handleFirstClick);
        };
        document.addEventListener("click", handleFirstClick);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () =>
        setIsVideoLoaded(true)
      );
      tryAutoplay();
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", () =>
          setIsVideoLoaded(true)
        );
      }
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Replace with your actual video URL
  const videoUrl =
    "https://res.cloudinary.com/your-account/video/upload/v1234567/your-video.mp4";

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        loop
        muted={isMuted}
        playsInline
        style={{ filter: "brightness(.6)" }}
        src={"/images/bgvideo.mov"}
      />

      {/* Loading overlay */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-black/50 z-0 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>

      {/* Main Content */}
      <div className="z-10 text-center text-white max-w-5xl px-4 mt-20">
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
      </div>
    </div>
  );
};

export default Home;
