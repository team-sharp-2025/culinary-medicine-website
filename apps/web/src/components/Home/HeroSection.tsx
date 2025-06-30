"use client";

import React, { useRef } from "react";
import doctorImage from "../../../public/sunitha_balasubramaniam_profile_image.jpg";
import bgImage from "../../../public/bg-img.jpg";
import Image from "next/image";
import { Leaf } from "lucide-react";

const HeroSection: React.FC = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textContentRef = useRef(null);

  return (
    <div
      ref={heroRef}
      className="relative pt-20 md:pt-24 bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Left Side Text Content */}
          <div
            ref={textContentRef}
            className="w-full md:w-1/2 text-left md:pr-16 mb-12 md:mb-0 flex flex-col justify-center space-y-8"
          >
            <div className="max-w-2xl space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800">
                <span className="text-teal-600">Culinary</span> Medicine
              </h1>

              {/* Veriditas paragraph */}
              <p className="text-gray-700 text-lg leading-relaxed">
                Hippocrates, the father of modern medicine, described the
                body's ability to heal itself as{" "}
                <span className="font-serif text-teal-800 font-extrabold text-2xl md:text-2xl leading-tight">
                    Veriditas
                </span>{" "}
                (green life force). By recognising how our body responds to
                different foods and removing those that hinder healing, we
                allow{" "}
                <span className="font-serif text-teal-800 font-extrabold text-2xl md:text-2xl leading-tight">
                    Veriditas
                </span>{" "}
                to restore balance and well-being.
              </p>

              {/* Subtle Divider with Icon */}
              <div className="flex items-center justify-center py-6">
                <div className="flex-grow border-t border-teal-600"></div>
                <Leaf size={32} className="text-teal-600 mx-4 flex-shrink-0" />
                <div className="flex-grow border-t border-teal-600"></div>
              </div>
              <div className="pt-4 flex justify-center md:justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-lg font-semibold rounded-full shadow-xl text-white bg-teal-600 hover:bg-teal-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Connect With Us
                  <svg
                    className="ml-3 -mr-1 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side Image and Quote */}
          <div className="w-full md:w-1/2 flex flex-col items-center space-y-6 md:translate-x-12 md:-translate-y-16">
            {/* Doctor Image */}
            <div ref={imageRef} className="w-[300px] md:w-[400px]">
              <div
                className="relative rounded-full overflow-hidden border-[12px] border-teal-600 bg-white p-2 mx-auto shadow-2xl"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={doctorImage.src}
                  alt="Sunitha Balasubramaniam"
                  className="absolute top-0 left-0 w-[120%] h-[120%] object-cover object-[center_40%]"
                />
              </div>
            </div>

            {/* Enhanced Quote Tile */}
            <div className="relative w-full max-w-sm bg-teal-50 border border-teal-700 shadow-md rounded-lg px-4 py-4 text-gray-800">
              {/* Decorative Quote Marks */}
              <div className="absolute -top-4 -left-4 text-teal-700 text-5xl font-serif select-none">
                “
              </div>
              <div className="absolute -bottom-4 -right-4 text-teal-700 text-5xl font-serif select-none">
                ”
              </div>

              {/* Quote */}
              <p className= "text-[15px] leading-relaxed font-medium z-10 relative">
                We are bio-individuals, each processing food in unique ways.
                While many dietary approaches may be practical, we must listen
                to our body's signals to determine what works best.
              </p>

              {/* Doctor Info */}
              <div className="mt-4 border-t border-teal-200 pt-3 text-left">
                <p className="text-xl md:text-xl font-semibold text-gray-900">
                  Mrs. Sunitha Balasubramaniam,
                </p>
                <p className="text-s md:text-sm text-gray-600 mt-1 tracking-wide">
                  Culinary Medicine Specialist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Circle */}
      <div className="hidden md:block absolute -top-12 -right-12 w-40 h-40 bg-teal-200 rounded-full opacity-20 z-0" />
    </div>
  );
};

export default HeroSection;