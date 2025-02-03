import { useState, useEffect, useRef } from "react";
import CustomEditor from "@/components/CustomEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  resetField,
  updateField,
  deleteField,
} from "@/features/field";

import { useCloudStatus } from "@/context/CloudStatusProvider";
import { KEY_DEBOUNCE_DELAY } from "../../../Constantes";

export const DetailedFieldInfo = ({
  detailsModel,
  setDetailsModel,
  activeFieldInfo,
  setActiveFieldInfo,
  spaceId,
}) => {
  const { cloudStatus, setCloudStatus } = useCloudStatus();
  const dispatch = useDispatch();
  const { title, content, last_modified, field_code } = activeFieldInfo || {};
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);
  const [formData, setFormData] = useState({
    title: null,
    content: null,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeFieldInfo]);

  useEffect(() => {
    setFormData({
      title: title || null,
      content: content || null,
    });
  }, [activeFieldInfo]);

  const handleUpdate = (data) => {
    console.log("data: ", data);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // if (formData.title && formData.content) {
    setCloudStatus("pending");
    debounceTimeout.current = setTimeout(() => {
      console.log("running update");
      dispatch(
        updateField({
          id: spaceId,
          fieldData: {
            ...data,
            field_code: field_code,
          },
        })
      );
      debounceTimeout.current = null;
    }, KEY_DEBOUNCE_DELAY);
  };

  return (
    <div
      onClick={() => setDetailsModel(false)}
      className={`${
        detailsModel ? "fixed" : "hidden"
      } h-screen w-full grid place-items-center inset-0 bg-neutral-900 bg-opacity-75 z-50`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border z-20 Sm:-mt-[30vh] max-w-[300px] sm:min-w-[600px]  border-outlineWhite p-3 rounded-md bg-neutral-900"
      >
        <div className=" space-y-4">
          <input
            ref={inputRef}
            onChange={(e) => {
              handleUpdate({ ...formData, title: e.target.value }),
                setFormData((prev) => ({ ...prev, title: e.target.value }));
            }}
            className="bg-transparent break-words text-lg font-semibold w-full focus:outline-none"
            type="text"
            value={formData.title || ""}
            placeholder="Heading"
            id="inputTitle"
          />
          <CustomEditor
            value={formData.content}
            onChange={(value) => {
              handleUpdate({ ...formData, content: value }),
                setFormData((prev) => ({ ...prev, content: value }));
            }}
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-xs">Edited: {last_modified}</p>
          <button
            onClick={() => setDetailsModel(false)}
            className="font-semibold cursor-pointer px-3 py-1 hover:bg-neutral-800 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
