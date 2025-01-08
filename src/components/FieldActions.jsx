import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteField } from "../features/fieldSlice";

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
      className="relative"
      ref={menuRef}
    >
      <button
        className="cursor-pointer py-2 px-2 hover:bg-neutral-800 rounded-md"
        onClick={() => {
          setToggleAction(!toggleAction);
        }}
      >
        <BsThreeDotsVertical size={20} />
      </button>
      {toggleAction && (
        <div className="absolute top-[70%] -left-20 mt-2 rounded-md inline-block py-1 text-sm tracking-wider bg-black shadow-md border border-outlineWhite">
          <p className="pl-4 whitespace-nowrap pr-2 py-1 cursor-pointer hover:bg-gray-600 ease-in-out duration-200">
            Upload file
          </p>
          <p className="pl-4 pr-2 py-1 cursor-pointer hover:bg-gray-600 ease-in-out duration-200">
            Duplicate
          </p>
          <p
            onClick={() => handleDelete()}
            className="pl-4 pr-2 py-1 cursor-pointer hover:bg-gray-600 ease-in-out duration-200"
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default FieldActions;
