import React from "react";
import { CgSpinner } from "react-icons/cg";
import { BsCloudCheck } from "react-icons/bs";
import { useCloudStatus } from "../context/CloudStatusProvider";
import { Link, useLocation } from "react-router";

const NavBar = () => {
  const path = useLocation();
  const { cloudStatus } = useCloudStatus();
  return (
    <div className="flex justify-between items-center p-2">
      <div className="px-2 font-semibold tracking-widest">
        <Link to={"/"}>Space</Link>
      </div>
      {path.pathname.includes("/space") ? (
        cloudStatus === "pending" ? (
          <CgSpinner className="animate-spin" size={23} />
        ) : (
          <BsCloudCheck size={23} />
        )
      ) : null}
    </div>
  );
};

export default NavBar;
