"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor, {
  RichTextEditorRef,
} from "../../../../components/Blog/RichTextEditor";

export default function BlogCreatePage() {
  const router = useRouter();
  const editorRef = useRef<RichTextEditorRef>(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editorRef.current?.getHTML() || "";

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Blog created");
      router.push("/blog");
    } else {
      alert("Failed to create blog");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <input
        type="text"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Title"
      />

      <RichTextEditor ref={editorRef} />

      <button
        type="submit"
        className="bg-emerald-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
