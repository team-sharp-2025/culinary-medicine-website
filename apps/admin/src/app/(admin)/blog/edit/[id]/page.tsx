"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RichTextEditor, { RichTextEditorRef } from "../../../../../components/Blog/RichTextEditor";

export default function BlogEditPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const editorRef = useRef<RichTextEditorRef>(null);

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();

        if (!data.success) {
          alert("Blog not found");
          router.push("/blog");
          return;
        }

        setTitle(data.response.title);
        editorRef.current?.setHTML(data.response.content);
      } catch (e) {
        alert("Error fetching blog");
        router.push("/admin/blog");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editorRef.current?.getHTML() || "";

    const res = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Blog updated successfully!");
      router.push("/blog");
    } else {
      alert("Update failed");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">Edit Blog</h1>

      <input
        type="text"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
        className="w-full border p-2 rounded"
      />

      <RichTextEditor ref={editorRef} />

      <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}