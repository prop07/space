import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { useEffect } from "react";
import { showErrorToast } from "../components/notifications/Toast";
import { getSpaceDetail, updateSpaceCode } from "../features/spaceSlice";
import FieldList from "../components/FieldList";
import FieldAddForm from "../components/ui/Forms/FieldAddForm";

const Space = () => {
  const { spaceId } = useParams();
  const dispatch = useDispatch();
  const spaceDetail = useSelector((state) => state.space);
  const fieldData = useSelector((state) => state.field);

  useEffect(() => {
    dispatch(updateSpaceCode(spaceId));
    dispatch(getSpaceDetail(spaceId));
  }, []);

  useEffect(() => {
    if (fieldData.status === "error") {
      showErrorToast(fieldData.message);
    }
  }, [fieldData]);

  if (spaceDetail.status === "error") {
    return (
      <div className="flex-1 flex overflow-hidden">
        <div className="grid place-items-center w-screen">
          <div className="flex flex-col text-center">
            <p>{spaceDetail.message}</p>
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
          <FieldAddForm spaceId={spaceId} />
          <Fields spaceId={spaceId} spaceDetail={spaceDetail} />
        </div>
      </div>
    </div>
  );
};

export default Space;

const Fields = ({ spaceId, spaceDetail }) => {
  if (!spaceDetail?.data?.length) {
    return <p>No fields available</p>;
  }

  return <FieldList spaceId={spaceId} spaceDetail={spaceDetail} />;
};
