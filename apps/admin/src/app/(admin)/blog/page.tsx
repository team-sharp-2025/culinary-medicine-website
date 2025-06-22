"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "../../../components/Blog/BlogCard";


interface Blog {
  id: number;
  title: string;
  createdAt: string;
  imageUrl: string | null;
}

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, size: 6, searchTerm: "" }),
      });

      const data = await res.json();
      if (data.success && data.response.blogs.length > 0) {
        setBlogs((prev) => [...prev, ...data.response.blogs]);
        setHasMore(data.response.blogs.length === 6);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/blogs/delete?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Failed to delete the blog");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting blog");
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">📚 All Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            createdAt={blog.createdAt}
            imageUrl={blog.imageUrl}
            onDelete={() => deleteBlog(blog.id)}
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