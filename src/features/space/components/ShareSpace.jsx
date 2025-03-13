import { useState } from "react";
import { IoShareOutline, IoClose } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import Modal from "../../../components/models/Modal";
import Button, { ToggleButton } from "../../../components/ui/button/Button";
import Clipboard from "../../../components/ui/Clipboard";

const ShareSpace = ({ spaceDetails }) => {
  const [toggleShare, setToggleShare] = useState(false);
  const [activeLink, setActiveLink] = useState("viewer");

  return (
    <div>
      <Button
        onClick={() => setToggleShare(true)}
        icon={<IoShareOutline size={20} />}
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
              <ToggleButton
                onClick={() => {
                  setActiveLink("viewer");
                }}
                active={activeLink === "viewer" ? true : false}
                placeHolder={"Viewer Link"}
              />
              <ToggleButton
                onClick={() => {
                  setActiveLink("admin");
                }}
                active={activeLink === "admin" ? true : false}
                placeHolder={"Admin Link"}
              />
            </div>
            <div className=" space-y-2">
              <p className=" text-sm font-semibold">Selected Link</p>
              <div className=" flex justify-between items-center gap-2 border border-default-border rounded-md p-2">
                <p className="max-w-[280px] sm:min-w-[500px] truncate">
                  {activeLink === "viewer" ? (
                    <span>
                      {window.location.origin +
                        "/view?type=space&id=" +
                        spaceDetails.view_code}
                    </span>
                  ) : (
                    <span>
                      {window.location.origin +
                        "/space?id=" +
                        spaceDetails.space_code}
                    </span>
                  )}
                </p>
                <Clipboard
                  text={
                    activeLink === "viewer"
                      ? window.location.origin +
                        "/view?type=space&id=" +
                        spaceDetails.view_code
                      : window.location.origin +
                        "/space?id=" +
                        spaceDetails.space_code
                  }
                />
              </div>
            </div>
            <div className=" p-2">
              {activeLink === "viewer" ? (
                <div className="text-sm text-yellow-600 flex items-center gap-1">
                  <GoAlertFill size={18} /> Viewer link allows read-only access
                  to the space.
                </div>
              ) : (
                <div className="text-sm text-red-600 flex items-center gap-2">
                  <GoAlertFill size={18} />
                  Admin link provides full access to manage the space.
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShareSpace;
