import { useRef, useState } from "react";
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

  // const handleParentClick = () => {
  //   if (quillRef.current) {
  //     const editor = quillRef.current.getEditor();
  //     editor.focus();
  //   }
  // };

  const handleChange = (content) => {
    if (content.endsWith("<p><br></p>")) {
      const editorContainer = document.querySelector("." + editorName); // Select by class name
      if (editorContainer) {
        editorContainer.scrollBy({ top: 30, behavior: "auto" });
      }
    }
    onChange(content);
  };
  return (
    <div className=" cursor-text " onClick={(e) => e.stopPropagation()}>
      <div
        className={`${editorName} max-h-[300px] sm:max-h-[580px] overflow-y-scroll`}
        // style={{ maxHeight: "300px ", overflowY: "auto" }}
      >
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={handleChange}
          placeholder="Body......"
          // theme="snow"
          className="editor"
          style={{ height: "100%", overflowY: "auto" }}
          modules={{
            toolbar: false,
          }}
        />
      </div>
      <div className="flex items-center  mt-2 ">
        <div className="flex space-x-2">
          <Button
            onClick={() => toggleTool("bold")}
            icon={
              <FiBold
                size={15}
                className={`${
                  isToolActive("bold") ? "text-text " : "text-neutral-500"
                } `}
              />
            }
          />
          <Button
            onClick={() => toggleTool("italic")}
            icon={
              <FiItalic
                size={15}
                className={`${
                  isToolActive("italic") ? "text-text" : "text-neutral-500"
                } `}
              />
            }
          />
          <Button
            onClick={() => toggleTool("underline")}
            icon={
              <FiUnderline
                size={15}
                className={`${
                  isToolActive("underline") ? "text-text" : "text-neutral-500"
                } `}
              />
            }
          />
          <Button
            onClick={() => toggleTool("list")}
            icon={
              <FaList
                size={15}
                className={`${
                  isToolActive("list") ? "text-text" : "text-neutral-500"
                } `}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CustomEditor;
