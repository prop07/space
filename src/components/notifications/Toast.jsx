import React from "react";
import toast, { Toaster } from "react-hot-toast";

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
