"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReelCard from "@/components/Reels/ReelCard";
import ReelPlayer from "@/components/Reels/ReelPlayer";
import { reelsData, Reel } from "@/data/reelsData";

const ReelsPage: React.FC = () => {
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

  useEffect(() => {
    document.title = "Reels | Culinary Medicine";
    window.scrollTo(0, 0);
  }, []);

  const handleReelClick = (id: number) => {
    const reel = reelsData.find((r) => r.id === id) || null;
    setSelectedReel(reel);
  };

  const closeReel = () => {
    setSelectedReel(null);
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Culinary Medicine Reels
          </motion.h1>
          <motion.p
            className="text-teal-50 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Quick, informative videos on nutrition, healthy cooking, and food as
            medicine.
          </motion.p>
        </div>
      </div>

      {/* Reels grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reelsData.map((reel, index) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={index}
              onClick={handleReelClick}
            />
          ))}
        </div>

        {/* Featured playlists */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">
            Featured Playlists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-medium text-lg text-gray-800 mb-2">
                Anti-inflammatory Foods
              </h3>
              <p className="text-gray-600 mb-2">
                Learn which foods can help reduce inflammation and improve
                overall health.
              </p>
              <span className="text-teal-600 font-medium">6 videos</span>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-medium text-lg text-gray-800 mb-2">
                Cooking for Gut Health
              </h3>
              <p className="text-gray-600 mb-2">
                Discover recipes and techniques to support a healthy microbiome.
              </p>
              <span className="text-teal-600 font-medium">8 videos</span>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-medium text-lg text-gray-800 mb-2">
                Meal Prep Masterclass
              </h3>
              <p className="text-gray-600 mb-2">
                Simple strategies to prepare healthy meals in advance for busy
                weeks.
              </p>
              <span className="text-teal-600 font-medium">5 videos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reel Player Modal */}
      <ReelPlayer reel={selectedReel} onClose={closeReel} />
    </div>
  );
};

export default ReelsPage;
