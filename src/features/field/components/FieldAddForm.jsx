import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField, resetField, handleUpdateField } from "@/features/field";
import { loadingToast, errorToast } from "@/components/notifications/Toast";
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

  // console.log("field details", JSON.stringify(fieldDetails, null, 2));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!toggleForm && fieldDetails.data) {
      dispatch(resetField());
    }
  }, [cloudStatus]);

  useEffect(() => {
    if (!formData.title && fieldDetails.data) {
      errorToast("Heading is required !");
    }
    handleForm();
  }, [formData]);

  const openForm = () => {
    if (cloudStatus === "pending") {
      loadingToast();
      return null;
    }

    dispatch(resetField());
    setTimeout(() => {
      setToggleForm(true);
    }, 100);
  };

  const closeForm = () => {
    dispatch(resetField());
    setToggleForm(false);
    setFormData((prev) => ({ ...prev, title: "", content: "" }));
  };

  const handleForm = () => {
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
      console.log("handleadd");
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

  return (
    <div
      ref={formRef}
      className=" mb-8 px-2 bg-primary border border-default-border rounded-md"
    >
      <button
        onClick={openForm}
        className={`${
          toggleForm ? "hidden" : "block"
        }  font-semibold p-2 rounded-md w-full text-start cursor-text  `}
      >
        List anything...
      </button>
      {toggleForm && (
        <div className="  rounded-md p-2 space-y-1">
          <input
            ref={inputRef}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="bg-transparent mb-2 text-base w-full focus:outline-hidden"
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
            closeForm={closeForm}
          />
        </div>
      )}
    </div>
  );
};
