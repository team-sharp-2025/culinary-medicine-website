import React from "react";

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">
        Blog: {params.slug.replace(/-/g, " ")}
      </h1>
      <p>
        This is the content of the blog post with slug:{" "}
        <strong>{params.slug}</strong>.
      </p>
    </div>
  );
}
