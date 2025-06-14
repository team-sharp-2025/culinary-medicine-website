'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { approachContentMap } from '@/data/approachContent';

const ApproachSlugPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const content = approachContentMap[slug];

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-600">
        Invalid approach type: "{slug}"
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-white">
      {/* Gradient Header */}
      <div className="relative bg-gradient-to-r from-teal-500 to-blue-500 py-12 md:py-16">
        {/* <a
          href="/"
          className="absolute top-4 left-4 px-4 py-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-md text-sm shadow transition-all"
        >
          Back to Home
        </a> */}

        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.title}
          </motion.h1>
          <motion.p
            className="text-teal-50 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {content.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Description and Images */}
      <div className="max-w-5xl mx-auto text-center px-4 py-10">
        <p className="text-md text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
          {content.description}
        </p>

        <div className="w-36 h-1 bg-emerald-400 mx-auto rounded-full mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Certificates</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {content.images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Approach visual ${idx + 1}`}
              className="w-full h-auto shadow-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApproachSlugPage;
