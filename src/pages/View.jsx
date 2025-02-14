import { useSearchParams, Link } from "react-router";
import useHttp from "../hooks/useHttp";
import { useEffect, useState } from "react";
import { Field } from "../features/field";
import Modal from "../components/models/Modal";

const View = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [activeFieldInfo, setActiveFieldInfo] = useState();

  const { data, status, message, fetchData } = useHttp("/space/" + id);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(activeFieldInfo);
  }, [activeFieldInfo]);

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
            <h1>
              Viewing {type} with ID: {id}
            </h1>
            {JSON.stringify(data, null, 2)}
            <Field
              spaceId={id}
              spaceDetail={{ data: data.fields }}
              setActiveFieldInfo={setActiveFieldInfo}
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
        </div>
      </div>
    </div>
  );
};

export default View;

const detailFieldInfo = () => {
  return (
    <Modal
      isOpen={activeFieldInfo ? true : false}
      onClose={() => handleClose()}
    >
      <div className=" space-y-4">
        <input
          ref={inputHeadingRef}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, title: e.target.value }));
          }}
          className="bg-transparent break-words text-lg font-semibold w-full focus:outline-none"
          type="text"
          value={formData.title || ""}
          placeholder="Heading"
          id="inputTitle"
        />
        <CustomEditor
          editorName={"infoFormEditor"}
          value={formData.content}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, content: value }));
          }}
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-xs">Edited: {last_modified}</p>
        <Button onClick={handleClose} placeHolder={"Close"}>
          Close
        </Button>
      </div>
    </Modal>
  );
};
