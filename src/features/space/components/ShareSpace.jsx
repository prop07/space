import { useState } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import Modal from "../../../components/models/Modal";

const ShareSpace = () => {
  const [toggleShare, setToggleShare] = useState(false);

  return (
    <div>
      <IoShareSocialSharp
        className="cursor-pointer"
        onClick={() => setToggleShare(true)}
        size={18}
      />

      <Modal isOpen={toggleShare} onClose={() => setToggleShare(false)}>
        <p>hello</p>
        <button onClick={() => setToggleShare(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default ShareSpace;
