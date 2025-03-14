import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addField } from "@/features/field";
import { loadingToast, errorToast } from "@/components/notifications/Toast";
import { useCloudStatus } from "@/context/CloudStatusProvider";
import CustomEditor from "@/components/CustomEditor";
import Button from "../../../components/ui/button/Button";

export const FieldAddForm = ({ spaceId }) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const { cloudStatus, setCloudStatus } = useCloudStatus();

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const formRef = useRef(null);

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

  const openForm = () => {
    if (cloudStatus === "pending") {
      loadingToast();
      return null;
    }
    setToggleForm(true);
  };

  const closeForm = () => {
    setToggleForm(false);
    setFormData((prev) => ({ ...prev, title: "", content: "" }));
  };

  const handleForm = () => {
    setCloudStatus("pending");
    dispatch(addField({ id: spaceId, fieldData: formData }));
    closeForm();
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
            onClick={(e) => e.stopPropagation()}
            editorName={"addFormEditor"}
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
          />
          <div className=" flex justify-end -mt-10">
            {formData.title &&
            formData.content &&
            formData.content.trim() !== "<p><br></p>" ? (
              <Button onClick={handleForm} placeHolder={"Add"} />
            ) : (
              <Button onClick={closeForm} placeHolder={"Close"} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
