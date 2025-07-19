import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Format time (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Initialize video
  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseMove={() => {
        setShowControls(true);
        setTimeout(() => setShowControls(false), 3000);
      }}
      onTouchMove={() => {
        setShowControls(true);
        setTimeout(() => setShowControls(false), 3000);
      }}
    >
      {/* Heading Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute top-10 left-0 right-0 z-10 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Chhatrapati's Visit
        </h1>
      </motion.div>

      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        autoPlay
        muted={isMuted}
        playsInline
        controls
      >
        <source src="/images/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
        <motion.div
          className="h-full bg-red-500"
          style={{
            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
