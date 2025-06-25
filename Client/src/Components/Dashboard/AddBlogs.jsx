import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";

const AddBlogs = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const formData = new FormData();
      for (const key in form) {
        if (form[key]) formData.append(key, form[key]);
      }

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/add`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to add blog");

      setForm({ title: "", content: "", image: null, author: "" });
      setSuccessMsg("✅ Blog added successfully!");
    } catch (err) {
      alert("❌ Failed to add blog");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl font-outfit mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Add Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Admin or Your Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-customBrown hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            {loading ? "Uploading..." : "Add Blog"}
          </button>

          {successMsg && (
            <p className="text-green-600 text-center font-medium">
              {successMsg}
            </p>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddBlogs;
