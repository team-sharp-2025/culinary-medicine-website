'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/Home/HeroSection';
import AboutSection from '@/components/Home/AboutSection';
import ContactForm from '@/components/Home/ContactForm';
import { BookOpen, UserCheck, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    document.title = 'Culinary Medicine - Food as Medicine';

    // Animation for Features Section
    if (featuresRef.current) {
      gsap.fromTo(
        '.feature-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Animation for Testimonials Section
    if (testimonialsRef.current) {
      gsap.fromTo(
        '.testimonial-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.3,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <AboutSection />
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-gray-800 font-bold mb-16">
            Our Approach to Culinary Medicine
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-6 mx-auto">
                <BookOpen size={32} />
              </div>
              <h3 className="font-serif text-2xl text-gray-800 font-bold mb-3 text-center">
                Evidence-Based
              </h3>
              <p className="text-gray-600 text-center">
                Our recommendations are grounded in rigorous scientific research and clinical experience.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-6 mx-auto">
                <UserCheck size={32} />
              </div>
              <h3 className="font-serif text-2xl text-gray-800 font-bold mb-3 text-center">
                Personalized Care
              </h3>
              <p className="text-gray-600 text-center">
                We recognize that each patient is unique, with different needs, preferences, and health goals.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-6 mx-auto">
                <Award size={32} />
              </div>
              <h3 className="font-serif text-2xl text-gray-800 font-bold mb-3 text-center">
                Practical Skills
              </h3>
              <p className="text-gray-600 text-center">
                We teach practical cooking techniques that make healthy eating enjoyable and sustainable.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-gray-800 font-bold mb-16">
            Patient Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="testimonial-card bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  GS
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Gokul S.</h4>
                  <p className="text-sm text-gray-500">Type 2 Diabetes</p>
                </div>
              </div>
              <p className="text-gray-600 italic text-lg">
                "After just 3 months of following Dr. Sunitha's culinary medicine program, my A1C dropped from 8.2 to 6.4, and I've reduced my medication. The recipes are delicious and easy to make!"
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="testimonial-card bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  HM
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Harish M.</h4>
                  <p className="text-sm text-gray-500">Autoimmune Condition</p>
                </div>
              </div>
              <p className="text-gray-600 italic text-lg">
                "I've struggled with inflammation for years. Dr. Sunitha helped me identify my trigger foods and create a sustainable eating plan. My symptoms have improved significantly, and I finally feel in control."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm />
    </div>
  );
};

export default HomePage;