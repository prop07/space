import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  resetField,
  updateField,
  handleUpdateField,
} from "@/features/field";
import { KEY_DEBOUNCE_DELAY } from "../../../Constantes";

import { useCloudStatus } from "@/context/CloudStatusProvider";
import CustomEditor from "@/components/CustomEditor";

export const FieldAddForm = ({ spaceId }) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const { cloudStatus, setCloudStatus } = useCloudStatus();
  const fieldDetails = useSelector((state) => state.field);

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setToggleForm(false);
        setFormData((prev) => ({ ...prev, title: "", content: "" }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (toggleForm && inputRef.current) {
      inputRef.current.focus();
    }
    if (!toggleForm) {
      dispatch(resetField());
    }
  }, [toggleForm, fieldDetails]);

  useEffect(() => {
    const addValue = () => {
      if (fieldDetails.data && formData.title && formData.content) {
        setCloudStatus("pending");
        const fieldData = {
          ...formData,
          field_code: fieldDetails.data.field.field_code,
        };
        handleUpdateField(fieldData, dispatch, spaceId);
      } else if (formData.title && formData.content) {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }

        setCloudStatus("pending");
        console.log("running add");
        debounceTimeout.current = setTimeout(() => {
          dispatch(addField({ id: spaceId, fieldData: formData }));
          debounceTimeout.current = null;
        }, KEY_DEBOUNCE_DELAY);
      }
    };

    addValue();
  }, [formData.title, formData.content]);

  const handleClose = () => {
    setToggleForm(false);
    setFormData((prev) => ({ ...prev, title: "", content: "" }));
  };

  return (
    <div ref={formRef} className=" mb-8 px-2">
      <button
        onClick={() => setToggleForm(true)}
        className={`${
          toggleForm ? "hidden" : "block"
        } border border-outlineWhite font-semibold p-2 rounded-md w-full text-start cursor-text`}
      >
        List anything...
      </button>
      <div className={`${!toggleForm ? "hidden" : "block"} `}>
        <div className=" border border-outlineWhite rounded-md p-2 space-y-1">
          <input
            ref={inputRef}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="bg-transparent mb-2 text-base w-full focus:outline-none"
            type="text"
            value={formData.title}
            placeholder="Heading"
            id="inputTitle"
          />
          <CustomEditor
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
            closeForm={handleClose}
          />
        </div>
      </div>
    </div>
  );
};
