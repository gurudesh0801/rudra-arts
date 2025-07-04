import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { Typography, Avatar, Box, Button } from "@mui/material";
import weaponsBg from "../../assets/images/Weponsbg.jpg";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/${id}`
        );
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Box
      sx={{
        position: "relative",
        py: 10,
        pt: 14,
        overflow: "hidden",
        minHeight: "100vh",
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
        <Button
          startIcon={<FiArrowLeft />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            color: "#8C391B",
            fontWeight: 500,
          }}
        >
          Back to Blogs
        </Button>

        <Box
          sx={{
            p: 6,
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "12px",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                px: "12px",
                py: "4px",
                backgroundColor: "rgba(140, 57, 27, 0.1)",
                color: "#8C391B",
                borderRadius: "999px",
                display: "inline-block",
              }}
            >
              {blog.category || "General"}
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              fontWeight: "bold",
              mb: 4,
              color: "#333",
            }}
          >
            {blog.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              mb: 6,
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "#8C391B",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {blog.author?.[0] || "A"}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                {blog.author || "Anonymous"}
              </Typography>
              <Typography sx={{ color: "#666", fontSize: "0.875rem" }}>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </Box>

          {blog.image && (
            <Box
              sx={{
                width: "100%",
                mb: 6,
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
              }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  maxHeight: "400px",
                }}
              />
            </Box>
          )}

          <Box sx={{ maxWidth: "100%", overflowWrap: "break-word" }}>
            {blog.content.split("\n").map((paragraph, i) => (
              <Typography
                key={i}
                sx={{
                  mb: 3,
                  color: "#333",
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogDetail;
