"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import BlogCard from "@/components/Blog/BlogCard";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const SlickArrow = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`absolute top-1/2 transform -translate-y-1/2 z-50 bg-white rounded-full shadow p-1 hover:scale-105 transition-all flex items-center justify-center border-none outline-none appearance-none ${className}`}
    style={{ width: "40px", height: "40px" }}
  >
    {children}
  </button>
);

const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/blogs/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page, size: 10, searchTerm: "" }),
        });

        const data = await res.json();
        if (data.success) {
          setBlogs(data.response.blogs);
        } else {
          setError("Failed to load blogs");
        }
      } catch (err) {
        setError("An error occurred while fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: blogs.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow className="right-0 md:-right-6">
        <ChevronRight size={32} className="text-gray-600 hover:text-black" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow className="left-0 md:-left-6">
        <ChevronLeft size={32} className="text-gray-600 hover:text-black" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  return (
    <section className="py-20 bg-gradient-to-br from-teal-200 to-blue-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-gray-800 font-bold mb-16">
          MY BLOG
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs available.</p>
        ) : (
          <>
            <div className="relative">
              <Slider {...settings}>
                {blogs.map((blog) => (
                  <div key={blog.id} className="px-2">
                    <BlogCard
                      id={blog.id}
                      title={blog.title}
                      createdAt={blog.createdAt}
                      imageUrl={blog.imageUrl}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="text-center mt-8">
              <Link href="/blog">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                  View More Blogs
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
