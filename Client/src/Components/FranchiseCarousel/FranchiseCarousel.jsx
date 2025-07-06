import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
const FranchiseCarousel = () => {
  const franchiseImages = [
    "/images/franchise1.png",
    "/images/franchise3.png",
    "/images/franchise5.png",
    "/images/franchise6.png",
    // "/images/franchise7.png",
    // "/images/franchise8.png",
    // "/images/franchise9.png",
    // "/images/franchise10.png",
    // "/images/franchise11.png",
    // "/images/franchise12.png",
    // "/images/franchise13.png",
  ];

  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const itemWidthRef = useRef(0);
  const totalWidthRef = useRef(0);
  const positionRef = useRef(0);

  // Initialize carousel measurements
  useEffect(() => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      itemWidthRef.current = carouselRef.current.children[0].offsetWidth + 16; // including margin
      totalWidthRef.current = itemWidthRef.current * franchiseImages.length;

      // Set initial position to create infinite loop illusion
      positionRef.current = -totalWidthRef.current;
      carouselRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }
  }, [franchiseImages.length]);

  // Auto-scroll animation
  useEffect(() => {
    const scrollSpeed = 100; // pixels per second (adjust as needed)
    let lastTime;

    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (carouselRef.current) {
        // Calculate new position
        positionRef.current -= (scrollSpeed * deltaTime) / 1000;

        // Reset position when we've scrolled one full set
        if (Math.abs(positionRef.current) >= totalWidthRef.current * 2) {
          positionRef.current = -totalWidthRef.current;
        }

        // Apply the transformation
        carouselRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [franchiseImages.length]);

  // Triple the images for seamless looping
  const tripledImages = [
    ...franchiseImages,
    ...franchiseImages,
    ...franchiseImages,
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        py: 4,
        backgroundColor: "",
      }}
      ref={containerRef}
    >
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-5xl font-semibold font-playfair text-center mb-1 text-customBrown"
      >
        Our Franchises
      </motion.h1>

      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          willChange: "transform",
        }}
      >
        {tripledImages.map((img, index) => (
          <Box
            key={`${index}-${img}`}
            sx={{
              flex: "0 0 auto",
              width: { xs: "150px", sm: "200px", md: "250px" },
              height: { xs: "100px", sm: "150px", md: "150px" },
              mx: 2,
              position: "relative",
            }}
          >
            <img
              src={img}
              alt={`Franchise ${(index % franchiseImages.length) + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              loading="lazy"
            />
            {/* <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                textAlign: "center",
                py: 1,
                fontSize: "0.9rem",
              }}
            >
              Franchise {(index % franchiseImages.length) + 1}
            </Box> */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FranchiseCarousel;
