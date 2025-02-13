import { useState } from "react";
import { LuClipboardCheck, LuClipboardList } from "react-icons/lu";

const Clipboard = ({ text, children }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div onClick={handleClick} className="flex gap-2 cursor-pointer">
      {children}
      {copied ? (
        <LuClipboardCheck className=" text-green-500" size={18} />
      ) : (
        <LuClipboardList size={18} />
      )}
    </div>
  );
};

export default Clipboard;
