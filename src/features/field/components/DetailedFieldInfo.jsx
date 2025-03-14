import { useState, useEffect, useRef } from "react";
import CustomEditor from "@/components/CustomEditor";
import { useDispatch } from "react-redux";
import { resetField, handleUpdateField } from "@/features/field";
import { useCloudStatus } from "@/context/CloudStatusProvider";
import Modal from "../../../components/models/Modal";
import Button from "../../../components/ui/button/Button";

export const DetailedFieldInfo = ({
  activeFieldInfo,
  setActiveFieldInfo,
  spaceId,
}) => {
  const { cloudStatus, setCloudStatus } = useCloudStatus();
  const dispatch = useDispatch();
  const [toggleForm, setToggleForm] = useState(false);
  const { title, content, last_modified, field_code } = activeFieldInfo || {};
  const inputHeadingRef = useRef(null);
  const [formData, setFormData] = useState({
    title: null,
    content: null,
  });

  useEffect(() => {
    if (inputHeadingRef.current) {
      inputHeadingRef.current.focus();
    }
  }, [activeFieldInfo]);

  useEffect(() => {
    setFormData({
      title: title || null,
      content: content || null,
    });
    if (activeFieldInfo) {
      setToggleForm(true);
    }
  }, [activeFieldInfo]);

  const handleForm = () => {
    setCloudStatus("pending");
    const fieldDate = { ...formData, field_code: field_code };
    handleUpdateField(fieldDate, dispatch, spaceId);
    setToggleForm(false);
  };

  const closeForm = () => {
    setToggleForm(false);
    dispatch(resetField());
    setTimeout(() => {
      setActiveFieldInfo(null);
    }, 500);
  };

  return (
    <Modal isOpen={toggleForm} onClose={closeForm}>
      <div className=" space-y-4">
        <input
          ref={inputHeadingRef}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, title: e.target.value }));
          }}
          className="bg-transparent break-words text-lg font-semibold w-full focus:outline-hidden"
          type="text"
          value={formData.title || ""}
          placeholder="Heading"
          id="inputTitle"
        />
        <CustomEditor
          editorName={"infoFormEditor"}
          value={formData.content}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, content: value }));
          }}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs">Edited: {last_modified}</p>
        {(formData.title &&
          formData.content &&
          formData.content.trim() !== "<p><br></p>" &&
          title != formData.title) ||
        content != formData.content ? (
          <Button onClick={handleForm} placeHolder={"Update"} />
        ) : (
          <Button onClick={closeForm} placeHolder={"Close"} />
        )}
      </div>
    </Modal>
  );
};
