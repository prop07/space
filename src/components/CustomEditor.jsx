import React, { useState, useRef } from "react";
import { FaLink, FaList } from "react-icons/fa";
import { FiBold, FiItalic, FiUnderline } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomEditor = () => {
  const [editorValue, setEditorValue] = useState("");
  const [activeTools, setActiveTools] = useState([]);
  const quillRef = useRef(null);

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const toggleTool = (format) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const currentFormat = editor.getFormat();
    const isActive = currentFormat[format];

    if (isActive) {
      editor.format(format, false); // Remove formatting
      setActiveTools((prev) => prev.filter((tool) => tool !== format));
    } else {
      editor.format(format, true); // Apply formatting
      setActiveTools((prev) => [...prev, format]);
    }
  };

  const isToolActive = (format) => activeTools.includes(format);

  return (
    <div>
      <div className="flex flex-col border border-outlineWhite rounded-md ">
        {/* ReactQuill Editor */}
        <ReactQuill
          ref={quillRef}
          value={editorValue}
          onChange={handleEditorChange}
          theme="snow"
          className="editor"
          modules={{
            toolbar: false, // Disable default toolbar
          }}
        />

        {/* Bottom Toolbar */}
        <div className="min-h-[49px] flex items-center justify-start gap-4 px-4 py-2">
          <button
            onClick={() => toggleTool("bold")}
            className={`p-2 rounded ${
              isToolActive("bold")
                ? "bg-neutral-700 text-white"
                : "text-neutral-300 hover:bg-neutral-700"
            }`}
            title="Bold"
          >
            <FiBold className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleTool("italic")}
            className={`p-2 rounded ${
              isToolActive("italic")
                ? "bg-neutral-700 text-white"
                : "text-neutral-300 hover:bg-neutral-700"
            }`}
            title="Italic"
          >
            <FiItalic className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleTool("underline")}
            className={`p-2 rounded ${
              isToolActive("underline")
                ? "bg-neutral-700 text-white"
                : "text-neutral-300 hover:bg-neutral-700"
            }`}
            title="Underline"
          >
            <FiUnderline className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleTool("list")}
            className={`p-2 rounded ${
              isToolActive("list")
                ? "bg-neutral-700 text-white"
                : "text-neutral-300 hover:bg-neutral-700"
            }`}
            title="Bullet List"
          >
            <FaList className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Preview */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
        <div
          className="p-4 rounded-lg bg-neutral-900 border border-neutral-700"
          dangerouslySetInnerHTML={{ __html: editorValue }}
        />
      </div>
      {JSON.stringify(editorValue)}
    </div>
  );
};

export default CustomEditor;
