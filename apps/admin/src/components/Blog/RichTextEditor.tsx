// components/RichTextEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useImperativeHandle } from "react";

export type RichTextEditorRef = {
  getHTML: () => string;
  setHTML: (value: string) => void;
};

const RichTextEditor = forwardRef<RichTextEditorRef>((_, ref) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[250px] w-full outline-none prose prose-sm sm:prose lg:prose-lg focus:outline-none",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() || "",
    setHTML: (value: string) => editor?.commands.setContent(value),
  }));

  if (!editor) return null;

  const btn = (label: string, action: () => void, active: boolean) => (
    <button
      type="button"
      onClick={action}
      className={`px-3 py-1 text-sm rounded border ${
        active
          ? "bg-emerald-600 text-white border-emerald-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        {btn("Bold", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
        {btn("Italic", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
        {btn(
          "Bullet",
          () => editor.chain().focus().toggleBulletList().run(),
          editor.isActive("bulletList")
        )}
      </div>

      {/* Editor Box */}
      <div className="border rounded-md p-4 bg-white shadow-sm">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;