import React, { useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Eye } from 'lucide-react';
import { Reel } from '../../data/reelsData';

interface ReelPlayerProps {
  reel: Reel | null;
  onClose: () => void;
}

const ReelPlayer: React.FC<ReelPlayerProps> = ({ reel, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  
  if (!reel) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div 
        ref={modalRef}
        className="relative bg-black rounded-lg overflow-hidden max-w-lg w-full h-[80vh] md:h-[90vh]"
      >
        <button 
          className="absolute top-4 right-4 z-10 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <button
          className="absolute top-4 left-4 z-10 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            src={reel.videoUrl}
            className="w-full h-full object-contain"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            controls={false}
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-white font-medium text-lg mb-2">{reel.title}</h3>
            <div className="flex items-center text-gray-300 text-sm">
              <Eye size={14} className="mr-1" />
              <span>{reel.views.toLocaleString()} views</span>
              <span className="mx-2">•</span>
              <span>{reel.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelPlayer;