import { useEffect } from "react";
import {
  Typography,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Brush,
  Insights,
  Diversity2,
  MilitaryTech,
  Castle,
  History,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import weaponsBg from "/images/border.jpg";
import aboutbg1 from "/images/IMG-20250617-WA0027.jpg";
import aboutbg2 from "/images/bts21.jpg";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";
import { Link } from "react-router-dom";

// Modern card animation variants
const cardFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const FullAbout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 12, md: 8 },
        pt: 8,
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at center, #1a1a1a 0%, #121212 100%)"
            : "radial-gradient(circle at center, #f9f9f9 0%, #eaeaea 100%)",
      }}
    >
      {/* Background image with reduced opacity for better readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          background: `url(${weaponsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 20,
          maxWidth: "1400px",
          margin: "0 auto",
          px: { xs: 2, md: 6 },
        }}
      >
        {/* Hero Section - Stacked on mobile */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 6 },
            mb: { xs: 4, md: 12 },
            pt: { xs: 2, md: 8 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ flex: 1 }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                fontSize: { xs: "3rem", sm: "2.5rem", md: "3.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: { xs: "-0.5px", md: "-1px" },
                fontFamily: '"Playfair Display", serif',
                textAlign: { xs: "center", md: "left" },
              }}
              className="font-playfair text-black"
            >
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  position: "relative",
                }}
                className="text-customBrown"
              >
                Chhatrapati's Legacy
              </Box>
              <Box
                sx={{
                  display: { xs: "block", md: "inline" },
                  ml: { xs: 0, md: "0.5rem" },
                }}
              >
                Etched in Every Stone
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                lineHeight: 1.6,
                mb: 3,
                textAlign: { xs: "center", md: "left" },
              }}
              className="font-extrabold"
            >
              India's 1st Historic Studio of Authentic Statues of Chhatrapati
              Shivaji Maharaj and Maratha Weapons. Manufacturer of Miniatures,
              Statues, Mavala Idols.
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 3,
                p: 2,
                background: "white",
                borderRadius: 2,
                borderLeft: `4px solid ${
                  theme.palette.mode === "dark" ? "#E67E51" : "#8C391B"
                }`,
                maxWidth: "100%",
                mx: { xs: "auto", md: 0 },
              }}
            >
              <Avatar
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(230,126,81,0.2)"
                      : "rgba(140,57,27,0.2)",
                  color: theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                }}
              >
                <Brush fontSize={isMobile ? "medium" : "large"} />
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                    color:
                      theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                  }}
                >
                  Managing Director
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    color: theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
                  }}
                >
                  Satyajeet Arun Vaidya
                </Typography>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{
              flex: 1,
              position: "relative",
              minHeight: isMobile ? 250 : 400,
              width: "100%",
              marginTop: isMobile ? 2 : 0,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: theme.shadows[4],
                background: `url(${aboutbg1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>
        </Box>

        {/* Mission Section */}
        <Box sx={{ mb: { xs: 6, md: 12 } }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                alignItems: "center",
                mb: 4,
              }}
            >
              <motion.div variants={cardFade}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "1.8rem", md: "3rem" },
                    fontWeight: 800,
                    lineHeight: 1,
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, #E67E51 0%, #F9A875 100%)"
                        : "linear-gradient(90deg, #8C391B 0%, #D45B2B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    width: "fit-content",
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Our Mission
                </Typography>
              </motion.div>

              <motion.div variants={cardFade} style={{ flex: 1 }}>
                <Box
                  sx={{
                    height: 4,
                    width: { xs: "100px", md: "100%" },
                    mx: { xs: "auto", md: 0 },
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, rgba(230,126,81,0.5) 0%, rgba(140,57,27,0) 100%)"
                        : "linear-gradient(90deg, rgba(140,57,27,0.5) 0%, rgba(140,57,27,0) 100%)",
                    borderRadius: 2,
                  }}
                />
              </motion.div>
            </Box>

            <motion.div variants={cardFade}>
              <Box
                sx={{
                  p: { xs: 3, md: 6 },
                  borderRadius: "12px",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(145deg, rgba(40,40,40,0.8) 0%, rgba(26,26,26,0.8) 100%)"
                      : "linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(248,248,248,0.8) 100%)",
                  backdropFilter: "blur(12px)",
                  boxShadow: theme.shadows[2],
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "1px solid rgba(0,0,0,0.05)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.5rem" },
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(0,0,0,0.9)",
                    position: "relative",
                    zIndex: 1,
                    "&::first-letter": {
                      initialLetter: 2,
                      color:
                        theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                      fontWeight: 700,
                      marginRight: "0.5rem",
                    },
                  }}
                >
                  To preserve the warrior ethos of the Sahyadri mountains
                  through historically accurate recreations of the weapons,
                  armor, and artifacts once wielded by the legendary forces that
                  shaped our heritage.
                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        </Box>

        {/* Core Values Section - Single column on mobile */}
        <Box sx={{ mb: { xs: 6, md: 12 } }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <motion.div variants={cardFade}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "1.8rem", md: "3rem" },
                  fontWeight: 800,
                  mb: 4,
                  color: theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
                  "& span": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, #E67E51 0%, #F9A875 100%)"
                        : "linear-gradient(90deg, #8C391B 0%, #D45B2B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                }}
              >
                The <span>Spirit</span> Behind Our Work
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 3,
                maxWidth: "1400px",
                mx: "auto",
              }}
            >
              {[
                {
                  icon: <Brush fontSize={isMobile ? "medium" : "large"} />,
                  title: "Historical Precision",
                  desc: "Every curve of our wagh nakh replicas and every detail in our armor recreations follows documented accounts of the Maratha warriors' equipment.",
                  color: theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                },
                {
                  icon: <Insights fontSize={isMobile ? "medium" : "large"} />,
                  title: "Warrior's Spirit",
                  desc: "We infuse each creation with the same dedication shown by the mountain warriors who defended our land.",
                  color: theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                },
                {
                  icon: <Diversity2 fontSize={isMobile ? "medium" : "large"} />,
                  title: "Cultural Continuity",
                  desc: "Connecting modern generations with the martial traditions that defined our history.",
                  color: theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardFade}
                  custom={i}
                  whileHover={{ y: isMobile ? 0 : -8 }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      p: 3,
                      borderRadius: "12px",
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(145deg, rgba(40,40,40,0.8) 0%, rgba(26,26,26,0.8) 100%)"
                          : "linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(248,248,248,0.8) 100%)",
                      backdropFilter: "blur(12px)",
                      boxShadow: theme.shadows[2],
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid rgba(0,0,0,0.05)",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      "&:hover": {
                        boxShadow: isMobile
                          ? theme.shadows[2]
                          : theme.shadows[6],
                        transform: isMobile ? "none" : "translateY(-8px)",
                      },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 4,
                        background: `linear-gradient(90deg, ${item.color} 0%, ${
                          theme.palette.mode === "dark" ? "#1a1a1a" : "#f9f9f9"
                        } 100%)`,
                      }}
                    />

                    <Avatar
                      sx={{
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? `${item.color}20`
                            : `${item.color}10`,
                        color: item.color,
                        width: { xs: 50, md: 60 },
                        height: { xs: 50, md: 60 },
                        mb: 2,
                        border:
                          theme.palette.mode === "dark"
                            ? `1px solid ${item.color}30`
                            : `1px solid ${item.color}20`,
                      }}
                    >
                      {item.icon}
                    </Avatar>

                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                        fontWeight: 700,
                        mb: 1,
                        color:
                          theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.7)",
                        lineHeight: 1.6,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Craftsmanship Section - Stacked on mobile */}
        <Box sx={{ mb: { xs: 6, md: 12 } }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <motion.div variants={cardFade}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "1.8rem", md: "3rem" },
                  fontWeight: 800,
                  textAlign: "center",
                  mb: 4,
                  color: theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
                  "& span": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, #E67E51 0%, #F9A875 100%)"
                        : "linear-gradient(90deg, #8C391B 0%, #D45B2B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                }}
              >
                <span>Authentic</span> Craftsmanship
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                gap: 4,
                alignItems: "center",
              }}
            >
              <motion.div variants={cardFade} style={{ flex: 1 }}>
                <Box
                  sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: "12px",
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(145deg, rgba(40,40,40,0.8) 0%, rgba(26,26,26,0.8) 100%)"
                        : "linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(248,248,248,0.8) 100%)",
                    backdropFilter: "blur(12px)",
                    boxShadow: theme.shadows[2],
                    border:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "1px solid rgba(0,0,0,0.05)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", md: "1.2rem" },
                      fontWeight: 500,
                      lineHeight: 1.6,
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(0,0,0,0.9)",
                      mb: 2,
                    }}
                  >
                    Our artisans employ traditional techniques passed down
                    through generations to recreate the weapons and artifacts
                    that once defended the Sahyadri forts.
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                      gap: 2,
                      mt: 3,
                    }}
                  >
                    {[
                      "Hand-Forged Metals",
                      "Traditional Joinery",
                      "Historical Accuracy",
                      "Artisanal Detailing",
                    ].map((item, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background:
                              theme.palette.mode === "dark"
                                ? "#E67E51"
                                : "#8C391B",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.8)"
                                : "rgba(0,0,0,0.8)",
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </motion.div>

              <motion.div variants={cardFade} custom={1} style={{ flex: 1 }}>
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: 250, md: 400 },
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: theme.shadows[4],
                    background: `url(${aboutbg2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </motion.div>
            </Box>
          </motion.div>
        </Box>

        {/* Offerings Section - Single column on mobile */}
        <Box sx={{ mb: { xs: 6, md: 12 } }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <motion.div variants={cardFade}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "1.8rem", md: "3rem" },
                  fontWeight: 800,
                  mb: 4,
                  color: theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
                  "& span": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, #E67E51 0%, #F9A875 100%)"
                        : "linear-gradient(90deg, #8C391B 0%, #D45B2B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                }}
              >
                Inspired by <span>History</span>
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 3,
              }}
            >
              {[
                {
                  icon: (
                    <MilitaryTech fontSize={isMobile ? "medium" : "large"} />
                  ),
                  title: "Warrior Weapons",
                  desc: "Faithful recreations of traditional arms including Maratha Dhoop(talwars), Katyar, and dand patta swords used by Maharashtra's forces.",
                  color: theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                },
                {
                  icon: <History fontSize={isMobile ? "medium" : "large"} />,
                  title: "Heroic Statues",
                  desc: "Handcrafted sculptures capturing the dynamic poses and iconic armor of our legendary warriors.",
                  color: theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                },
                {
                  icon: <Castle fontSize={isMobile ? "medium" : "large"} />,
                  title: "Fort Decor",
                  desc: "Art pieces inspired by the architectural elements of Maharashtra's historic hill forts.",
                  color: theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardFade}
                  custom={i}
                  whileHover={{ y: isMobile ? 0 : -8 }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      p: 3,
                      borderRadius: "12px",
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(145deg, rgba(40,40,40,0.8) 0%, rgba(26,26,26,0.8) 100%)"
                          : "linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(248,248,248,0.8) 100%)",
                      backdropFilter: "blur(12px)",
                      boxShadow: theme.shadows[2],
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid rgba(0,0,0,0.05)",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      "&:hover": {
                        boxShadow: isMobile
                          ? theme.shadows[2]
                          : theme.shadows[6],
                        transform: isMobile ? "none" : "translateY(-8px)",
                      },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 4,
                        background: `linear-gradient(90deg, ${item.color} 0%, ${
                          theme.palette.mode === "dark" ? "#1a1a1a" : "#f9f9f9"
                        } 100%)`,
                      }}
                    />

                    <Avatar
                      sx={{
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? `${item.color}20`
                            : `${item.color}10`,
                        color: item.color,
                        width: { xs: 50, md: 60 },
                        height: { xs: 50, md: 60 },
                        mb: 2,
                        border:
                          theme.palette.mode === "dark"
                            ? `1px solid ${item.color}30`
                            : `1px solid ${item.color}20`,
                      }}
                    >
                      {item.icon}
                    </Avatar>

                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                        fontWeight: 700,
                        mb: 1,
                        color:
                          theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.7)",
                        lineHeight: 1.6,
                        mb: 2,
                        fontSize: { xs: "0.9rem", md: "1rem" },
                      }}
                    >
                      {item.desc}
                    </Typography>

                    <Link to="/products">
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1,
                          color: item.color,
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Explore collection
                        <Box
                          component="span"
                          sx={{
                            display: "inline-flex",
                            transition: "transform 0.3s",
                            "div:hover &": {
                              transform: isMobile ? "none" : "translateX(4px)",
                            },
                          }}
                        >
                          →
                        </Box>
                      </Box>
                    </Link>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Legacy Section - Full Width */}
        <Box sx={{ mb: { xs: 4, md: 8 } }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardFade}
          >
            <Box
              sx={{
                p: { xs: 3, md: 8 },
                borderRadius: "12px",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(140,57,27,0.8) 0%, rgba(100,30,10,0.8) 100%)"
                    : "linear-gradient(145deg, rgba(140,57,27,0.9) 0%, rgba(100,30,10,0.9) 100%)",
                boxShadow: theme.shadows[4],
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `url(${weaponsBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.1,
                  mixBlendMode:
                    theme.palette.mode === "dark" ? "lighten" : "overlay",
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  maxWidth: "800px",
                  mx: "auto",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                    fontWeight: 800,
                    mb: 3,
                    color: "#fff",
                    lineHeight: 1.2,
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  Carrying Forward the Warrior Ethos
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.6,
                    mb: 3,
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  These creations are more than artifacts — they embody the
                  courage, strategy, and resilience that defined a golden era in
                  our warrior legacy.
                </Typography>

                <motion.div
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: 3,
                      py: 1.5,
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "50px",
                      color: "#fff",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      "&:hover": {
                        background: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    Discover the Legacy
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        transition: "transform 0.3s",
                      }}
                    >
                      →
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default FullAbout;
