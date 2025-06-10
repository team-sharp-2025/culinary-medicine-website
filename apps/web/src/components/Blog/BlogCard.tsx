import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/data/blogData';

interface BlogCardProps {
  blog: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, index }) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${blog.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 bg-teal-600 text-white px-3 py-1 text-sm font-medium">
            {blog.date}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-serif text-xl font-bold text-gray-800 mb-3 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 mb-3 line-clamp-3">{blog.excerpt}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="inline-block text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors">
              Continue Reading
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;