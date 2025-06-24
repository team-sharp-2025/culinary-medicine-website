"use client";
import ReactMarkdown from 'react-markdown';

import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { BarLoader } from "@repo/ui"; // or your loader component

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

const BlogDetailPage: React.FC = () => {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const id = params?.slug?.toString().split("-").pop();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();

        if (!data.success) {
          setError(true);
        } else {
          setBlog(data.response);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BarLoader />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            {blog.title}
          </h1>
          <p className="text-sm text-lime-100">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <div className="prose prose-lg text-gray-800">
          {/* <ReactMarkdown>{blog.content}</ReactMarkdown> */}
          <div
            className="prose prose-lg text-gray-800 list-disc list-inside"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
