import React, { useEffect } from "react";
import useHttp from "../useHttp";
import { updateSpaceCode } from "../../features/spaceSlice";
import { useDispatch } from "react-redux";

const useCreateSpace = () => {
  const dispatch = useDispatch();
  const { data, loading, error, fetchData } = useHttp("/space");
  const createSpace = () => {
    fetchData();
  };

  useEffect(() => {
    if (data) {
      dispatch(updateSpaceCode(data.space_code));
    }
  }, [data]);

  return { data, loading, error, createSpace };
};

export default useCreateSpace;
