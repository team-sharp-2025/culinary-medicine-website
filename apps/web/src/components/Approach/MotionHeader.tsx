'use client';

import { motion } from 'framer-motion';

export function MotionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="container mx-auto px-4 text-center">
      <motion.h1
        className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-teal-50 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}