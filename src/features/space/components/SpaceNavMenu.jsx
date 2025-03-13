import { IoShareSocialSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import Clipboard from "../../../components/ui/Clipboard";
import { useState } from "react";
import ShareSpace from "./ShareSpace";
import Button from "../../../components/ui/button/Button";

export const SpaceNavMenu = () => {
  const spaceDetails = useSelector((state) => state.space);

  // console.log(JSON.stringify(spaceDetails, null, 2));

  const shortenSpaceID = (id) => {
    return `${id.slice(0, 3)}...${id.slice(-4)}`;
  };

  if (spaceDetails.status != "error" && spaceDetails.last_fetch != null) {
    return (
      <div>
        <div className=" flex gap-2 items-center">
          <div className=" flex gap-2 border border-default-border rounded-md py-1 px-2">
            <Clipboard text={spaceDetails.space_code}>
              <span className="text-sm">
                {spaceDetails.space_code
                  ? shortenSpaceID(spaceDetails.space_code)
                  : null}
              </span>
            </Clipboard>
          </div>
          <ShareSpace spaceDetails={spaceDetails} />
        </div>
      </div>
    );
  }

  return null;
};
