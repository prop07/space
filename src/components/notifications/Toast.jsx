import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { IoMdInformationCircle } from "react-icons/io";

const Toast = () => {
  const style = {
    background: "#ffffff",
    color: "#262626",
  };

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: style,
      }}
    />
  );
};

export default Toast;

// Utility functions for triggering toasts
export const successToast = (message) => {
  toast.success(message);
};

export const errorToast = (message) => {
  toast.error(message);
};

export const infoToast = (message) => {
  return toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`flex items-center gap-2 p-3 rounded-md text-black bg-white shadow-xl ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <IoMdInformationCircle className="text-blue-500" size={21} />
        <div>
          <p className="text-sm font-semibold">{message}</p>
        </div>
      </motion.div>
    ),
    { duration: 500 }
  );
};

export const loadingToast = () => {
  return toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`flex items-center gap-2 p-3 rounded-md text-black bg-white shadow-xl  ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <CgSpinner className="animate-spin " size={21} />
        <div>
          <p className="text-xs font-semibold">Please Wait</p>
          <p className="text-xs">Previous action is pending</p>
        </div>
      </motion.div>
    ),
    { duration: 500 }
  );
};
