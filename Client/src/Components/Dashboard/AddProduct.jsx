"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import DashboardLayout from "./DashboardLayout";

const AddProduct = ({ onProductAdded }) => {
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

      form.pimages.forEach((file) => {
        formData.append("pimages", file); // multiple images
      });

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/products/add`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to add product");

      if (onProductAdded) onProductAdded();

      setForm({
        pname: "",
        pid: "",
        pprice: "",
        pimages: [],
        pdescription: "",
        psize: "",
        pcategory: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <section className="py-2 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-4xl font-outfit font-bold mb-6 text-center text-gray-800 font-[Playfair]">
            Add Product
          </h2>
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
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Upload Images
              </label>
              <label className="w-full cursor-pointer flex items-center justify-between border rounded-lg px-4 py-2 bg-white hover:bg-gray-50">
                {form.pimages.length > 0
                  ? `${form.pimages.length} file(s) selected`
                  : "Choose files"}
                <input
                  type="file"
                  name="pimages"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  className="hidden"
                  required
                />
              </label>
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
