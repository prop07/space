import { FieldList } from "./../index";
import { TbFolderExclamation } from "react-icons/tb";

export const Field = ({ spaceId, spaceDetail, setActiveFieldInfo }) => {
  if (!spaceDetail?.data?.length) {
    return (
      <div className="flex-1 flex justify-center items-center h-full w-full">
        <div className="text-center grid place-items-center">
          <TbFolderExclamation className=" h-10 w-10 sm:h-20 sm:w-20" />
          <p>No fields available.</p>
        </div>
      </div>
    );
  }

  return (
    <FieldList
      spaceId={spaceId}
      spaceDetail={spaceDetail}
      setActiveFieldInfo={setActiveFieldInfo}
    />
  );
};
