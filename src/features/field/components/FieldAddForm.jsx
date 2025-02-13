import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField, resetField, handleUpdateField } from "@/features/field";
import { loadingToast } from "@/components/notifications/Toast";
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

  const handleForm = () => {
    console.log(formData);
    if (fieldDetails?.data?.field?.field_code) {
      console.log("handleUpdate");
      setCloudStatus("pending");
      const fieldData = {
        ...formData,
        field_code: fieldDetails.data.field.field_code,
      };
      handleUpdateField(fieldData, dispatch, spaceId);
    } else if (
      formData.title &&
      formData.content &&
      formData.content != "<p><br></p>"
    ) {
      console.log("add");
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      setCloudStatus("pending");
      debounceTimeout.current = setTimeout(() => {
        dispatch(addField({ id: spaceId, fieldData: formData }));
        debounceTimeout.current = null;
      }, KEY_DEBOUNCE_DELAY);
    }
  };

  useEffect(() => {
    handleForm();
  }, [formData]);

  useEffect(() => {
    if (!toggleForm && fieldDetails.data) {
      dispatch(resetField());
    }
  }, [cloudStatus]);

  const openForm = () => {
    if (cloudStatus === "pending") {
      loadingToast();
      return null;
    }
    setFormData((prev) => ({ ...prev, title: "", content: "" }));
    dispatch(resetField());
    setToggleForm(true);
  };

  return (
    <div ref={formRef} className=" mb-8 px-2">
      <button
        onClick={openForm}
        className={`${
          toggleForm ? "hidden" : "block"
        } border border-outlineWhite font-semibold p-2 rounded-md w-full text-start cursor-text  `}
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
            editorName={"addFormEditor"}
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
            closeForm={() => setToggleForm(false)}
          />
        </div>
      </div>
    </div>
  );
};
