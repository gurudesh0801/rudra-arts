import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DashboardLayout from "./DashboardLayout";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null); // For editing product
  const [editFormData, setEditFormData] = useState({
    pname: "",
    pprice: "",
    psize: "",
    pcategory: "",
    pimage: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products`
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditFormData({
      pname: product.product_name,
      pprice: product.product_price,
      psize: product.product_size,
      pcategory: product.product_category,
      pimage: product.product_image,
    });
  };

  console.log(editFormData);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products/${
          editProduct._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      setEditProduct(null); // Close modal
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const handleEditCancel = () => {
    setEditProduct(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rudra-arts"); // replace
    formData.append("cloud_name", "dxpf6dhn1"); // optional if preset config handles this

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxpf6dhn1/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setEditFormData((prev) => ({
        ...prev,
        pimage: data.secure_url,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <DashboardLayout>
      <Box p={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          className="text-3xl font-outfit"
        >
          All Products
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No products found.
          </Typography>
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price (₹)</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={product.product_image}
                        alt={product.product_name}
                        sx={{ width: 60, height: 60 }}
                      />
                    </TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>₹{product.product_price}</TableCell>
                    <TableCell>{product.product_size}</TableCell>
                    <TableCell>{product.product_category}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(product)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Edit Product Modal */}
        <Dialog
          open={Boolean(editProduct)}
          onClose={handleEditCancel}
          PaperProps={{
            sx: { width: "50%", maxWidth: "none", borderRadius: "12px" },
          }}
        >
          <DialogTitle>Edit Product</DialogTitle>

          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Product Name"
              name="pname"
              value={editFormData.pname}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Product Price"
              name="pprice"
              value={editFormData.pprice}
              onChange={handleEditChange}
              fullWidth
              type="number"
            />
            <TextField
              label="Product Size"
              name="psize"
              value={editFormData.psize}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Product Category"
              name="pcategory"
              value={editFormData.pcategory}
              onChange={handleEditChange}
              fullWidth
            />

            {/* Upload Image Button */}
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {/* Show selected image preview */}
            {editFormData.pimage && (
              <Box mt={2} display="flex" justifyContent="center">
                <Avatar
                  src={editFormData.pimage}
                  alt="Product Preview"
                  sx={{ width: 100, height: 100 }}
                  variant="rounded"
                />
              </Box>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleEditCancel}>Cancel</Button>
            <Button variant="contained" onClick={handleEditSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default ProductManager;
