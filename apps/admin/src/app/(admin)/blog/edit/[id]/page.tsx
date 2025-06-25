"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RichTextEditor, { RichTextEditorRef } from "../../../../../components/Blog/RichTextEditor";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../../../../../lib/supabaseClient";

export default function BlogEditPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const editorRef = useRef<RichTextEditorRef>(null);

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");

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
        if (!data.response.imageUrl) {
          console.error("Blog image not found");
        } else {
          setImageURL(data.response.imageUrl);
        }
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
    try {
      e.preventDefault();
      let imageUrl = imageURL;
      const content = editorRef.current?.getHTML() || "";

      if (!title.trim() || (!content || content === "<p></p>")) {
        toast.error("Title or content should not be empty");
        return;
      }

      if (imageURL && imageFile != null) {
        const filePath = getFilePath(imageURL);
        const { error: deleteError } = await supabase.storage.from("blog-images").remove([filePath]);

        if (deleteError) {
          console.error("Image delete error:", deleteError);
          toast.error("Failed to delete blog image.");
          return;
        }
      }

      if (imageFile != null) {
        const fileExt = imageFile.name?.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("blog-images").upload(fileName, imageFile);
        if (uploadError) {
          console.error("Image upload error:", uploadError);
          toast.error("Failed to upload blog image.");
          return;
        }
        const result = supabase.storage.from("blog-images").getPublicUrl(fileName);
        imageUrl = result.data.publicUrl;
      }


      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Blog updated successfully!");
        router.push("/blog");
      } else {
        toast.error("Failed to submit blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("An error occurred while updating the blog.");
    }
  };

  const getFilePath = (imageUrl: string) => {
    const publicPrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}` + `/storage/v1/object/public/blog-images/`;
    const filePath = imageUrl.replace(publicPrefix, "");
    return filePath;
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-3xl mx-auto">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-semibold">Edit Blog</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
        className="w-full border p-2 rounded"
      />

      <RichTextEditor ref={editorRef} />

      <label className="block mb-4">
        <span className="block mb-2 font-medium text-gray-700">Upload Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full file:cursor-pointer file:bg-emerald-600 file:text-white file:px-4 file:py-2 file:rounded file:border-none file:hover:bg-emerald-700"
        />
      </label>

      <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}