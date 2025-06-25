import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";

const AddNews = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    link: "",
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
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/news/add`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to add news");

      setForm({
        title: "",
        description: "",
        image: null,
        link: "",
      });
      setSuccessMsg("✅ News item added successfully.");
    } catch (err) {
      alert("❌ Failed to add news.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl font-outfit mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Add News
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
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
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

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Link <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-customBrown hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            {loading ? "Uploading..." : "Add News"}
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

export default AddNews;
