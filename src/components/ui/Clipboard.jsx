import { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";

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
        <FaCheck className=" text-green-500" size={18} />
      ) : (
        <LuCopy size={18} />
      )}
    </div>
  );
};

export default Clipboard;
