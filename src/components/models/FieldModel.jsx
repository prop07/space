import React, { useState, useEffect, useRef } from "react";

const FieldModel = ({
  activeField,
  className,
  toggleFieldModel,
  setToggleFieldModel,
}) => {
  const { title, content, last_modified } = activeField || {};
  const [data, setData] = useState({ title: "", content: "" });
  const inputRef = useRef(null);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      title: title || "",
      content: content || "",
    }));
  }, [activeField]);

  useEffect(() => {
    if (toggleFieldModel && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleFieldModel]);

  return (
    <div
      onClick={() => setToggleFieldModel(false)}
      className={`${className}   h-screen w-full grid place-items-center inset-x-0 inset-y-0 bg-neutral-900 bg-opacity-85 `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border -mt-[40vh] min-w-[300px] sm:min-w-[400px]  border-outlineWhite p-3 rounded-md bg-neutral-900    "
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
        <label className=" cursor-text" htmlFor="inputContent">
          <textarea
            onChange={(e) =>
              setData((prev) => ({ ...prev, content: e.target.value }))
            }
            className=" mt-2 bg-transparent resize-none  w-full focus:outline-none"
            type="text"
            value={data.content || ""}
            placeholder="Body..."
            id="inputContent"
            rows={1}
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset height to auto to calculate the new scrollHeight
              const maxHeight = 400;
              e.target.style.height = `${Math.min(
                e.target.scrollHeight,
                maxHeight
              )}px`;
              e.target.style.overflowY =
                e.target.scrollHeight > maxHeight ? "scroll" : "hidden"; // Enable scrolling if content exceeds maxHeight
            }}
          />

          <div className="flex  justify-between items-center">
            <p className="text-xs">Edited: {last_modified}</p>
            <button
              onClick={() => setToggleFieldModel(false)}
              className=" font-semibold cursor-pointer px-3 py-1 hover:bg-neutral-800 rounded-md "
            >
              Close
            </button>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FieldModel;
