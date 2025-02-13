import { useState } from "react";
import { IoShareSocialSharp, IoClose } from "react-icons/io5";
import Modal from "../../../components/models/Modal";
import Button from "../../../components/ui/button/Button";

const ShareSpace = () => {
  const [toggleShare, setToggleShare] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setToggleShare(true)}
        icon={<IoShareSocialSharp size={18} />}
      />
      <Modal isOpen={toggleShare} onClose={() => setToggleShare(false)}>
        <div className=" flex justify-between">
          <p className=" text-lg font-semibold">Share public link to space</p>
          <Button
            onClick={() => setToggleShare(false)}
            icon={<IoClose size={20} />}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ShareSpace;
