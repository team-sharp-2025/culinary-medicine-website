"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BarLoader } from "@repo/ui";
import BlogCard from "@/components/Blog/BlogCard";

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBlogRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedRef = useRef(false);

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

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    document.title = "Blogs | Culinary Medicine";
    window.scrollTo(0, 0);
    fetchBlogs(page);
  }, [page]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastBlogRef.current) {
      observer.current.observe(lastBlogRef.current);
    }
  }, [loading, hasMore]);

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Health & Wellness Blogs
          </motion.h1>
          <motion.p
            className="text-orange-50 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Learn how food can be your medicine through research-backed insights
            and lifestyle tips curated by our experts.
          </motion.p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              ref={index === blogs.length - 1 ? lastBlogRef : null}
            >
              <BlogCard
                id={blog.id}
                title={blog.title}
                createdAt={blog.createdAt}
                imageUrl={blog.imageUrl}
              />
            </div>
          ))}
        </div>

        {loading && <BarLoader />}
        {!hasMore && !loading && blogs.length > 0 && (
          <div className="text-center py-6 text-gray-500">
            You have reached the end.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
