import useHttp from "../useHttp";
import { useState, useEffect, useRef } from "react";

const useFindSpace = (space_code) => {
  const { data, loading, error, fetchData } = useHttp("/space", "POST", {
    space_code: space_code,
  });

  const [localData, setLocalData] = useState(data);
  const [localError, setLocalError] = useState(error);

  const timeoutRef = useRef(null);

  const findSpace = () => {
    // Clear any existing timeout
    clearTimeout(timeoutRef.current);

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      fetchData();
    }, 1000);
  };

  const reset = () => {
    clearTimeout(timeoutRef.current);
    setLocalData(null);
    setLocalError(null);
  };

  // Sync the local state with the data and error from `useHttp`
  useEffect(() => {
    setLocalData(data);
    setLocalError(error);
  }, [data, error]);

  return { data: localData, loading, error: localError, findSpace, reset };
};

export default useFindSpace;
