import { useSearchParams, Link } from "react-router";
import useHttp from "../hooks/useHttp";
import { useEffect, useState } from "react";
import { Field } from "../features/field";
import Modal from "../components/models/Modal";
import Button from "../components/ui/button/Button";
import { TbFolderExclamation } from "react-icons/tb";

const View = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [toggleDetailModal, setToggleDetailModal] = useState(false);
  const [activeFieldInfo, setActiveFieldInfo] = useState();

  const { data, status, message, fetchData } = useHttp("/view", "POST");

  useEffect(() => {
    if (type && id) {
      fetchData({
        type: type,
        view_code: id,
      });
    }
  }, [type, id]);

  useEffect(() => {
    if (activeFieldInfo) {
      setToggleDetailModal(true);
    }
  }, [activeFieldInfo]);

  const closeDetailModal = () => {
    setToggleDetailModal(false);
    setTimeout(() => {
      setActiveFieldInfo(null);
    }, 100);
  };

  if (status === "error") {
    return (
      <div className="flex-1 flex overflow-hidden">
        <div className="grid place-items-center w-screen">
          <div className="flex flex-col text-center">
            <p>{message}</p>
            <Link className="underline" to={"/"}>
              home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (data?.fields.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center h-full w-full">
        <div className="text-center grid place-items-center">
          <TbFolderExclamation className=" h-10 w-10 sm:h-20 sm:w-20" />
          <p>No fields available.</p>
        </div>
      </div>
    );
  }

  if (data?.fields?.length) {
    return (
      <div className="flex-1 flex overflow-hidden mt-12">
        <div className="grid  w-screen">
          <div className=" p-2">
            <Field
              spaceId={id}
              spaceDetail={{ data: data.fields }}
              setActiveFieldInfo={setActiveFieldInfo}
            />
            <DetailFieldInfo
              toggleDetailModal={toggleDetailModal}
              activeFieldInfo={activeFieldInfo}
              onClose={closeDetailModal}
            />
          </div>
        </div>
      </div>
    );
  }

  return <div className="flex-1 flex overflow-hidden mt-12"></div>;
};

export default View;

const DetailFieldInfo = ({ activeFieldInfo, onClose, toggleDetailModal }) => {
  return (
    <Modal isOpen={toggleDetailModal} onClose={() => onClose()}>
      <div className=" min-w-[250px]">
        <div className=" space-y-4">
          <p className=" text-lg font-semibold w-full">
            {activeFieldInfo?.title || ""}
          </p>
          <div
            className="max-h-[400px] sm:max-h-[600px] overflow-y-scroll"
            dangerouslySetInnerHTML={{ __html: activeFieldInfo?.content || "" }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs">
            Edited: {activeFieldInfo?.last_modified || ""}
          </p>
          <Button onClick={() => onClose()} placeHolder={"Close"}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
