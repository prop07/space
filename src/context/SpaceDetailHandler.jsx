import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCloudStatus } from "@/context/CloudStatusProvider";

const SpaceDetailHandler = () => {
  const { cloudStatus, setCloudStatus } = useCloudStatus();
  const fieldData = useSelector((state) => state.field);

  useEffect(() => {
    // if (fieldData.status === "success") {
    setCloudStatus("idle");
    // }
  }, [fieldData]);

  return null;
};

export default SpaceDetailHandler;
