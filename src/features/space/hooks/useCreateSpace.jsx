import useHttp from "@/hooks/useHttp";

export const useCreateSpace = () => {
  const { data, status, message, fetchData } = useHttp("/space");
  const createSpace = () => {
    fetchData();
  };

  return { data, status, message, createSpace };
};

