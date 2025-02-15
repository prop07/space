import { useMemo, useRef, useEffect, useState } from "react";
import { useLocation } from "react-router";
import FieldActions from "./FieldActions";

export const FieldList = ({ spaceId, spaceDetail, setActiveFieldInfo }) => {
  const path = useLocation();
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
    <div className="p-2  " onClick={(e) => e.stopPropagation()}>
      <div className="px-2 text-sm mb-2 tracking-wider ">FIELD</div>
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
                    path={path.pathname}
                    spaceId={spaceId}
                    details={item}
                    key={item.field_code}
                    setActiveFieldInfo={setActiveFieldInfo}
                  />
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};

const Card = ({ spaceId, details, setActiveFieldInfo, path }) => {
  const { title, content, last_modified } = details;

  return (
    <div
      onClick={() => setActiveFieldInfo(details)}
      className="p-4 space-y-2 rounded-md border border-outlineWhite cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <h1 className="font-semibold break-words">{title}</h1>
        {path === "/space" && (
          <FieldActions spaceId={spaceId} details={details} />
        )}
      </div>
      <div className="max-h-96 overflow-y-hidden">
        <p className=" text-sm" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <p className="text-xs text-end">Edited: {last_modified}</p>
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
