import { useEffect } from "react";
import { Typography, Avatar, Box } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import InsightsIcon from "@mui/icons-material/Insights";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { motion } from "framer-motion";

const cardFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const FullAbout = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Box sx={{ backgroundColor: "#ffffff", py: 8 }}>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: { xs: 3, md: 4 } }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="pt-20"
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.2rem", md: "3rem" },
                fontWeight: "bold",
                mb: 3,
                color: "#000000",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
              className="font-montserrat"
            >
              Chhatrapati’s Legacy, Etched in Every Stone
            </Typography>
            <Typography
              sx={{
                maxWidth: "800px",
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "#333333",
                lineHeight: 1.7,
              }}
            >
              At Rudra Arts, we craft timeless tributes to the legendary warrior
              ethos of the land — shaped by valor, vision, and an unyielding
              spirit. Each creation reflects the bravery of the Mavalas and the
              tactical genius that defined a golden chapter in our history.
              Founded by{" "}
              <Box
                component="span"
                sx={{
                  color: "#8C391B",
                  fontWeight: 600,
                  fontSize: "1.4rem",
                  fontStyle: "italic",
                }}
              >
                Satyajeet Arun Vaidya
              </Box>
              , our work preserves this legacy through authentic craftsmanship
              and heartfelt storytelling.
            </Typography>
          </motion.div>
        </Box>

        {/* Mission Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
            py: 6,
            backgroundColor: "#f8f8f8",
            borderRadius: "8px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardFade}
            sx={{ maxWidth: "800px", mx: "auto" }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                fontWeight: "bold",
                mb: 3,
                color: "#8C391B",
                letterSpacing: "-0.5px",
              }}
            >
              Carrying Forward a Timeless Tradition
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#333333",
                lineHeight: 1.7,
              }}
            >
              To preserve the warrior ethos of the Sahyadri mountains through
              historically accurate recreations of the weapons, armor, and
              artifacts once wielded by the legendary forces that shaped our
              heritage.
            </Typography>
          </motion.div>
        </Box>

        {/* Core Values Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.6rem", md: "2rem" },
              fontWeight: "bold",
              mb: 6,
              color: "#000000",
              letterSpacing: "-0.5px",
            }}
          >
            The Spirit Behind Our Work
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            {[
              {
                icon: <BrushIcon fontSize="large" />,
                title: "Historical Precision",
                desc: "Every curve of our wagh nakh replicas and every detail in our armor recreations follows documented accounts of the Maratha warriors' equipment.",
              },
              {
                icon: <InsightsIcon fontSize="large" />,
                title: "Warrior's Spirit",
                desc: "We infuse each creation with the same dedication shown by the mountain warriors who defended our land.",
              },
              {
                icon: <Diversity2Icon fontSize="large" />,
                title: "Cultural Continuity",
                desc: "Connecting modern generations with the martial traditions that defined our history.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardFade}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  p: 4,
                  border: "1px solid #e0e0e0",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                    borderColor: "#8C391B",
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#8C391B",
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    mb: 2,
                    color: "#000000",
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#333333",
                    lineHeight: 1.7,
                    textAlign: "center",
                  }}
                >
                  {item.desc}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Craftsmanship Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
            py: 6,
            backgroundColor: "#f8f8f8",
            borderRadius: "8px",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardFade}
            sx={{ maxWidth: "800px", mx: "auto" }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                fontWeight: "bold",
                mb: 4,
                color: "#8C391B",
                letterSpacing: "-0.5px",
              }}
            >
              Authentic Craftsmanship
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#333333",
                lineHeight: 1.7,
              }}
            >
              Our artisans employ traditional techniques passed down through
              generations to recreate the weapons and artifacts that once
              defended the Sahyadri forts, maintaining the same standards of
              excellence as the original makers.
            </Typography>
          </motion.div>
        </Box>

        {/* Offerings Section */}
        <Box sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            sx={{ maxWidth: "1200px", mx: "auto" }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontSize: { xs: "1.6rem", md: "2rem" },
                fontWeight: "bold",
                mb: 6,
                color: "#000000",
                letterSpacing: "-0.5px",
              }}
            >
              Inspired by History
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 4,
              }}
            >
              {[
                {
                  title: "Warrior Weapons",
                  desc: "Faithful recreations of traditional arms including talwars, bhala, and dand patta swords used by Maharashtra's forces.",
                },
                {
                  title: "Heroic Statues",
                  desc: "Handcrafted sculptures capturing the dynamic poses and iconic armor of our legendary warriors.",
                },
                {
                  title: "Fort Decor",
                  desc: "Art pieces inspired by the architectural elements of Maharashtra's historic hill forts.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardFade}
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    p: 4,
                    border: "1px solid #e0e0e0",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                      borderColor: "#8C391B",
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      mb: 2,
                      color: "#000000",
                      textAlign: "center",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333333",
                      lineHeight: 1.7,
                      textAlign: "center",
                    }}
                  >
                    {item.desc}
                  </Typography>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Legacy Section */}
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            py: 6,
            px: { xs: 3, md: 6 },
            backgroundColor: "#8C391B",
            borderRadius: "8px",
            color: "#ffffff",
            overflow: "hidden",
            backgroundImage: `
      url('/weapons/weapon2.png'),
      url('/weapons/weapon3.png')
    `,
            backgroundRepeat: "no-repeat",
            backgroundPosition: {
              xs: "top left, center right, bottom left",
              md: "top 20px left 40px, center right 80px, bottom 20px left 60px",
            },
            backgroundSize: {
              xs: "80px, 100px, 80px",
              md: "100px, 120px, 100px",
            },
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardFade}
            sx={{ maxWidth: "800px", mx: "auto" }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                fontWeight: "bold",
                mb: 4,
                letterSpacing: "-0.5px",
              }}
            >
              Carrying Forward the Warrior Ethos
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              These creations are more than artifacts — they embody the courage,
              strategy, and resilience that defined a golden era in our warrior
              legacy, inspiring future generations to remember and honor this
              enduring heritage.
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default FullAbout;
