import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import sunithaImage from "../../../public/sunitha_balasubramaniam_profile_pic.jpeg";
// import Button from '../UI/Button';

const HeroSection: React.FC = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textContentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText =
    "Hippocrates, the father of modern medicine, described the body's ability to heal itself as Veriditas(green life force). By recognising how our body responds to different foods and removing those that hinder healing, we allow Veriditas to restore balance and well-being. We are bio-individuals, each processing food in unique ways. While many dietary approaches may be practical, we must listen to our body's signals to determine what works best.";
  const truncatedText =
    "Hippocrates, the father of modern medicine, described the body's ability to heal itself as Veriditas(green life force). By recognising how our body responds to different foods and removing those that hinder healing, we allow Veriditas to restore balance and well-being. We are bio-individuals, each processing food in unique ways";

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .fromTo(
        textContentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.8"
      );

    gsap.to(".bg-teal-200", {
      y: -100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative pt-20 md:pt-24 bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}

          <div
            ref={textContentRef}
            className="md:w-1/2 text-center md:text-center md:pr-8 mb-8 md:mb-0 flex flex-col justify-center"
          >
            <div className="max-w-2xl mx-auto space-y-1">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Food as Medicine: <span className="text-teal-600">Healing</span>{" "}
                Through Nutrition
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                "Hippocrates, the father of modern medicine,
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                described the body's ability to heal itself as
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                <span className="italic text-teal-800">Veriditas</span>
                <span>(green life force).</span>
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                By recognising how our body responds to different foods and
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                removing those that hinder healing, we allow
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                <span className="italic text-teal-800">Veriditas</span> to
                restore balance and well-being.
              </p>

              {isExpanded ? (
                <>
                  <div className="mt-6 ">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      We are bio-individuals, each processing food in
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      unique ways. While many dietary approaches
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      may be practical, we must listen to our body's
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                      signals to determine what works best."
                    </p>
                  </div>

                  <div className="text-center mt-16 space-y-2">
                    <p className="text-gray-600">SUNITHA BALASUBRAMANIAM</p>
                    <p className="text-gray-600">
                      CULINARY MEDICINE SPECIALIST
                    </p>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-teal-600 font-semibold mt-6 hover:underline focus:outline-none inline-flex items-center"
                    >
                      - Show Less
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-4">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="text-teal-600 font-semibold hover:underline focus:outline-none inline-flex items-center"
                  >
                    + Show More
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="md:w-1/2">
            <div
              className="relative rounded-full overflow-hidden bg-teal-100 p-4 mx-auto shadow-lg"
              style={{ maxWidth: "400px" }}
            >
              <img
                src={sunithaImage.src}
                alt="Sunitha Balasubramaniam"
                className="w-full h-full rounded-full object-cover"
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
