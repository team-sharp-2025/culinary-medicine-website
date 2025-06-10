import React, { useEffect, useRef } from 'react';
import { Award, HeartPulse, Utensils } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      imageRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      textRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image and quote */}
          <div 
            ref={imageRef}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Dr. Sarah Johnson" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                <blockquote className="italic text-gray-700 text-sm">
                  "Let food be thy medicine and medicine be thy food."
                </blockquote>
                <p className="text-right text-teal-600 mt-2 font-medium">- Hippocrates</p>
              </div>
            </div>
          </div>
          
          {/* Text content */}
          <div 
            ref={textRef}
            className="md:w-1/2"
          >
            <h2 className="font-serif text-3xl text-gray-800 font-bold mb-2">
              SUNITHA BALASUBRAMANIAM
            </h2>
            <p className="text-teal-600 text-lg font-medium mb-4">
              CULINARY MEDICINE SPECIALIST
            </p>
            <blockquote className="mt-6 mb-8 border-l-4 border-teal-500 pl-4 italic">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hippocrates, the father of modern medicine, described the body's ability to heal itself as 
                <em className="text-teal-700"> Veriditas</em> (green life force). By recognizing how our body responds to different foods and 
                removing those that hinder healing, we allow <em className="text-teal-700">Veriditas</em> to restore balance and well-being.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are bio-individuals, each processing food in unique ways. While many dietary approaches may be practical, we must listen to our body's signals to determine what works best.
              </p>
              <footer className="text-right text-teal-600 mt-4 text-sm">
                - Dr. Sunitha Balasubramaniam
              </footer>
            </blockquote>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-teal-50 p-4 rounded-lg text-center">
                <HeartPulse size={28} className="mx-auto mb-2 text-teal-600" />
                <h3 className="font-medium text-gray-800">Board Certified</h3>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg text-center">
                <Utensils size={28} className="mx-auto mb-2 text-teal-600" />
                <h3 className="font-medium text-gray-800">Culinary Trained</h3>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg text-center">
                <Award size={28} className="mx-auto mb-2 text-teal-600" />
                <h3 className="font-medium text-gray-800">Research Published</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;