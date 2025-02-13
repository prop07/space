import { useState } from "react";
import { IoShareSocialSharp, IoClose } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import Modal from "../../../components/models/Modal";
import Button from "../../../components/ui/button/Button";
import Clipboard from "../../../components/ui/Clipboard";

const ShareSpace = () => {
  const [toggleShare, setToggleShare] = useState(false);
  const [activeLink, setActiveLink] = useState("viewer");

  const links = {
    admin:
      "http://localhost:5173/space/admin/2bed8d58-3bed-47fa-a374-6685c467ee2e",
    viewer:
      "http://localhost:5173/space/viewer/2bed8d58-3bed-47fa-a374-6685c467ee2e",
  };

  return (
    <div>
      <Button
        onClick={() => setToggleShare(true)}
        icon={<IoShareSocialSharp size={18} />}
      />
      <Modal isOpen={toggleShare} onClose={() => setToggleShare(false)}>
        <div className="">
          <div className=" flex justify-between">
            <p className=" text-lg font-semibold">Share Space Link</p>
            <Button
              onClick={() => setToggleShare(false)}
              icon={<IoClose size={20} />}
            />
          </div>
          <p className=" text-sm">Choose a link type to share your space</p>
          <div className=" space-y-4">
            <div className="flex mt-8 gap-2">
              <button
                onClick={() => {
                  setActiveLink("viewer");
                }}
                className={`${
                  activeLink === "viewer"
                    ? "bg-white text-black"
                    : " border border-outlineWhite hover:bg-neutral-800"
                } cursor-pointer py-2 px-2  rounded-md font-semibold `}
              >
                Viewer Link
              </button>
              <button
                onClick={() => {
                  setActiveLink("admin");
                }}
                className={`${
                  activeLink === "admin"
                    ? "bg-white text-black"
                    : " border border-outlineWhite hover:bg-neutral-800"
                } cursor-pointer py-2 px-2  rounded-md font-semibold `}
              >
                Admin Link
              </button>
            </div>
            <div className=" space-y-2">
              <p className=" text-sm font-semibold">Selected Link</p>
              <div className=" flex justify-between items-center gap-2 border border-outlineWhite rounded-md p-1">
                <p className="max-w-[280px] sm:min-w-[500px] truncate">
                  {activeLink === "viewer" ? (
                    <span>{links.viewer}</span>
                  ) : (
                    <span>{links.admin}</span>
                  )}
                </p>
                <Clipboard
                  text={activeLink === "viewer" ? links.viewer : links.admin}
                />
              </div>
            </div>
            {activeLink === "viewer" ? (
              <div className="text-sm text-yellow-500 flex items-center gap-1">
                <GoAlertFill size={18} /> Viewer link allows read-only access to
                the space.
              </div>
            ) : (
              <div className="text-sm text-red-500 flex items-center gap-2">
                <GoAlertFill size={18} />
                Admin link provides full access to manage the space.
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShareSpace;
