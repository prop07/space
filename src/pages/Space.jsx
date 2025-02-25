import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { errorToast } from "@/components/notifications/Toast";
import { Field, FieldAddForm, DetailedFieldInfo } from "@/features/field";
import { getSpaceDetail, updateSpaceCode } from "@/features/space";

const Space = () => {
  const [searchParams] = useSearchParams();
  const spaceId = searchParams.get("id");
  const dispatch = useDispatch();
  const spaceDetail = useSelector((state) => state.space);
  const fieldData = useSelector((state) => state.field);
  const [activeFieldInfo, setActiveFieldInfo] = useState(null);

  useEffect(() => {
    dispatch(updateSpaceCode(spaceId));
    dispatch(getSpaceDetail(spaceId));
  }, []);

  useEffect(() => {
    if (fieldData.status === "error") {
      errorToast(fieldData.message);
    }
  }, [fieldData]);

  if (spaceDetail.status === "error") {
    return (
      <div className="flex-1 flex overflow-hidden">
        <div className="grid place-items-center w-screen">
          <div className="flex flex-col text-center">
            <p>{spaceDetail.message}</p>
            <Link className="underline" to={"/"}>
              home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden mt-12">
      <div className="grid  w-screen">
        <div className=" p-2  ">
          <FieldAddForm spaceId={spaceId} />
          <Field
            spaceId={spaceId}
            spaceDetail={spaceDetail}
            setActiveFieldInfo={setActiveFieldInfo}
          />
          <DetailedFieldInfo
            spaceId={spaceId}
            activeFieldInfo={activeFieldInfo}
            setActiveFieldInfo={setActiveFieldInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Space;
