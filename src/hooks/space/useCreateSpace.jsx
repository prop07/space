import useHttp from "../useHttp";

const useCreateSpace = () => {
  const { data, status, message, fetchData } = useHttp("/space");
  const createSpace = () => {
    fetchData();
  };

  return { data, status, message, createSpace };
};

export default useCreateSpace;
