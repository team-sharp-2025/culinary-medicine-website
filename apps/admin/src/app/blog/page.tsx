"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "../../components/Blog/BlogCard";
import { supabase } from "../../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

interface Blog {
  id: number;
  title: string;
  createdAt: string;
  imageUrl: string | null;
  description?: string;
}

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const resetForm = () => {
    setShowForm(false);
    setTitle("");
    setDescription("");
    setImageFile(null);
    setEditId(null);
  };

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page, size: 6, searchTerm: "" }),
      });
      const data = await res.json();
      if (data.success && data.response.blogs.length > 0) {
        if (page === 1) {
          setBlogs(data.response.blogs);
        } else {
          setBlogs((prev) => [...prev, ...data.response.blogs]);
        }
        setHasMore(data.response.blogs.length === 6);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSubmit = async () => {
    if (!title || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      let imageUrl = "";

      if (imageFile) {
        const fileExt = imageFile.name?.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        const result = supabase.storage.from("blog-images").getPublicUrl(fileName);
        imageUrl = result.data.publicUrl;
      }

      const method = editId ? "PUT" : "POST";
      const url = editId ? `/api/blogs/update/${editId}` : "/api/blogs/create";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageUrl }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(editId ? "Blog updated!" : "Blog created!");
        resetForm();
        setPage(1); // Reset page to refresh data
        fetchBlogs(1);
      } else {
        toast.error("Failed to submit blog.");
      }
    } catch (err) {
      console.error("Blog submit error:", err);
      toast.error("An error occurred.");
    }
  };

  const deleteBlog = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Blog deleted successfully");
        setPage(1); // Refresh from beginning
        fetchBlogs(1);
      } else {
        toast.error("Failed to delete the blog");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while deleting.");
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const res = await fetch(`/api/blogs/${id}`);
      const data = await res.json();
      if (data.success) {
        const blog = data.response;
        setTitle(blog.title);
        setDescription(blog.content || "");
        setEditId(id);
        setShowForm(true);
      } else {
        toast.error("Failed to load blog details");
      }
    } catch (err) {
      console.error("Edit fetch error:", err);
      toast.error("Error fetching blog for edit.");
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">📚 All Blogs</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Blog
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-4">
              {editId ? "✏️ Edit Blog" : "📝 Add New Blog"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded mb-4"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full border px-4 py-2 rounded mb-4"
            />

            <label className="block mb-4">
              <span className="block mb-2 font-medium text-gray-700">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full file:cursor-pointer file:bg-emerald-600 file:text-white file:px-4 file:py-2 file:rounded file:border-none file:hover:bg-emerald-700"
              />
            </label>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleBlogSubmit}
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
              >
                {editId ? "Update" : "Submit"}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            createdAt={blog.createdAt}
            imageUrl={blog.imageUrl}
            onDelete={() => deleteBlog(blog.id)}
            onEdit={() => handleEdit(blog.id)}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;