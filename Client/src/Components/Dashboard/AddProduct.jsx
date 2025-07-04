"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import DashboardLayout from "./DashboardLayout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ onProductAdded }) => {
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pname: "",
    pid: "",
    pprice: "",
    pimages: [],
    pdescription: "",
    psize: "",
    pcategory: "",
  });

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedFiles = [...form.pimages];
    updatedFiles[index] = file;

    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = URL.createObjectURL(file);

    setForm((prev) => ({ ...prev, pimages: updatedFiles }));
    setImagePreviews(updatedPreviews);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "pimages") {
      setForm((prev) => ({
        ...prev,
        pimages: Array.from(files),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("pname", form.pname);
      formData.append("pid", form.pid);
      formData.append("pprice", form.pprice);
      formData.append("pdescription", form.pdescription);
      formData.append("psize", form.psize);
      formData.append("pcategory", form.pcategory);
      formData.append("pdiscount", form.pdiscount || "0");

      form.pimages.forEach((file) => {
        formData.append("pimages", file);
      });

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products/add`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to add product");

      // ✅ Show custom success message
      toast.success("Product added successfully!");

      // ✅ Reset form
      setForm({
        pname: "",
        pid: "",
        pprice: "",
        pimages: [],
        pdescription: "",
        psize: "",
        pcategory: "",
        pdiscount: "",
      });

      // ✅ Reset image previews
      setImagePreviews([null, null, null, null]);

      if (onProductAdded) onProductAdded();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <section className="py-2 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-outfit font-bold text-gray-800 font-[Playfair]">
            Add Product
          </h2>
          <button
            onClick={() => navigate("/admin/products")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-300 text-white rounded-lg transition"
          >
            Back to Products
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="pname"
                  value={form.pname}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Product ID
                </label>
                <input
                  type="text"
                  name="pid"
                  value={form.pid}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="pprice"
                  value={form.pprice}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Size
                </label>
                <input
                  type="text"
                  name="psize"
                  value={form.psize}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Category
              </label>
              <select
                name="pcategory"
                value={form.pcategory}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select a Category</option>
                <option value="Mavale & Warrior Statues">
                  Mavale & Warrior Statues
                </option>
                <option value="Maharaj Idol Series">Maharaj Idol Series</option>
                <option value="Miniature Weapon Sets & Figurines">
                  Miniature Weapon Sets & Figurines
                </option>
                <option value="Car Dashboard & Desk Decor">
                  Car Dashboard & Desk Decor
                </option>
                <option value="Signature Frames">Signature Frames</option>
                <option value="Shilekhana (Weapon Vault) Series">
                  Shilekhana (Weapon Vault) Series
                </option>
                <option value="Symbolic & Cultural Artefacts">
                  Symbolic & Cultural Artefacts
                </option>
                <option value="Sanch (Royal Court Replicas)">
                  Sanch (Royal Court Replicas)
                </option>
                <option value="Historical Warriors">Historical Warriors</option>
                <option value="Badges & Collectibles">
                  Badges & Collectibles
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Upload up to 4 Images
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <label
                    key={index}
                    className="relative border-2 border-dashed rounded-lg h-32 flex items-center justify-center bg-gray-50 cursor-pointer overflow-hidden group"
                  >
                    {imagePreviews[index] ? (
                      <img
                        src={imagePreviews[index]}
                        alt={`preview-${index}`}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Click to Upload
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Discount (%)
              </label>
              <input
                type="number"
                name="pdiscount"
                value={form.pdiscount || ""}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Description
              </label>
              <textarea
                name="pdescription"
                value={form.pdescription}
                onChange={handleChange}
                rows={3}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-customBrown text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition flex items-center justify-center gap-2"
              >
                {loading && <FaSpinner className="animate-spin" />}
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </DashboardLayout>
  );
};

export default AddProduct;
