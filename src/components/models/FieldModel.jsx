import { useState, useEffect, useRef } from "react";

const FieldModel = ({ details, toggleModel, setToggleModel }) => {
  const { title, content, last_modified } = details || {};
  const [data, setData] = useState({ title: "", content: "" });
  const inputRef = useRef(null);

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

  return (
    <div
      onClick={() => setToggleModel(false)}
      className={`${
        toggleModel ? "fixed" : "hidden"
      } h-screen w-full grid place-items-center inset-0 bg-neutral-900 bg-opacity-85`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border -mt-[40vh] min-w-[300px] sm:min-w-[400px] border-outlineWhite p-3 rounded-md bg-neutral-900"
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
          onChange={(e) =>
            setData((prev) => ({ ...prev, content: e.target.value }))
          }
          className="mt-2 bg-transparent resize-none w-full focus:outline-none"
          value={data.content || ""}
          placeholder="Body..."
          id="inputContent"
          rows={1}
          onInput={(e) => {
            e.target.style.height = "auto";
            const maxHeight = 400;
            e.target.style.height = `${Math.min(
              e.target.scrollHeight,
              maxHeight
            )}px`;
            e.target.style.overflowY =
              e.target.scrollHeight > maxHeight ? "scroll" : "hidden";
          }}
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
