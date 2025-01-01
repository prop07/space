import React from "react";

export const Toolip = ({ children, title }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-center">
        <div className="bg-neutral-900 text-white text-sm rounded px-2 py-1 whitespace-nowrap">
          {title}
        </div>
        <div className="-z-10 w-3 h-3 bg-neutral-900 transform rotate-45 -mt-2"></div>
      </div>
    </div>
  );
};
