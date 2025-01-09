import { useState, useEffect, useRef } from "react";
import CustomEditor from "../CustomEditor";

const FieldModel = ({ details, toggleModel, setToggleModel }) => {
  const { title, content, last_modified } = details || {};
  const [formData, setFormData] = useState({ title: "", content: "" });
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setFormData({
      title: title || "",
      content: content || "",
    });
  }, [details]);

  useEffect(() => {
    if (toggleModel && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleModel]);

  // Adjust textarea height initially and on content change
  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  }, [formData.content]);

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto"; // Reset height
    const maxHeight = 400; // Maximum height
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "scroll" : "hidden";
  };

  return (
    <div
      onClick={() => setToggleModel(false)}
      className={`${
        toggleModel ? "fixed" : "hidden"
      } h-screen w-full grid place-items-center inset-0 bg-neutral-900 bg-opacity-75`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border z-20 -mt-[30vh] min-w-[300px] sm:min-w-[500px] max-w-600px] border-outlineWhite p-3 rounded-md bg-neutral-900"
      >
        <div className=" space-y-4">
          <input
            ref={inputRef}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="bg-transparent break-words text-lg font-semibold w-full focus:outline-none"
            type="text"
            value={formData.title || ""}
            placeholder="Heading"
            id="inputTitle"
          />
          <CustomEditor
            value={formData.content}
            setFormData={setFormData}
            // closeForm={handleClose}
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-xs">Edited: {last_modified}</p>
          <button
            onClick={() => setToggleModel(false)}
            className="font-semibold cursor-pointer px-3 py-1 hover:bg-neutral-800 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldModel;
