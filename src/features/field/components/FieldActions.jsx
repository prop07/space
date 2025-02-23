import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteField } from "../index";
import Button from "../../../components/ui/button/Button";
import { infoToast } from "../../../components/notifications/Toast";

const FieldActions = ({ spaceId, details }) => {
  const dispatch = useDispatch();
  const [toggleAction, setToggleAction] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleAction(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = () => {
    dispatch(
      deleteField({
        id: spaceId,
        fieldData: {
          field_code: details.field_code,
        },
      })
    );
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${toggleAction ? "relative" : "block"}`}
      ref={menuRef}
    >
      <Button
        onClick={() => {
          setToggleAction(!toggleAction);
        }}
        icon={<BsThreeDotsVertical size={20} />}
      />
      {toggleAction && (
        <div className="absolute top-[70%] -left-20 mt-2 rounded-md inline-block p-1 r text-sm tracking-wider bg-primary shadow-md shadow-default border border-default-border">
          <p
            onClick={() => infoToast("Adding soon...")}
            className="pl-4 whitespace-nowrap pr-2 py-1 cursor-pointer rounded-md hover:bg-default-hover ease-in-out duration-200"
          >
            Upload file
          </p>
          <p className="pl-4 pr-2 py-1 cursor-pointer rounded-md hover:bg-default-hover ease-in-out duration-200">
            Duplicate
          </p>
          <p
            onClick={() => handleDelete()}
            className="pl-4 pr-2 py-1 cursor-pointer rounded-md hover:bg-default-hover ease-in-out duration-200"
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default FieldActions;
