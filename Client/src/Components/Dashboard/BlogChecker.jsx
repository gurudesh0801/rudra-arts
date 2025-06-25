import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import AlertBox from "../AlertBox/AlertBox"; // ✅ Import

const BlogChecker = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [alert, setAlert] = useState(null); // ✅ Alert state

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const queryParam =
          filter === "All" ? "" : `?status=${filter.toLowerCase()}`;
        const res = await fetch(
          `${
            import.meta.env.VITE_BASE_URL_PRODUCTION
          }/api/blogs/all${queryParam}`
        );
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [filter]);

  const handleUpdateStatus = async (id, status) => {
    const route =
      status === "approved" ? "approve" : status === "rejected" ? "reject" : "";
    if (!route) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL_PRODUCTION}/api/blogs/${route}/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      const updatedBlogs = blogs.map((blog) =>
        blog._id === id ? { ...blog, status } : blog
      );
      setBlogs(updatedBlogs);

      // ✅ Show success alert
      setAlert({
        type: "success",
        message:
          status === "approved"
            ? "✅ Blog approved successfully!"
            : "❌ Blog rejected successfully!",
      });

      // ✅ Auto-dismiss after 3s
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error("Error updating blog status:", err);
      setAlert({ type: "error", message: "Error updating blog status" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 relative">
        {/* ✅ Alert */}
        {alert && (
          <AlertBox
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📝 Blog Approval Dashboard</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border p-4 rounded-lg shadow-md bg-white"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h2 className="text-lg font-bold mb-1">{blog.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Author:</strong> {blog.author || "Unknown"}
                </p>
                <p className="text-sm text-gray-700 line-clamp-3 mb-2">
                  {blog.content}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`uppercase font-semibold ${
                      blog.status === "pending"
                        ? "text-yellow-500"
                        : blog.status === "approved"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {blog.status}
                  </span>
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleUpdateStatus(blog._id, "approved")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(blog._id, "rejected")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BlogChecker;
