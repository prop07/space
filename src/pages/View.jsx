import { useSearchParams, Link } from "react-router";
import useHttp from "../hooks/useHttp";
import { useEffect, useState } from "react";
import { Field } from "../features/field";
import Modal from "../components/models/Modal";
import Button from "../components/ui/button/Button";

const View = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [activeFieldInfo, setActiveFieldInfo] = useState();

  const { data, status, message, fetchData } = useHttp("/space/" + id);

  useEffect(() => {
    fetchData();
  }, []);

  if (status === "error") {
    return (
      <div className="flex-1 flex overflow-hidden">
        <div className="grid place-items-center w-screen">
          <div className="flex flex-col text-center">
            <p>{message}</p>
            <Link to={"/"}>
              <button className=" underline">home</button>
            </Link>
          </div>
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
              activeFieldInfo={activeFieldInfo}
              onClose={() => setActiveFieldInfo(null)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden mt-12">
      <div className="grid  w-screen">
        <div className=" p-2">
          <h1>
            Viewing {type} with ID: {id}
          </h1>
          {JSON.stringify(data, null, 2)}
        </div>{" "}
      </div>
    </div>
  );
};

export default View;

const DetailFieldInfo = ({ activeFieldInfo, onClose }) => {
  return (
    <Modal isOpen={!!activeFieldInfo} onClose={() => onClose()}>
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
