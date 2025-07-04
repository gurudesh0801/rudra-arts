import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import { Typography, Avatar, Box } from "@mui/material";
import weaponsBg from "../../assets/images/Weponsbg.jpg";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";
import { Link } from "react-router-dom";

const cardFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/all`
      );
      const data = await res.json();
      setBlogs(data.reverse());
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const getExcerpt = (text, charLimit = 150) => {
    if (text.length <= charLimit) return text;
    return text.substring(0, charLimit).trim() + "...";
  };

  const filteredBlogs = blogs
    .filter((blog) => !blog.isHidden) // <-- exclude hidden blogs
    .filter((blog) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        blog.title.toLowerCase().includes(searchLower) ||
        blog.content.toLowerCase().includes(searchLower) ||
        (blog.author && blog.author.toLowerCase().includes(searchLower))
      );
    });

  return (
    <Box
      sx={{
        position: "relative",
        py: 8,
        overflow: "hidden",
      }}
    >
      {/* Background with overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${weaponsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 20,
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 3, md: 4 },
        }}
      >
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.2rem", md: "3rem" },
                fontWeight: "bold",
                mb: 3,
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
              className="font-montserrat pt-14"
            >
              <AnimatedUnderline>The Cultural Roots Blog</AnimatedUnderline>
            </Typography>
            <Typography
              sx={{
                maxWidth: "800px",
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "#333333",
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Discover the world of traditional craftsmanship and stories behind
              each masterpiece.
            </Typography>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              sx={{
                maxWidth: "800px",
                mx: "auto",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: "0 0 0 0",
                  display: "flex",
                  alignItems: "center",
                  pl: 3,
                  pointerEvents: "none",
                }}
              >
                <FiSearch style={{ color: "#8C391B" }} />
              </Box>
              <input
                type="text"
                placeholder="Search blogs by title, content or author..."
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 40px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(4px)",
                  outline: "none",
                  transition: "all 0.3s",
                  boxShadow: isSearchFocused ? "0 0 0 2px #8C391B" : "none",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FiX style={{ color: "#8C391B" }} />
                </button>
              )}
            </motion.div>
          </motion.div>
        </Box>

        {/* Category Tags */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardFade}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          {[
            "All",
            "Craftsmanship",
            "Techniques",
            "Artisans",
            "Materials",
            "History",
          ].map((tag) => (
            <button
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "all 0.3s",
                backgroundColor:
                  searchTerm === tag ? "#8C391B" : "rgba(0,0,0,0.05)",
                color: searchTerm === tag ? "#fff" : "#333",
                border: "none",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  backgroundColor:
                    searchTerm === tag ? "#8C391B" : "rgba(0,0,0,0.1)",
                },
              }}
              onClick={() => setSearchTerm(tag === "All" ? "" : tag)}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              },
              gap: "32px",
            }}
          >
            {filteredBlogs.map((blog, i) => (
              <Link
                to={`/blogs/${blog._id}`}
                style={{ textDecoration: "none" }}
              >
                <motion.div
                  key={blog._id}
                  variants={cardFade}
                  viewport={{ once: true }}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -5 }}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    transition: "all 0.3s",
                    cursor: "pointer",
                    border: "1px solid rgba(0,0,0,0.1)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <motion.div
                    key={blog._id}
                    variants={cardFade}
                    viewport={{ once: true }}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    whileHover={{ y: -5 }}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.8)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                      transition: "all 0.3s",
                      cursor: "pointer",
                      border: "1px solid rgba(0,0,0,0.1)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={() => openBlogDetail(blog)}
                  >
                    {/* Image */}
                    {blog.image && (
                      <Box
                        sx={{
                          width: "100%",
                          backgroundColor: "#fff",
                          p: 3,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={blog.image}
                          alt={blog.title}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            maxHeight: "256px",
                          }}
                        />
                      </Box>
                    )}

                    {/* Content */}
                    <Box
                      sx={{
                        p: 4,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          mb: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            px: "8px",
                            py: "4px",
                            backgroundColor: "rgba(140, 57, 27, 0.1)",
                            color: "#8C391B",
                            borderRadius: "4px",
                          }}
                        >
                          {blog.category || "General"}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: "#666",
                          }}
                        >
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          mb: 2,
                          color: "#333",
                          lineHeight: 1.4,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#666",
                          mb: 3,
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {getExcerpt(blog.content, 200)}
                      </Typography>

                      <Box
                        sx={{
                          mt: "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              backgroundColor: "#8C391B",
                              color: "#fff",
                              fontSize: "0.875rem",
                              fontWeight: "bold",
                            }}
                          >
                            {blog.author?.[0] || "A"}
                          </Avatar>
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "#333",
                            }}
                          >
                            {blog.author || "Anonymous"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            color: "#8C391B",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                          }}
                        >
                          Read more <FiArrowRight size={14} />
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "8px",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 500,
                color: "#666",
                mb: 2,
              }}
            >
              No blogs found matching your search
            </Typography>
            <button
              onClick={() => setSearchTerm("")}
              style={{
                color: "#8C391B",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Clear search
            </button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Blogs;
