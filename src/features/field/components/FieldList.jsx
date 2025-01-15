import { useMemo, useRef, useEffect, useState } from "react";
import FieldActions from "./FieldActions";
import FieldModel from "./FieldModel";

export const FieldList = ({ spaceId, spaceDetail }) => {
  const listContainerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (listContainerRef.current) {
        setWidth(listContainerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const columns = useMemo(() => {
    if (width >= 1208) return 3;
    if (width >= 728) return 2;
    return 1;
  }, [width]);

  const data = useMemo(() => {
    const columnData = {};
    spaceDetail.data.forEach((item, index) => {
      const columnKey = String.fromCharCode(97 + (index % columns));
      columnData[columnKey] = columnData[columnKey] || [];
      columnData[columnKey].push(item);
    });
    return columnData;
  }, [spaceDetail.data, columns]);

  return (
    <div className="p-2 relative  ">
      <div className="px-2 text-sm mb-2 ">FIELD</div>
      <div
        ref={listContainerRef}
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {spaceDetail.status === "idle" || spaceDetail.status === "pending"
          ? Array.from({ length: 4 }).map((_, index) => (
              <LoadingAnimations key={index} />
            ))
          : Object.keys(data).map((column) => (
              <div key={column} className="space-y-4">
                {data[column].map((item) => (
                  <Card
                    spaceId={spaceId}
                    details={item}
                    key={item.field_code}
                  />
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};


const Card = ({ spaceId, details }) => {
  const { title, content, last_modified } = details;
  const [toggleModel, setToggleModel] = useState(false);

  return (
    <div>
      <div
        onClick={() => setToggleModel(true)}
        className="p-4 space-y-2 rounded-md border border-outlineWhite cursor-default"
      >
        <div className="flex justify-between items-start">
          <h1 className="font-semibold break-words">{title}</h1>
          <FieldActions spaceId={spaceId} details={details} />
        </div>
        <div className="max-h-96 overflow-y-hidden">
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <p className="text-xs text-end">Edited: {last_modified}</p>
      </div>
      {toggleModel && (
        <FieldModel
          details={details}
          toggleModel={toggleModel}
          setToggleModel={setToggleModel}
        />
      )}
    </div>
  );
};

const LoadingAnimations = () => {
  return (
    <div className=" space-y-4 mt-2">
      <div className="p-4 space-y-2 rounded-md border  border-outlineWhite animate-pulse">
        <div className="flex justify-between items-start">
          <div className="h-4 bg-gray-600 rounded w-3/12"></div>
          <div className="h-6 w-6 bg-gray-600 rounded"></div>
        </div>
        <div className="max-h-24 overflow-y-auto">
          <div className="h-4 bg-gray-600 rounded w-full my-2"></div>
          <div className="h-4 bg-gray-600 rounded w-7/12 my-2"></div>
          <div className="h-4 bg-gray-600 rounded w-10/12 my-2"></div>
        </div>
        <div className=" flex justify-end">
          <div className="h-4 bg-gray-600 rounded w-4/12"></div>
        </div>
      </div>
    </div>
  );
};
