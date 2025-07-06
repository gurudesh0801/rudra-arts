import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiArrowRight,
  FiCalendar,
  FiUser,
  FiPlus,
} from "react-icons/fi";
import {
  Typography,
  Avatar,
  Box,
  Chip,
  useTheme,
  Skeleton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import weaponsBg from "../../assets/images/Weponsbg.jpg";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
    previewImage: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const theme = useTheme();

  const categories = [
    "All",
    "Craftsmanship",
    "Techniques",
    "Artisans",
    "Materials",
    "History",
    "Culture",
  ];

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/all`
      );
      const data = await res.json();
      setBlogs(data.reverse());
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog({
          ...newBlog,
          image: file,
          previewImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitBlog = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("content", newBlog.content);
      formData.append("author", newBlog.author);
      if (newBlog.image) {
        formData.append("image", newBlog.image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/submit`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit blog");
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setOpenModal(false);
        setNewBlog({
          title: "",
          content: "",
          author: "",
          image: null,
          previewImage: null,
        });
        fetchBlogs(); // Refresh the blog list
      }, 2000);
    } catch (error) {
      console.error("Error submitting blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getExcerpt = (text, charLimit = 150) => {
    if (!text) return "";
    if (text.length <= charLimit) return text;
    return text.substring(0, charLimit).trim() + "...";
  };

  const highlightSearchTerm = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  const filteredBlogs = blogs
    .filter((blog) => !blog.isHidden)
    .filter((blog) => {
      if (selectedCategory !== "All" && blog.category !== selectedCategory) {
        return false;
      }

      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        blog.title.toLowerCase().includes(searchLower) ||
        blog.content.toLowerCase().includes(searchLower) ||
        (blog.author && blog.author.toLowerCase().includes(searchLower)) ||
        (blog.tags &&
          blog.tags.some((tag) => tag.toLowerCase().includes(searchLower)))
      );
    });

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #121212 0%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          background: `url(${weaponsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: theme.palette.mode === "dark" ? 0.05 : 0.1,
          zIndex: 0,
          mixBlendMode: theme.palette.mode === "dark" ? "lighten" : "multiply",
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1400px",
          margin: "0 auto",
          px: { xs: 2, sm: 4, lg: 6 },
          py: 8,
        }}
      >
        {/* Create Blog Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4, pt: 2 }}>
          <Button
            variant="contained"
            startIcon={<FiPlus />}
            onClick={() => setOpenModal(true)}
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(90deg, #E67E51 0%, #F9A875 100%)"
                  : "linear-gradient(90deg, #8C391B 0%, #D45B2B 100%)",
              color: "white",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              },
            }}
          >
            Create Blog
          </Button>
        </Box>

        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                fontWeight: 800,
                mb: 2,
                lineHeight: 1.1,
                letterSpacing: "-1px",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #E67E51 0%, #F9A875 100%)"
                    : "linear-gradient(90deg, #8C391B 0%, #D45B2B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: '"Playfair Display", serif',
              }}
            >
              The Cultural Roots Blog
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(0,0,0,0.8)",
                maxWidth: "800px",
                mx: "auto",
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              Discover the world of traditional craftsmanship and stories behind
              each masterpiece.
            </Typography>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FiSearch
                  style={{
                    color:
                      theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                  }}
                />
              </Box>

              <input
                type="text"
                placeholder="Search blogs by title, content, author or tags..."
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 48px",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  backdropFilter: "blur(8px)",
                  outline: "none",
                  transition: "all 0.3s",
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.1)",
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(0,0,0,0.9)",
                  boxShadow: isSearchFocused
                    ? theme.palette.mode === "dark"
                      ? "0 0 0 2px rgba(230, 126, 81, 0.5)"
                      : "0 0 0 2px rgba(140, 57, 27, 0.5)"
                    : "none",
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
                    color:
                      theme.palette.mode === "dark" ? "#E67E51" : "#8C391B",
                  }}
                >
                  <FiX />
                </button>
              )}
            </motion.div>
          </motion.div>
        </Box>

        {/* Category Filters */}
        <Box
          sx={{
            mb: 6,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: "12px",
                  fontWeight: 600,
                  backgroundColor:
                    selectedCategory === category
                      ? theme.palette.mode === "dark"
                        ? "rgba(230, 126, 81, 0.2)"
                        : "rgba(140, 57, 27, 0.2)"
                      : theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  color:
                    selectedCategory === category
                      ? theme.palette.mode === "dark"
                        ? "#E67E51"
                        : "#8C391B"
                      : theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(0,0,0,0.8)",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.1)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Blog Grid */}
        {isLoading ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Box sx={{ p: 3 }}>
                    <Skeleton width="40%" height={24} />
                    <Skeleton width="60%" height={24} sx={{ mt: 2 }} />
                    <Skeleton width="80%" height={16} sx={{ mt: 1 }} />
                    <Skeleton width="80%" height={16} sx={{ mt: 1 }} />
                    <Skeleton width="60%" height={16} sx={{ mt: 1 }} />
                    <Skeleton width="40%" height={40} sx={{ mt: 2 }} />
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        ) : filteredBlogs.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            <AnimatePresence>
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{
                    y: -8,
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Link
                    to={`/blogs/${blog._id}`}
                    style={{ textDecoration: "none" }}
                    aria-label={`Read more about ${blog.title}`}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(40,40,40,0.8)"
                            : "rgba(255,255,255,0.8)",
                        backdropFilter: "blur(12px)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: theme.shadows[2],
                        border:
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "1px solid rgba(0,0,0,0.05)",
                        transition: "all 0.3s ease-out",
                      }}
                    >
                      {/* Image */}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "200px",
                          overflow: "hidden",
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(30,30,30,0.5)"
                              : "rgba(250,250,250,0.5)",
                        }}
                      >
                        {blog.image ? (
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? "rgba(50,50,50,0.5)"
                                  : "rgba(240,240,240,0.5)",
                            }}
                          >
                            <Typography
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.3)"
                                    : "rgba(0,0,0,0.3)",
                                fontSize: "0.875rem",
                              }}
                            >
                              No Image Available
                            </Typography>
                          </Box>
                        )}

                        {/* Category Badge */}
                        <Chip
                          label={blog.category || "General"}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "rgba(230,126,81,0.9)"
                                : "rgba(140,57,27,0.9)",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.7rem",
                          }}
                        />
                      </Box>

                      {/* Content */}
                      <Box
                        sx={{
                          p: 3,
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Meta Info */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.6)"
                                : "rgba(0,0,0,0.6)",
                            fontSize: "0.8rem",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <FiCalendar size={14} />
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <FiUser size={14} />
                            <span>{blog.author || "Anonymous"}</span>
                          </Box>
                        </Box>

                        {/* Title */}
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            mb: 2,
                            color:
                              theme.palette.mode === "dark"
                                ? "#fff"
                                : "#1a1a1a",
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchTerm(blog.title),
                          }}
                        />

                        {/* Excerpt */}
                        <Typography
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(0,0,0,0.7)",
                            mb: 3,
                            lineHeight: 1.6,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            fontSize: "0.9375rem",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchTerm(
                              getExcerpt(blog.content, 200)
                            ),
                          }}
                        />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1,
                              mb: 3,
                            }}
                          >
                            {blog.tags.slice(0, 3).map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                  backgroundColor:
                                    theme.palette.mode === "dark"
                                      ? "rgba(255,255,255,0.1)"
                                      : "rgba(0,0,0,0.05)",
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "rgba(255,255,255,0.8)"
                                      : "rgba(0,0,0,0.8)",
                                  fontSize: "0.7rem",
                                }}
                              />
                            ))}
                          </Box>
                        )}

                        {/* Read More */}
                        <Box
                          sx={{
                            mt: "auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              color:
                                theme.palette.mode === "dark"
                                  ? "#E67E51"
                                  : "#8C391B",
                              fontSize: "0.875rem",
                              fontWeight: 600,
                            }}
                          >
                            Read more
                            <FiArrowRight size={16} />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  mb: 2,
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(0,0,0,0.8)",
                }}
              >
                No blogs found matching your search
              </Typography>

              <Typography
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(0,0,0,0.6)",
                  mb: 3,
                  maxWidth: "500px",
                  mx: "auto",
                }}
              >
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </Typography>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition"
                style={{
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(0,0,0,0.8)",
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.1)",
                }}
              >
                Reset filters
                <FiArrowRight size={16} />
              </motion.button>
            </Box>
          </motion.div>
        )}
      </Box>

      {/* Create Blog Modal */}
      <Modal
        open={openModal}
        onClose={() => !isSubmitting && setOpenModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Submit New Blog
          </Typography>

          {submitSuccess ? (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                color: "success.main",
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Blog Submitted Successfully!
              </Typography>
              <Typography>
                Your blog has been submitted for admin approval.
              </Typography>
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                label="Title"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Author"
                value={newBlog.author}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, author: e.target.value })
                }
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Content"
                value={newBlog.content}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, content: e.target.value })
                }
                multiline
                rows={6}
                sx={{ mb: 3 }}
              />

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Featured Image
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="blog-image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="blog-image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{ mr: 2 }}
                    disabled={isSubmitting}
                  >
                    Upload Image
                  </Button>
                </label>
                {newBlog.previewImage && (
                  <Box
                    sx={{
                      mt: 2,
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={newBlog.previewImage}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  onClick={() => setOpenModal(false)}
                  disabled={isSubmitting}
                  sx={{ px: 4 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmitBlog}
                  disabled={
                    isSubmitting ||
                    !newBlog.title ||
                    !newBlog.content ||
                    !newBlog.image
                  }
                  sx={{ px: 4 }}
                >
                  {isSubmitting ? "Submitting..." : "Submit for Approval"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Blogs;
