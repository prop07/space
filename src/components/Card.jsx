import React from "react";
import { BiSolidTrash } from "react-icons/bi";

const Card = ({ activeDelete, activeFieldModel, details }) => {
  const { title, content, last_modified } = details;

  return (
    <div
      onClick={() => activeFieldModel(details)}
      className=" p-4 space-y-2 rounded-md border border-outlineWhite  "
    >
      <div className="flex justify-between items-start  ">
        <h1 className=" font-semibold  ">{title}</h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            activeDelete(details);
          }}
          className=" cursor-pointer py-2 px-2 hover:bg-neutral-800 rounded-md"
        >
          <BiSolidTrash size={20} />
        </button>
      </div>
      <div className="max-h-96 overflow-y-scroll ">
        <p className="">{content}</p>
      </div>
      <p className="text-xs text-end">Edited: {last_modified}</p>
    </div>
  );
};

export default Card;
