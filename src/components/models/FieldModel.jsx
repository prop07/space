import { useState, useEffect, useRef } from "react";

const FieldModel = ({ details, toggleModel, setToggleModel }) => {
  const { title, content, last_modified } = details || {};
  const [data, setData] = useState({ title: "", content: "" });
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setData({
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
  }, [data.content]);

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
        className="border -mt-[30vh] min-w-[300px] sm:min-w-[500px] border-outlineWhite p-3 rounded-md bg-neutral-900"
      >
        <input
          ref={inputRef}
          onChange={(e) =>
            setData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="bg-transparent font-semibold w-full focus:outline-none"
          type="text"
          value={data.title || ""}
          placeholder="Heading"
          id="inputTitle"
        />
        <textarea
          ref={textareaRef}
          onChange={(e) => {
            setData((prev) => ({ ...prev, content: e.target.value }));
            adjustTextareaHeight(e.target);
          }}
          className="mt-2 bg-transparent resize-none w-full focus:outline-none max-h-[400px] overflow-y-scroll"
          value={data.content || ""}
          placeholder="Body..."
          id="inputContent"
          rows={1}
        />
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
