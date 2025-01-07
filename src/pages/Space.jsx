import { useDispatch, useSelector } from "react-redux";
import { deleteField } from "../features/fieldSlice";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { showErrorToast } from "../components/notifications/Toast";
import DeleteConfirmationModal from "../components/models/DeleteConfirmationModal";
import FieldModel from "../components/models/FieldModel";
import { getSpaceDetail, updateSpaceCode } from "../features/spaceSlice";
import FieldList from "../components/FieldList";
import FieldAddForm from "../components/ui/Forms/FieldAddForm";

const Space = () => {
  const { spaceId } = useParams();
  const dispatch = useDispatch();
  const spaceDetail = useSelector((state) => state.space);
  const fieldData = useSelector((state) => state.field);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleFieldModel, setToggleFieldModel] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    dispatch(updateSpaceCode(spaceId));
    dispatch(getSpaceDetail(spaceId));
  }, []);

  useEffect(() => {
    if (fieldData.status === "error") {
      showErrorToast(fieldData.message);
    }
  }, [fieldData]);

  console.log(JSON.stringify("space data: ", spaceDetail, null, 2));

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
    setToggleForm(false);
    setFormData((prev) => ({ ...prev, title: "", content: "" }));
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
          <FieldAddForm
            formData={formData}
            setFormData={setFormData}
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
    <div className=" space-y-4 mt-2">
      <div className="p-4 space-y-2 rounded-md border  border-outlineWhite animate-pulse">
        <div className="flex justify-between items-start">
          <div className="h-4 bg-gray-600 rounded w-3/12"></div>
          <div className="h-6 w-6 bg-gray-600 rounded"></div>
        </div>
        <div className="max-h-24 overflow-y-auto">
          <div className="h-4 bg-gray-600 rounded w-full my-2"></div>
          <div className="h-4 bg-gray-600 rounded w-7/12 my-2"></div>
          <div className="h-4 bg-gray-600 rounded w-10/12 my-2"></div>
        </div>
        <div className=" flex justify-end">
          <div className="h-4 bg-gray-600 rounded w-4/12"></div>
        </div>
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
    <FieldList
      spaceDetail={spaceDetail}
      activeDelete={activeDelete}
      activeFieldModel={activeFieldModel}
    />
  );
};
