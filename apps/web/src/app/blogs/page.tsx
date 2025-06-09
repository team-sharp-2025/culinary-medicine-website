import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from '@/components/Blog/BlogCard';
import { blogPosts } from '@/data/blogData';

const BlogPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Blog | Culinary Medicine';
    window.scrollTo(0, 0);
  }, []);

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
            Culinary Medicine Blog
          </motion.h1>
          <motion.p 
            className="text-teal-50 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Evidence-based insights, practical tips, and delicious recipes to help you harness the power of food as medicine.
          </motion.p>
        </div>
      </div>
      
      {/* Blog posts grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
        
        {/* Newsletter signup */}
        <motion.div 
          className="mt-16 bg-gray-50 p-8 rounded-lg shadow-md max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4 text-center">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Get the latest articles, recipes, and health tips delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
            />
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;