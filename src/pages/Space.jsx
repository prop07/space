import Card from "../components/Card";
import TextForm from "../components/TextForm";
import { useDispatch, useSelector } from "react-redux";
import { getSpaceDetail } from "../features/spaceSlice";
import { deleteField } from "../features/fieldSlice";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../components/models/DeleteConfirmationModal";
import FieldModel from "../components/models/FieldModel";
const Space = () => {
  const { spaceId } = useParams();
  const dispatch = useDispatch();
  const spaceDetail = useSelector((state) => state.space);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleFieldModel, setToggleFieldModel] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    dispatch(getSpaceDetail(spaceId));
  }, [spaceId]);

  const deleteFunction = () => {
    console.log("delete me: ", activeField);
    dispatch(
      deleteField({
        id: spaceId,
        fieldData: {
          field_code: activeField.field_code,
        },
      })
    );
    dispatch(getSpaceDetail(spaceId));
    setToggleDelete(false);
  };

  if (spaceDetail.status === "error") {
    return (
      <div className="flex-1 flex overflow-hidden">
        <div className="grid place-items-center w-screen">
          <div className="flex gap-2">
            <p>Invalid space back to</p>
            <Link to={"/"}>
              <button className=" underline">home</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="grid  w-screen">
        <div className=" relative p-2  ">
          <TextForm
            toggleForm={toggleForm}
            spaceId={spaceId}
            setToggleForm={setToggleForm}
          />
          <DeleteConfirmationModal
            className={`${toggleDelete ? "fixed " : "hidden"}`}
            setToggleDelete={setToggleDelete}
            deleteFunction={deleteFunction}
          />
          <FieldModel
            toggleFieldModel={toggleFieldModel}
            activeField={activeField}
            setToggleFieldModel={setToggleFieldModel}
            className={`${toggleFieldModel ? "fixed " : "hidden"}`}
          />
          {spaceDetail.status === "idle" || spaceDetail.status === "pending" ? (
            <LoadingAnimations />
          ) : (
            <Fields
              spaceDetail={spaceDetail}
              setActiveField={setActiveField}
              setToggleForm={setToggleForm}
              setToggleDelete={setToggleDelete}
              setToggleFieldModel={setToggleFieldModel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Space;

const LoadingAnimations = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Loading key={index} />
      ))}
    </div>
  );
};

const Loading = () => {
  return (
    <div className=" animate-pulse p-4 space-y-2 rounded-md border border-outlineWhite  ">
      <div className="flex justify-between items-start  ">
        <div className="h-4 w-20  bg-neutral-100 rounded-md  "></div>
        <div className="h-6 w-6  bg-neutral-100 rounded-md  "></div>
      </div>
      <div className="max-h-96 overflow-y-scroll space-y-1 ">
        <div className="h-2 w-32  bg-neutral-100 rounded-md  "></div>
        <div className="h-2 w-32  bg-neutral-100 rounded-md  "></div>
      </div>
      <div className="flex justify-end">
        <div className="h-2 w-24  bg-neutral-100 rounded-md   "></div>
      </div>
    </div>
  );
};

const Fields = ({
  spaceDetail,
  setActiveField,
  setToggleForm,
  setToggleDelete,
  setToggleFieldModel,
}) => {
  const activeDelete = (details) => {
    setActiveField(details);
    setToggleDelete(true);
  };

  const activeFieldModel = (details) => {
    setToggleForm(false);
    setActiveField(details);
    setToggleFieldModel(true);
  };

  if (!spaceDetail?.data?.length) {
    return <p>No fields available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {spaceDetail.data.map((item) => (
        <Card
          key={item.field_code}
          details={item}
          activeDelete={activeDelete}
          activeFieldModel={activeFieldModel}
        />
      ))}
    </div>
  );
};
