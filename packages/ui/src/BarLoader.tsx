import React from "react";

interface BarLoaderProps {
  className?: string;
}

const BarLoader: React.FC<BarLoaderProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex justify-center items-center space-x-1 h-20 ${className}`}
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 h-6 bg-teal-600 rounded-sm animate-bar-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
};

export default BarLoader;
