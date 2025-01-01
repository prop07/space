import React from "react";
import useHttp from "../useHttp";

const useCreateSpace = () => {
  const { data, loading, error, fetchData } = useHttp("/space");
  const createSpace = () => {
    fetchData();
  };

  return { data, loading, error, createSpace };
};

export default useCreateSpace;
