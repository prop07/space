import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField, resetField, updateField } from "@/features/field";

import { useCloudStatus } from "@/context/CloudStatusProvider";
import CustomEditor from "@/components/CustomEditor";

const FieldAddForm = ({ spaceId }) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const { cloudStatus, setCloudStatus } = useCloudStatus();
  const fieldData = useSelector((state) => state.field);

  // console.log("fieldData: ", JSON.stringify(fieldData, null, 2));

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const timeout = useRef(null);
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
    setCloudStatus("idle");
  }, [fieldData]);

  useEffect(() => {
    if (toggleForm && inputRef.current) {
      inputRef.current.focus();
    }
    if (!toggleForm) {
      dispatch(resetField());
    }
  }, [toggleForm]);

  useEffect(() => {
    const addValue = () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      if (fieldData.data && formData.title && formData.content) {
        setCloudStatus("pending");
        console.log("running update");
        timeout.current = setTimeout(() => {
          dispatch(
            updateField({
              id: spaceId,
              fieldData: {
                ...formData,
                field_code: fieldData.data.field.field_code,
              },
            })
          );
          timeout.current = null;
        }, 2000);
      } else if (formData.title && formData.content) {
        setCloudStatus("pending");
        console.log("running add");
        timeout.current = setTimeout(() => {
          dispatch(addField({ id: spaceId, fieldData: formData }));
          timeout.current = null;
        }, 2000);
      }
    };

    addValue();
  }, [formData.title, formData.content]);

  const handleClose = () => {
    setToggleForm(false);
    setFormData((prev) => ({ ...prev, title: "", content: "" }));
  };

  // console.log("field data: ", JSON.stringify(fieldData, null, 2));

  return (
    <div ref={formRef} className=" mb-8">
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
            className="bg-transparent text-lg w-full focus:outline-none"
            type="text"
            value={formData.title}
            placeholder="Heading"
            id="inputTitle"
          />
          <CustomEditor
            value={formData.content}
            setFormData={setFormData}
            closeForm={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default FieldAddForm;
