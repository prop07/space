import { useState, useEffect, useRef } from "react";
import { FiBold, FiItalic, FiUnderline } from "react-icons/fi";
import { FaList } from "react-icons/fa6";

const CustomTextEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(
    "<div>dasdadad</div><div>adasdada</div><div>adasdasdas</div><div>daasdasda</div><div>daasdasdasa</div><div>adadad<br></div>"
  );
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    list: false,
  });

  useEffect(() => {
    const updateFormats = () => {
      if (document.activeElement === editorRef.current) {
        setFormats({
          bold: document.queryCommandState("bold"),
          italic: document.queryCommandState("italic"),
          underline: document.queryCommandState("underline"),
          list: document.queryCommandState("insertUnorderedList"),
        });
      }
    };

    document.addEventListener("selectionchange", updateFormats);
    return () => document.removeEventListener("selectionchange", updateFormats);
  }, []);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    editorRef.current?.focus();

    // Update formats immediately after executing command
    setFormats((prev) => ({
      ...prev,
      [command]: !prev[command],
    }));
  };

  const handleChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 text-white group">
      {/* Editor Area */}
      <div className="relative">
        <div
          ref={editorRef}
          dangerouslySetInnerHTML={{ __html: content }}
          contentEditable
          className=" px-4 pt-4 rounded-t-lg bg-neutral-900 border-x border-t border-neutral-700 focus:outline-none"
          onInput={handleChange}
          onBlur={handleChange}
        />

        {/* Toolbar */}

        <div className=" min-h-[49px]   border-x border-b border-neutral-700 rounded-b-lg">
          <div className="group-hover:flex hidden items-center gap-1 p-2">
            {/* Format Buttons */}
            <button
              onClick={() => handleFormat("bold")}
              className={`p-2 rounded transition-colors ${
                formats.bold
                  ? "bg-neutral-600 text-white"
                  : "text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <FiBold className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleFormat("italic")}
              className={`p-2 rounded transition-colors ${
                formats.italic
                  ? "bg-neutral-600 text-white"
                  : "text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <FiItalic className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleFormat("underline")}
              className={`p-2 rounded transition-colors ${
                formats.underline
                  ? "bg-neutral-600 text-white"
                  : "text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <FiUnderline className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleFormat("insertUnorderedList")}
              className={`p-2 rounded transition-colors ${
                formats.list
                  ? "bg-neutral-600 text-white"
                  : "text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <FaList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
        <div
          className="p-4 rounded-lg bg-neutral-900 border border-neutral-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      {JSON.stringify(content)}
    </div>
  );
};

export default CustomTextEditor;
