import useHttp from "@/hooks/useHttp";

import { useRef, useEffect } from "react";
import { KEY_DEBOUNCE_DELAY } from "../../../Constantes";

export const useFindSpace = (space_code) => {
  const { data, status, message, setStatus, fetchData } = useHttp(
    "/space",
    "POST",
    {
      space_code: space_code,
    }
  );

  const timeoutRef = useRef(null);

  const findSpace = () => {
    setStatus("pending");
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fetchData();
    }, KEY_DEBOUNCE_DELAY);
  };

  const reset = () => {
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return {
    data: data,
    status: status,
    message: message,
    findSpace,
    reset,
  };
};
