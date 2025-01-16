import { useState, useRef } from "react";
import { FaList } from "react-icons/fa";
import { FiBold, FiItalic, FiUnderline } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomEditor = ({ value, setFormData, closeForm }) => {
  const [activeTools, setActiveTools] = useState([]);
  const quillRef = useRef(null);

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const toggleTool = (format) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const currentFormat = editor.getFormat();
    const isActive = currentFormat[format];

    if (isActive) {
      editor.format(format, false);
      setActiveTools((prev) => prev.filter((tool) => tool !== format));
    } else {
      editor.format(format, true);
      setActiveTools((prev) => [...prev, format]);
    }
  };

  const isToolActive = (format) => activeTools.includes(format);

  const handleParentClick = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.focus();
    }
  };

  return (
    <div>
      <div className="flex flex-col  cursor-text" onClick={handleParentClick}>
        <div className="min-h-[50px]">
          <ReactQuill
            ref={quillRef}
            value={value}
            onChange={handleEditorChange}
            placeholder="Body......"
            theme="snow"
            className="editor"
            style={{ maxHeight: "400px", overflowY: "scroll" }}
            modules={{
              toolbar: false,
            }}
          />
        </div>
        <div className="flex items-center justify-between  mt-2 ">
          <div className=" space-x-2">
            <button
              onClick={() => toggleTool("bold")}
              className={`p-2 rounded ${
                isToolActive("bold")
                  ? " text-white hover:bg-neutral-700"
                  : "text-neutral-500 hover:bg-neutral-700"
              }`}
              title="Bold"
            >
              <FiBold className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleTool("italic")}
              className={`p-2 rounded ${
                isToolActive("italic")
                  ? " text-white hover:bg-neutral-700"
                  : "text-neutral-500 hover:bg-neutral-700"
              }`}
              title="Italic"
            >
              <FiItalic className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleTool("underline")}
              className={`p-2 rounded ${
                isToolActive("underline")
                  ? " text-white hover:bg-neutral-700"
                  : "text-neutral-500 hover:bg-neutral-700"
              }`}
              title="Underline"
            >
              <FiUnderline className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleTool("list")}
              className={`p-2 rounded ${
                isToolActive("list")
                  ? " text-white hover:bg-neutral-700"
                  : "text-neutral-500 hover:bg-neutral-700"
              }`}
              title="Bullet List"
            >
              <FaList className="w-4 h-4" />
            </button>
          </div>
          <div>
            {closeForm && (
              <button
                onClick={closeForm}
                className="font-semibold cursor-pointer px-3 py-1 hover:bg-neutral-800 rounded-md"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomEditor;
