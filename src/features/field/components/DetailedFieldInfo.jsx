import { useState, useEffect, useRef } from "react";
import CustomEditor from "@/components/CustomEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  resetField,
  updateField,
  deleteField,
  handleUpdateField,
} from "@/features/field";

import { useCloudStatus } from "@/context/CloudStatusProvider";
import Modal from "../../../components/models/Modal";

export const DetailedFieldInfo = ({
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
    if (title && content) {
      setCloudStatus("pending");
      const fieldDate = { ...data, field_code: field_code };
      if (data.title && data.content) {
        handleUpdateField(fieldDate, dispatch, spaceId);
      }
      // debounceTimeout.current = setTimeout(() => {
      //   console.log("running update");
      //   const fieldData = {
      //     ...data,
      //     field_code: field_code,
      //   };
      //   dispatch(
      //     updateField({
      //       id: spaceId,
      //       fieldData: fieldData,
      //     })
      //   );
      //   debounceTimeout.current = null;
      // }, KEY_DEBOUNCE_DELAY);
    }
  };

  const handleClose = () => {
    setActiveFieldInfo(null);
    dispatch(resetField());
  };

  return (
    <Modal
      isOpen={activeFieldInfo ? true : false}
      onClose={() => handleClose()}
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
          editorName={"infoFormEditor"}
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
          onClick={handleClose}
          className="font-semibold cursor-pointer px-3 py-1 hover:bg-neutral-800 rounded-md"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
