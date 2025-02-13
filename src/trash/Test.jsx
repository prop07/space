import { useState } from "react";
import Modal from "../components/models/Modal";

const Test = () => {
  const [toggleModal, setToggleModal] = useState(false);
  return (
    <div className="py-10 ">
      <Modal isOpen={toggleModal} onClose={() => setToggleModal(false)}>
        Hello
      </Modal>
      <button onClick={() => setToggleModal(true)}>Open Modal</button>
    </div>
  );
};

export default Test;
