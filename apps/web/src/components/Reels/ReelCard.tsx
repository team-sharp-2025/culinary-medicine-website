import React from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Clock } from 'lucide-react';
import { Reel } from '../../data/reelsData';

interface ReelCardProps {
  reel: Reel;
  index: number;
  onClick: (id: number) => void;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, index, onClick }) => {
  return (
    <motion.div
      className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(reel.id)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={reel.thumbnailUrl} 
          alt={reel.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Duration badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center">
          <Clock size={14} className="mr-1" />
          {reel.duration}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play size={24} className="text-teal-600 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-lg line-clamp-2 mb-2">{reel.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{reel.views.toLocaleString()} views</span>
          </div>
          <span>{reel.date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ReelCard;