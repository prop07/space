import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#262626",
          color: "#fff",
        },
      }}
    />
  );
};

export default Toast;

// Utility functions for triggering toasts
export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast(message);
};

export const loadingToast = () => {
  return toast.custom(
    () => (
      <div className="flex items-center gap-2 text-white py-2 px-2 border border-outlineWhite rounded-md bg-primary">
        <CgSpinner className="animate-spin text-white" size={21} />
        <div>
          <p className="text-xs font-semibold">Please Wait</p>
          <p className="text-xs">Previous action is pending</p>
        </div>
      </div>
    ),
    { duration: 500 }
  );
};
