import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

const FranchiseCard = ({ franchise, index }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-b from-amber-50 to-amber-100"
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          },
        }}
        className="bg-amber-50"
      >
        {/* Logo Section - Top on mobile, left on desktop */}
        <Box
          sx={{
            flex: isMobile ? "0 0 auto" : "0 0 25%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: isMobile ? 3 : 4,
            backgroundColor: "#f8f9fa",
          }}
        >
          <img
            src={franchise.logo}
            alt={`${franchise.name} logo`}
            style={{
              width: isMobile ? "120px" : "100%",
              height: isMobile ? "60px" : "auto",
              objectFit: "contain",
              filter: "grayscale(100%)",
              opacity: 0.9,
              transition: "filter 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.filter = "grayscale(0%)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.filter = "grayscale(100%)")
            }
          />
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            flex: 1,
            p: isMobile ? 3 : 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "text.primary",
                fontSize: isMobile ? "1.1rem" : "1.25rem",
              }}
            >
              {franchise.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: "text.secondary",
                lineHeight: 1.6,
                fontSize: isMobile ? "0.875rem" : "1rem",
              }}
            >
              {franchise.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                fontSize: "0.75rem",
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.primary.main,
                  mr: 1,
                }}
              />
              {franchise.location}
            </Typography>
          </Box>
        </Box>

        {/* Image Section - Hidden on mobile, right on desktop */}
        {!isMobile && (
          <Box
            sx={{
              flex: "0 0 30%",
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                zIndex: 1,
              },
            }}
          >
            <img
              src={franchise.image}
              alt={franchise.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "brightness(0.95)",
                transition: "transform 0.5s ease, filter 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(0.95)";
              }}
            />
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

const FranchiseCarousel = () => {
  const franchises = [
    {
      logo: "/images/franchise-logo1.png",
      image: "/images/franchise1.png",
      name: "Franchise Name 1",
      description:
        "Specializing in artisanal craftsmanship with a focus on sustainable materials and timeless design.",
      location: "New York, USA",
    },
    {
      logo: "/images/franchise-logo2.png",
      image: "/images/franchise3.png",
      name: "Franchise Name 2",
      description:
        "Innovative culinary experiences blending traditional techniques with modern flavors.",
      location: "London, UK",
    },
    {
      logo: "/images/franchise-logo3.png",
      image: "/images/franchise5.png",
      name: "Franchise Name 3",
      description:
        "Luxury wellness retreats offering personalized holistic treatments and mindfulness programs.",
      location: "Paris, France",
    },
    {
      logo: "/images/franchise-logo4.png",
      image: "/images/franchise6.png",
      name: "Franchise Name 4",
      description:
        "Cutting-edge technology solutions for modern businesses seeking digital transformation.",
      location: "Tokyo, Japan",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        py: 8,
        px: { xs: 2, sm: 4, md: 6 },
        backgroundColor: "",
      }}
      className="bg-gradient-to-b from-amber-50 to-amber-100"
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 400,
            textAlign: "center",
            mb: 6,
            mt: 10,
            color: "text.primary",
            fontSize: { xs: "2rem", md: "2.5rem" },
            letterSpacing: "0.5px",
            fontFamily: "Times New Roman, serif",
          }}
        >
          Our Franchises and Dealerships
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {franchises.map((franchise, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <FranchiseCard franchise={franchise} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FranchiseCarousel;
