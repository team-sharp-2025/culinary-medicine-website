import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// import Button from '../UI/Button';

const HeroSection: React.FC = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textContentRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .fromTo(textContentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(imageRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.8");

    gsap.to('.bg-teal-200', {
      y: -100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={heroRef} className="relative pt-20 md:pt-24 bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div 
            ref={textContentRef}
            className="md:w-1/2 text-center md:text-left md:pr-8 mb-8 md:mb-0"
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Food as Medicine: <span className="text-teal-600">Healing</span> Through Nutrition
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Discover the transformative power of culinary medicine – where evidence-based nutrition meets the joy of cooking to create a path to vibrant health.
            </p>
            {/* <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button variant="primary" size="lg">Book Consultation</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div> */}
          </div>
          
          {/* Image */}
          <div 
            ref={imageRef}
            className="md:w-1/2"
          >
            <div className="relative rounded-full overflow-hidden bg-teal-100 p-3 mx-auto" style={{ maxWidth: '400px' }}>
              <img 
                src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Doctor in kitchen" 
                className="w-full h-auto rounded-full object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="hidden md:block absolute -top-12 -right-12 w-40 h-40 bg-teal-200 rounded-full opacity-20"></div>
      
    </div>
  );
};

export default HeroSection;