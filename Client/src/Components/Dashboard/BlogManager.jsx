import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";

const BlogManager = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  //   const [editingId, setEditingId] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [activeTab, setActiveTab] = useState("visible");

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
    author: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/all`
    );
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      content: blog.content,
      image: null,
      author: blog.author,
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this blog?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/delete/${id}`,
        { method: "DELETE" }
      );
      fetchBlogs();
      Swal.fire("Deleted!", "Blog has been deleted.", "success");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }
    await fetch(
      `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/update/${
        editingBlog._id
      }`,
      {
        method: "PUT",
        body: formData,
      }
    );

    setEditingId(null);
    setForm({ title: "", content: "", image: null, author: "" });
    fetchBlogs();
    setLoading(false);

    Swal.fire({
      icon: "success",
      title: "Blog updated successfully",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleToggleHide = async (id) => {
    await fetch(
      `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/hide-toggle/${id}`,
      { method: "PUT" }
    );
    fetchBlogs(); // Refresh data
  };

  return (
    <DashboardLayout>
      <div className="flex gap-3 mb-6 px-4">
        <button
          onClick={() => setActiveTab("visible")}
          className={`px-4 py-2 rounded ${
            activeTab === "visible" ? "bg-indigo-600 text-white" : "bg-gray-100"
          }`}
        >
          Visible Blogs
        </button>
        <button
          onClick={() => setActiveTab("hidden")}
          className={`px-4 py-2 rounded ${
            activeTab === "hidden" ? "bg-indigo-600 text-white" : "bg-gray-100"
          }`}
        >
          Hidden Blogs
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex items-center justify-between px-4 mb-6">
          <h2 className="text-3xl font-semibold">Manage Blogs</h2>
          <button
            onClick={() => navigate("/admin/blog")}
            className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            ADD BLOGS
          </button>
        </div>
        <ul className="space-y-4 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 px-4">
            {blogs
              .filter((b) =>
                activeTab === "visible" ? !b.isHidden : b.isHidden
              )
              .map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
                >
                  {/* Blog Image */}
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  {/* Blog Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {blog.content}
                    </p>
                    <p className="text-xs mt-auto text-gray-500 font-medium pt-3">
                      By {blog.author}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-4 pt-0 mt-auto flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                    <button
                      onClick={() => handleToggleHide(blog._id)}
                      className="text-yellow-500 hover:text-yellow-700"
                      title={blog.isHidden ? "Unhide" : "Hide"}
                    >
                      {blog.isHidden ? (
                        <FiEye size={18} />
                      ) : (
                        <FiEyeOff size={18} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </ul>

        {editingBlog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl relative shadow-lg">
              <button
                className="absolute top-3 right-4 text-xl text-gray-500 hover:text-gray-700"
                onClick={() => setEditingBlog(null)}
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-4">Edit Blog</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                  placeholder="Title"
                />
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={10}
                  className="w-full p-2 border rounded"
                  placeholder="Content"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Author"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BlogManager;
