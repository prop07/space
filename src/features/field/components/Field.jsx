import { FieldList } from "./../index";

export const Field = ({ spaceId, spaceDetail, setActiveFieldInfo }) => {
  if (!spaceDetail?.data?.length) {
    return <p>No fields available</p>;
  }

  return (
    <FieldList
      spaceId={spaceId}
      spaceDetail={spaceDetail}
      setActiveFieldInfo={setActiveFieldInfo}
    />
  );
};
