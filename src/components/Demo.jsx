import { useState } from "react";
import Modal from "./models/Modal";

const Demo = () => {
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

export default Demo;
