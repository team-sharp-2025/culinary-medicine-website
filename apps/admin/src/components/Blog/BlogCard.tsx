"use client";

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface BlogCardProps {
  id: number;
  title: string;
  createdAt: string;
  imageUrl: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
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
  onEdit,
  onDelete,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col h-full">
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300"
          />
        </div>
      )}

      <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-2 font-semibold">
        {formattedDate}
      </div>

      <div className="p-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      {/* Admin Actions */}
      <div className="flex justify-end gap-4 px-4 pb-4">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
          <FaEdit />
        </button>
        <button onClick={onDelete} className="text-red-600 hover:text-red-800">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;