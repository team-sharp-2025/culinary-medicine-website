import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const id = params.slug.split("-").pop();
  const res = await fetch(`/api/blogs/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  if (!data.success) return { title: "Blog Not Found" };

  return {
    title: `${data.response.title} | Culinary Medicine`,
    description: data.response.content.slice(0, 150),
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug.split("-").pop();

  const res = await fetch(`http://localhost:3001/api/blogs/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  if (!data.success) return notFound();

  const blog: Blog = data.response;

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      <div className="bg-gradient-to-r from-emerald-600 to-lime-500 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            {blog.title}
          </h1>
          <p className="text-sm text-lime-100">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <div className="prose prose-lg text-gray-800">{blog.content}</div>
      </div>
    </div>
  );
}
