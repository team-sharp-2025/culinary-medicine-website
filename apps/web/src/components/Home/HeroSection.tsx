import React, { useRef } from "react";
import doctorImage from "../../../public/sunitha_balasubramaniam_profile_image.jpg";

const HeroSection: React.FC = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textContentRef = useRef(null);

  return (
    <div
      ref={heroRef}
      className="relative pt-20 md:pt-24 bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Text Content */}
          <div
            ref={textContentRef}
            className="w-full md:w-1/2 text-center md:text-left md:pr-12 mb-12 md:mb-0 flex flex-col justify-center"
          >
            <div className="max-w-2xl mx-auto md:mx-0 space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800">
                <span className="text-teal-600">Culinary</span> Medicine
              </h1>

              <p className="text-gray-700 text-lg leading-relaxed">
                "Hippocrates, the father of modern medicine, described the
                body's ability to heal itself as{" "}
                <span className="italic text-teal-800">Veriditas</span> (green
                life force). By recognising how our body responds to different
                foods and removing those that hinder healing, we allow{" "}
                <span className="italic text-teal-800">Veriditas</span> to
                restore balance and well-being. We are bio-individuals, each
                processing food in unique ways. While many dietary approaches
                may be practical, we must listen to our body's signals to
                determine what works best."
              </p>

              {/* Doctor Info */}
              <div className="mt-10 flex justify-center md:justify-start">
                <div className="inline-block px-6 py-4 bg-white border-l-4 border-teal-600 shadow-md rounded-md">
                  <p className="text-2xl font-bold text-teal-700">
                    Mrs. Sunitha Balasubramaniam
                  </p>
                  <p className="text-gray-600 text-sm tracking-wider mt-1 uppercase">
                    Culinary Medicine Specialist
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="w-full md:w-1/2">
            <div
              className="relative rounded-full overflow-hidden border-[14px] border-teal-100 p-4 mx-auto shadow-xl"
              style={{ maxWidth: "400px", aspectRatio: "1/1" }} // ensure circular container
            >
              <img
                src={doctorImage.src}
                alt="Sunitha Balasubramaniam"
                className="absolute top-0 left-0 w-[120%] h-[120%] object-cover object-[center_40%]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative element */}
      <div className="hidden md:block absolute -top-12 -right-12 w-40 h-40 bg-teal-200 rounded-full opacity-20"></div>
    </div>
  );
};

export default HeroSection;
