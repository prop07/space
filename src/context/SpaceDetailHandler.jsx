import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCloudStatus } from "@/context/CloudStatusProvider";

const SpaceDetailHandler = () => {
  const { setCloudStatus } = useCloudStatus();
  const fieldData = useSelector((state) => state.field);

  useEffect(() => {
    setCloudStatus("idle");
  }, [fieldData]);

  return null;
};

export default SpaceDetailHandler;
