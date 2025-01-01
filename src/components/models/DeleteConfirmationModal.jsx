import React from "react";
import { IoMdClose } from "react-icons/io";

const DeleteConfirmationModal = ({
  children,
  className,
  setToggleDelete,
  deleteFunction,
}) => {
  return (
    <div
      onClick={() => setToggleDelete(false)}
      className={`${className}   h-screen w-full grid place-items-center inset-x-0 inset-y-0 bg-neutral-900 bg-opacity-85 `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border -mt-[40vh] min-w-[300px] sm:min-w-[400px]  border-outlineWhite p-3 rounded-md bg-neutral-900    "
      >
        <div className="flex justify-between items-center">
          <p className=" text-lg font-semibold tracking-wide  ">
            Confirm delete
          </p>
          <button
            onClick={() => setToggleDelete(false)}
            className=" cursor-pointer p-1 hover:bg-neutral-800 rounded-md"
          >
            <IoMdClose size={20} />
          </button>
        </div>
        {children}
        <div className="mt-8 flex justify-end gap-2">
          <button
            onClick={() => setToggleDelete(false)}
            className=" cursor-pointer p-1 px-2 hover:bg-neutral-800 border border-outlineWhite rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteFunction()}
            className=" cursor-pointer p-1 px-2 bg-white border border-white text-black hover:bg-neutral-200 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
