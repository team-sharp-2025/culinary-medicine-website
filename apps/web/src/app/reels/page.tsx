"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { BarLoader } from "@repo/ui";
interface Reel {
  id: number;
  title: string;
  link: string;
}

const ReelsPage: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastReelRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedRef = useRef(false); // 👈 Fix for double API call

  const fetchReels = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch("/api/reels/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, size: 6, searchTerm: "" }),
      });

      const data = await response.json();
      if (data.success && data.response.reels.length > 0) {
        setReels((prev) => [...prev, ...data.response.reels]);
        setHasMore(data.response.reels.length === 6);
        setTimeout(() => {
          if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        }, 500);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching reels:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🛠 useEffect wrapped with hasFetchedRef
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    document.title = "Reels | Culinary Medicine";
    window.scrollTo(0, 0);
    fetchReels(page);
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastReelRef.current) {
      observer.current.observe(lastReelRef.current);
    }
  }, [loading, hasMore]);

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
            Reel Highlights
          </motion.h1>
          <motion.p
            className="text-teal-50 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore bite-sized wellness moments, culinary techniques, and
            food-as-medicine reels curated by our experts.
          </motion.p>
        </div>
      </div>

      {/* Reels Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              ref={index === reels.length - 1 ? lastReelRef : null}
              className="bg-white shadow-md rounded-xl p-2"
            >
              <blockquote
                className="instagram-media w-full"
                data-instgrm-permalink={reel.link}
                data-instgrm-version="14"
                style={{ width: "100%" }}
              ></blockquote>
            </div>
          ))}
        </div>

        {loading && <BarLoader />}
        {!hasMore && !loading && reels.length > 0 && (
          <div className="text-center py-6 text-gray-500">
            You have reached the end.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelsPage;
