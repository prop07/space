import { useState, useRef } from "react";
import { FaList } from "react-icons/fa";
import { FiBold, FiItalic, FiUnderline } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "./ui/button/Button";

const CustomEditor = ({ value, onChange, closeForm, editorName }) => {
  const [activeTools, setActiveTools] = useState([]);
  const quillRef = useRef(null);

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

  const handleChange = (content) => {
    console.log(content.endsWith("<p><br></p>"));
    if (content.endsWith("<p><br></p>")) {
      const editorContainer = document.querySelector("." + editorName); // Select by class name
      if (editorContainer) {
        editorContainer.scrollBy({ top: 30, behavior: "auto" });
      }
    }
    onChange(content);
  };
  return (
    <div>
      <div className=" cursor-text " onClick={handleParentClick}>
        <div
          className={`${editorName} max-h-[300px] sm:max-h-[500px] overflow-y-scroll`}
          // style={{ maxHeight: "300px ", overflowY: "auto" }}
        >
          <ReactQuill
            ref={quillRef}
            value={value}
            onChange={handleChange}
            placeholder="Body......"
            theme="snow"
            className="editor"
            style={{ height: "100%", overflowY: "auto" }}
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
            {closeForm && <Button onClick={closeForm} placeHolder={"Close"} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomEditor;
