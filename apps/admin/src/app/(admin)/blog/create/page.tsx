"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor, {
  RichTextEditorRef,
} from "../../../../components/Blog/RichTextEditor";
import { supabase } from "../../../../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

export default function BlogCreatePage() {
  const router = useRouter();
  const editorRef = useRef<RichTextEditorRef>(null);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.stopPropagation();
    e.preventDefault();
    const content = editorRef.current?.getHTML() || "";

    if (!title.trim() || !content || content === "<p></p>") {
      setLoading(false);
      toast.error("Title or content should not be empty");
      return;
    }

    let imageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name?.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, imageFile);
      if (uploadError) throw uploadError;
      const result = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);
      imageUrl = result.data.publicUrl;
    }

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, imageUrl }),
    });

    const data = await res.json();
    if (data.success) {
      setLoading(false);
      toast.success("Blog updated successfully!");
      setTimeout(() => {
        router.push("/blog");
      }, 1000);
    } else {
      setLoading(false);
      toast.error("Failed to create blog");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <Toaster position="top-center" />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Title"
      />

      <RichTextEditor ref={editorRef} />

      <label className="block mb-4">
        <span className="block mb-2 font-medium text-gray-700">
          Upload Image
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full file:cursor-pointer file:bg-emerald-600 file:text-white file:px-4 file:py-2 file:rounded file:border-none file:hover:bg-emerald-700"
        />
      </label>

      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${
          loading
            ? "bg-emerald-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
