import { useEffect, useState } from "react";
import Link from "next/link";
import { BarLoader } from "@repo/ui";

interface Reel {
  id: number;
  title: string;
  link: string;
}

export default function InstagramReels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInstagramScript = () => {
      if (!(window as any).instgrm) {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => {
          if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        };
        document.body.appendChild(script);
      } else {
        (window as any).instgrm.Embeds.process();
      }
    };

    const fetchReels = async () => {
      try {
        const response = await fetch("/api/reels/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: 1, size: 3, searchTerm: "" }),
        });

        const data = await response.json();
        if (data.success) {
          setReels(data.response.reels);
        }
      } catch (error) {
        console.error("Failed to fetch reels:", error);
      } finally {
        setLoading(false);
        setTimeout(loadInstagramScript, 500);
      }
    };

    fetchReels();
  }, []);

  return (
    <section className="bg-[#f9fafb] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Instagram Reels
        </h2>

        {loading ? (
          <BarLoader />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reels.map((reel) => (
                <div
                  key={reel.id}
                  className="bg-white shadow-lg rounded-xl p-2 w-full"
                >
                  <blockquote
                    className="instagram-media w-full"
                    data-instgrm-permalink={reel.link}
                    data-instgrm-version="14"
                    style={{ width: "100%" }}
                  ></blockquote>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/reels">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                  View More Reels
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
