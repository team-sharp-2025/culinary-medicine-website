"use client";

import React, { useEffect, useState, useRef } from "react";
import BlogCard from "../../../components/Blog/BlogCard";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../../../lib/supabaseClient";

interface Blog {
  id: number;
  title: string;
  createdAt: string;
  imageUrl: string | null;
}

const AdminBlogPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

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
      const blogData = await getBlogData(id);
      if (!blogData || !blogData.response.imageUrl) {
        toast.error("Couldn't find blog image to delete.");
      } else {
        const filePath = getFilePath(blogData);
        const { error: deleteError } = await supabase.storage
          .from("blog-images")
          .remove([filePath]);

        if (deleteError) {
          console.error("Image delete error:", deleteError);
          toast.error("Failed to delete blog image.");
          return;
        }
      }
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Blog deleted successfully");
        setPage(1);
        fetchBlogs(1);
      } else {
        alert("Failed to delete the blog");
        toast.error("Failed to delete the blog");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting.");
    }
  };

  const getBlogData = async (id: number) => {
    const blogRes = await fetch(`/api/blogs/${id}`, { method: "GET" });
    const blogData = await blogRes.json();
    return blogData;
  };

  const getFilePath = (blogData: any) => {
    const imageUrl: string = blogData.response.imageUrl;
    const publicPrefix =
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}` +
      `/storage/v1/object/public/blog-images/`;
    const filePath = imageUrl.replace(publicPrefix, "");
    return filePath;
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">📚 All Blogs</h1>

      <div className="flex justify-end mb-4">
        <a
          href="/blog/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create New Blog
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            createdAt={blog.createdAt}
            imageUrl={blog.imageUrl}
            onEdit={() => router.push(`/blog/edit/${blog.id}`)}
            onDelete={() => deleteBlog(blog.id)}
          />
        ))}
      </div>

      {!hasMore && !loading && (
        <div className="text-center py-6 text-gray-500">
          You have reached the end.
        </div>
      )}
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
