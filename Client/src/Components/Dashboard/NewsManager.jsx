import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Swal from "sweetalert2";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiX,
  FiUpload,
  FiLink,
  FiEyeOff,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NewsManager = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [hiddenNewsIds, setHiddenNewsIds] = useState([]);
  const [visibleNews, setVisibleNews] = useState([]);
  const [hiddenNews, setHiddenNews] = useState([]);
  const [tab, setTab] = useState("visible");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const [visibleRes, hiddenRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/news/visible`),
        fetch(`${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/news/hidden`),
      ]);

      const visible = await visibleRes.json();
      const hidden = await hiddenRes.json();

      setVisibleNews(visible);
      setHiddenNews(hidden);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleEdit = (news) => {
    setEditingId(news._id);
    setIsCreating(false);
    setForm({
      title: news.title,
      description: news.description,
      image: null,
      link: news.link || "",
    });
    setPreviewImage(news.image);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete News?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await fetch(
          `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/news/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        fetchNews();
        Swal.fire("Deleted!", "News item has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Could not delete news item.", "error");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setPreviewImage(URL.createObjectURL(files[0]));
    }
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const url = editingId
        ? `${
            import.meta.env.VITE_BASE_URL_PRODUCTION
          }/api/news/update/${editingId}`
        : `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/news/add`;

      const method = editingId ? "PUT" : "POST";

      await fetch(url, {
        method,
        body: formData,
      });

      fetchNews();
      resetForm();

      Swal.fire({
        title: editingId ? "Updated!" : "Created!",
        text: `News ${editingId ? "updated" : "added"} successfully.`,
        icon: "success",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleHide = (id) => {
    setHiddenNewsIds((prev) => [...prev, id]);
  };

  const resetForm = () => {
    setEditingId(null);
    setIsCreating(false);
    setForm({ title: "", description: "", image: null, link: "" });
    setPreviewImage(null);
  };

  const handleToggleHide = async (id) => {
    await fetch(
      `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/news/hide-toggle/${id}`,
      { method: "PUT" }
    );
    fetchNews(); // Refresh after toggling
  };

  return (
    <DashboardLayout>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            tab === "visible" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("visible")}
        >
          Visible News
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "hidden" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("hidden")}
        >
          Hidden News
        </button>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manage News</h2>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/news")}
              className="flex items-center gap-2 border bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-md"
            >
              ADD NEWS
            </button>
          </div>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(tab === "visible" ? visibleNews : hiddenNews).map((news) => (
            <div
              key={news._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col justify-between"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {news.description}
                  </p>
                  {news.link && (
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 text-sm mt-2 inline-block"
                    >
                      <FiLink className="inline mr-1" /> Visit Link
                    </a>
                  )}
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  {new Date(news.createdAt).toLocaleDateString()}
                </p>

                {/* Action icons */}
                <div className="mt-4 flex items-end justify-end gap-3">
                  <button
                    onClick={() => handleEdit(news)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(news._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                  <button
                    onClick={() => handleToggleHide(news._id)}
                    className="text-yellow-500 hover:text-yellow-700"
                    title={news.isHide ? "Unhide" : "Hide"}
                  >
                    {news.isHide ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        {(isCreating || editingId) && (
          <div className="bg-white mt-10 p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingId ? "Edit News" : "Add News"}
              </h3>
              <button onClick={resetForm}>
                <FiX size={20} className="text-gray-500 hover:text-black" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full px-4 py-2 border rounded-md"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="Optional Link"
                className="w-full px-4 py-2 border rounded-md"
              />
              <div>
                <label className="block text-sm font-medium mb-1">
                  {previewImage ? "Change Image" : "Upload Image"}
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-24 h-24 mt-2 object-cover rounded-md border"
                  />
                )}
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update News"
                  : "Create News"}
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NewsManager;
