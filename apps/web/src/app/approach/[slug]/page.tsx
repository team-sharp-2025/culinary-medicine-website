import { approachContentMap } from "@/data/approachContent";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
// import { motion } from "framer-motion";
import { MotionHeader } from "../../../components/Approach/MotionHeader";

// SEO Metadata (Optional but recommended)
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const content = approachContentMap[params.slug];

  if (!content) {
    return {
      title: "Unknown Approach",
      description: "This approach type does not exist.",
    };
  }

  return {
    title: content.title,
    description: content.subtitle,
  };
}

// Static generation (optional if you want SSR only)
export async function generateStaticParams() {
  return Object.keys(approachContentMap).map((slug) => ({ slug }));
}

// Main Page Component
export default function ApproachSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const content = approachContentMap[slug];

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-white">
      {/* Gradient Header */}
      <div className="relative bg-gradient-to-r from-teal-500 to-blue-500 py-12 md:py-16">
        <MotionHeader title={content.title} subtitle={content.subtitle} />
      </div>

      {/* Description and Images */}
      <div className="max-w-5xl mx-auto text-center px-4 py-10">
        <p className="text-md text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
          {content.description}
        </p>

        <div className="w-36 h-1 bg-emerald-400 mx-auto rounded-full mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Certificates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {content.images.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`Approach visual ${idx + 1}`}
              width={400}
              height={300}
              className="w-full h-auto shadow-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
