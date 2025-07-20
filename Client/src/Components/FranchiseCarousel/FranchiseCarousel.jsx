import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

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
          <Box
            sx={{
              flex: 1,
              p: isMobile ? 3 : 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <AnimatedUnderline>
              <img
                src={franchise.logo}
                alt={`${franchise.name} logo`}
                style={{
                  width: isMobile ? "10rem" : "15rem",
                  height: "auto",
                  objectFit: "contain",
                  marginBottom: "0.5rem",
                }}
              />
            </AnimatedUnderline>
            <Typography
              sx={{
                mb: 1,
                fontSize: isMobile ? "1.1rem" : "3rem",
                fontFamily: "Times New Roman, serif",
              }}
              className="text-customBrown"
            >
              {franchise.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
                fontSize: isMobile ? "0.875rem" : "1.2rem",
                fontFamily: "Times New Roman, serif",
              }}
            >
              {(Array.isArray(franchise.description)
                ? franchise.description
                : [franchise.description]
              ).map((address, idx) => (
                <Box key={idx} sx={{ mb: 1 }}>
                  • {address}
                </Box>
              ))}
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
            }}
          >
            <img
              src={franchise.image}
              alt={franchise.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                transition: "transform 0.5s ease, filter 0.3s ease",
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
      logo: "/images/rudra_arts_logo_single.png",
      image: "/images/rudraArtsDighi.jpg",
      name: "Rudra Arts Dighi",
      description:
        "Survey No. 4, Hrishikesh Building, Parandenagar ( Samarthnagar) Dighi, Pune 411015, Behind Bikaner Sweets, Pune, Maharashtra 411015",
    },
    {
      logo: "/images/franchise14.png",
      image: "/images/pratikrutiArts.jpg",
      name: "Pratikruti Arts",
      description:
        "Parshuram Apartment, Opposite Lokamanya Vachnalaya, Navi Peth, Pune, Maharashtra 411030, India",
    },
    {
      logo: "/images/franchise6.png",
      image: "/images/kitabwala1.jpg",
      name: "Kitabwala",
      description: [
        "Kitabwala Store and Arts, Arvind Apartment, in front of Mantri Hospital, Erandwana Gaothan, Erandwane, Pune, Maharashtra 411004",
        "Warden Vakil Chawl 2, 3rd floor, Veer Santaji Lane, Ganpatrao Kadam Marg, Lower Parel, Mumbai, Maharashtra 400013",
      ],
    },
    {
      logo: "/images/franchise3.png",
      image: "/images/rayriArts.jpg",
      name: "Rayari Arts",
      description:
        "House no 31/A, Vijayalankar Society, Taljai Rd, Dhankawadi, Pune, Maharashtra 411043",
    },
    {
      logo: "/images/franchise5.png",
      image: "/images/gajaiArts1.jpg",
      name: "Gajai Arts",
      description:
        "Shop No-12, Anmol Terrace Chs Ltd., Plot no - 20, Sector 5 Kopar Khairane Rd, Sector 5, Kopar Khairane, Navi Mumbai, Maharashtra 400709",
    },
    {
      logo: "/images/franchise15.png",
      image: "/images/kaladalanByCanus.jpg",
      name: "Kaladalan By Canus",
      description:
        "B-1-A, Deepa Arihant building, near maneklal ground, ghatkopar west, Mumbai, Maharashtra 400086",
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
            fontSize: { xs: "2rem", md: "2.5rem" },
            letterSpacing: "0.5px",
            fontFamily: "Times New Roman, serif",
          }}
          className="text-customBrown"
        >
          <AnimatedUnderline>Our Franchises and Dealerships</AnimatedUnderline>
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
