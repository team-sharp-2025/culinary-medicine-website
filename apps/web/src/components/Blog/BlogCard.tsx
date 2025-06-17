"use client";

import React from "react";
import Link from "next/link";

interface BlogCardProps {
  id: number;
  title: string;
  createdAt: string;
  imageUrl: string | null;
}

const slugify = (text: string | undefined) =>
  text
    ? text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
    : "untitled";

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  createdAt,
  imageUrl,
}) => {
  const slug = `${slugify(title)}-${id}`;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <Link href={`/blog/${slug}`} passHref>
      <div className="group cursor-pointer bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col h-[320px]">
        {/* Image */}
        {imageUrl && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Date strip */}
        <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-2 font-semibold">
          {formattedDate}
        </div>

        {/* Title */}
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h2>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 text-sm text-teal-600 font-medium group-hover:underline">
          Continue reading...
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
