import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, Link } from "react-router";
import { successToast, errorToast } from "@/components/notifications/Toast";
import { useCreateSpace, useFindSpace } from "@/features/space";
import { Toolip } from "@/components/ui/Toolip";
import Button from "../components/ui/button/Button";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const createspace = useCreateSpace();
  const { data, status, message, findSpace } = useFindSpace(searchQuery);

  useEffect(() => {
    if (createspace.data && createspace.status === "success") {
      successToast(createspace.message);
      navigate(`/space?id=${createspace.data.space_code}`);
    } else if (createspace.status === "error") {
      errorToast(createspace.message);
    }
  }, [createspace.data]);

  useEffect(() => {
    if (searchQuery) {
      findSpace();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (data && status === "success") {
      successToast(message);
    } else if (status === "error") {
      errorToast(message);
    }
  }, [data, status]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && data?.space_code) {
      navigate(`/space?id=${data.space_code}`);
    }
  };

  const generateSpace = () => {
    if (createspace.status !== "pending") {
      createspace.createSpace();
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="grid place-items-center w-screen">
        <div className="space-y-2">
          <h1 className=" text-center font-bold pb-8 px-2 text-4xl tracking-normal  placeholder:text-primary ">
            Help You Find Space?
          </h1>
          <div className=" w-[90vw] max-w-lg mx-auto rounded-xl bg-primary border border-default-border">
            <input
              onChange={(e) => setSearchQuery(e.target.value.trim())}
              onKeyDown={handleKeyDown}
              className=" bg-transparent font-semibold pb-2 pt-3 px-3 w-full  focus:outline-hidden"
              type="text"
              placeholder="Enter space code !"
              id="inputField"
              autoFocus
            />
            <label htmlFor="inputField">
              <div className=" cursor-text flex justify-between px-3 py-3">
                <Button
                  placeHolder={"Create Space"}
                  icon={<FaPlus className="text-text" size={13} />}
                  onClick={generateSpace}
                  className={"border border-default-border"}
                />
                <span className="h-10 w-10 flex justify-center items-center">
                  {searchQuery && status === "pending" ? (
                    <CgSpinner className="animate-spin" size={21} />
                  ) : searchQuery && status === "success" ? (
                    <Link to={`space?id=${data.space_code}`}>
                      <button className="text-sm font-semibold  py-2 px-2 rounded-md  bg-neutral-800 text-white dark:bg-neutral-100 dark:text-black cursor-pointer">
                        <FaArrowUp className="rotate-90" />
                      </button>
                    </Link>
                  ) : (
                    <Toolip title={"Enter valid code"}>
                      <button className="text-sm font-semibold  py-2 px-2 rounded-md bg-neutral-200 dark:bg-neutral-600 text-text cursor-default-border">
                        <FaArrowUp className="rotate-90 text-neutral-400" />
                      </button>
                    </Toolip>
                  )}
                </span>
              </div>
            </label>
          </div>
          <div className="flex justify-center">
            <button className="rounded-full text-sm border py-1 px-2 flex items-center gap-1 border-default-border hover:bg-default-hover ">
              Quick Guide
              <FaArrowUp size={10} className="rotate-45 text-text" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
