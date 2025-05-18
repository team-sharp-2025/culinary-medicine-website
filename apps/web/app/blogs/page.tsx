// apps/web/app/blogs/page.tsx

import React from "react";
import { fetchBlogs } from "@/app/services/blogService";
import BlogCard from "@/app/components/BlogCard";
import { Blog } from '@/app/types/Blog'; 

const BlogsPage = async () => {
  const blogs = await fetchBlogs(); // Fetch data from the service

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Doctor's Blog Listing</h1>
      <div className="grid gap-4">
        {blogs.map((blog: Blog) => (
          <BlogCard key={blog.id} title={blog.title} summary={blog.summary} />
        ))}
      </div>
    </main>
  );
};

export default BlogsPage;
