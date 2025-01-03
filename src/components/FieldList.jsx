import React, { useMemo } from "react";
import useScreenWidth from "../hooks/useScreenWidth";
import { BiSolidTrash } from "react-icons/bi";

const FieldList = ({ spaceDetail, activeDelete, activeFieldModel }) => {
  const screenWidth = useScreenWidth();

  // Determine columns based on screen width
  const columns = useMemo(() => {
    if (screenWidth < 640) return 1; // For sm
    if (screenWidth < 1024) return 2; // For md
    return 3; // For lg
  }, [screenWidth]);

  // Distribute the spaceDetail data into columns
  const data = useMemo(() => {
    const columnData = {};
    spaceDetail.data.forEach((item, index) => {
      const column = String.fromCharCode(97 + (index % columns)); // Assign column based on index
      if (!columnData[column]) {
        columnData[column] = [];
      }
      columnData[column].push(item);
    });
    return columnData;
  }, [spaceDetail.data, columns]);

  return (
    <div className="p-2">
      <h1>Data for {columns} Columns</h1>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        {Object.keys(data).map((column) => (
          <div className="space-y-2" key={column} style={{ flex: 1 }}>
            <h3>Column {column.toUpperCase()}</h3>
            {data[column].map((item, index) => (
              // <div
              //   className="border border-outlineWhite rounded-md p-4"

              // >
              //   <h4 className="font-bold">{item.title}</h4>
              //   <p>{item.content}</p>
              // </div>
              <Card
                index={index}
                key={item.field_code}
                details={item}
                activeDelete={activeDelete}
                activeFieldModel={activeFieldModel}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldList;

const Card = ({ activeDelete, activeFieldModel, details, index }) => {
  const { title, content, last_modified } = details;

  return (
    <div
      onClick={() => activeFieldModel(details)}
      className=" p-4 space-y-2 rounded-md border border-outlineWhite"
    >
      <div className="flex justify-between items-start  ">
        <p>index {index}</p>
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
