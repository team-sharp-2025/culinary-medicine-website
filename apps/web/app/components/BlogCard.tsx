// apps/web/app/components/BlogCard.tsx

import React from "react";
import { Blog } from "@/app/types/Blog";

const BlogCard: React.FC<Blog> = ({ title, summary }) => {
  return (
    <div className="border p-4 rounded-md shadow-md mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{summary}</p>
    </div>
  );
};

export default BlogCard;
