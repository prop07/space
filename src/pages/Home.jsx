import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, Link } from "react-router";
import {
  showSuccessToast,
  showErrorToast,
} from "../components/notifications/Toast";
import useCreateSpace from "../hooks/space/useCreateSpace";
import useFindSpace from "../hooks/space/useFindSpace";
import useScreenWidth from "../hooks/useScreenWidth";
import { Toolip } from "../components/ui/Toolip";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const createspace = useCreateSpace();
  const { data, loading, error, findSpace, reset } = useFindSpace(searchQuery);
  const width = useScreenWidth();

  useEffect(() => {
    if (createspace.data && createspace.data.status === "success") {
      showSuccessToast(createspace.data.message);
      navigate(`/space/${createspace.data.space_code}`);
    } else if (createspace.data && createspace.data.status === "error") {
      showErrorToast(createspace.data.message);
    }
  }, [createspace.data]);

  useEffect(() => {
    if (searchQuery) {
      findSpace();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (data && data.status === "success") {
      showSuccessToast(data.message);
    } else if (data && data.status === "error") {
      showErrorToast(data.message);
    }
  }, [data]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && data?.space_code) {
      navigate(`/space/${data.space_code}`);
    }
  };

  const generateSpace = () => {
    if (!createspace.loading) {
      createspace.createSpace();
    }
  };

  const searchSpace = (e) => {
    setSearchQuery(e.target.value.trim());
    reset();
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="grid place-items-center w-screen">
        <div className="space-y-2">
          <h1 className=" text-center font-bold pb-8 px-2 text-4xl tracking-normal">
            Help You Find Space ?
          </h1>
          <div style={{ width: `${width}px` }} className=" max-w-[600px]">
            <input
              onChange={(e) => searchSpace(e)}
              onKeyDown={handleKeyDown}
              className="bg-neutral-800 pb-2 pt-3 px-3 w-full rounded-t-md focus:outline-none border-t border-x border-outlineWhite"
              type="text"
              placeholder="Enter space code !"
              id="inputField"
              autoFocus
            />
            <label htmlFor="inputField">
              <div className="bg-neutral-800 cursor-text flex justify-between  rounded-b-md px-3 py-3 border-b border-x border-outlineWhite">
                <button
                  onClick={generateSpace}
                  className="bg-neutral-800 text-sm flex items-center gap-2  font-semibold text-neutral-300 cursor-pointer hover:bg-neutral-700 border py-1 px-2 rounded-md border-outlineWhite "
                >
                  Create Space <FaPlus className="text-white" size={13} />
                </button>
                <span className="h-10 w-10 flex justify-center items-center">
                  {searchQuery && !data ? (
                    <CgSpinner className="animate-spin text-white" size={21} />
                  ) : data && data.status === "success" ? (
                    <Link to={`space/${data.space_code}`}>
                      <button className="text-sm font-semibold border py-2 px-2 rounded-md bg-neutral-100 border-neutral-100 text-black cursor-pointer">
                        <FaArrowUp className="rotate-90" />
                      </button>
                    </Link>
                  ) : (
                    <Toolip title={"Enter valid code"}>
                      <button className="text-sm font-semibold border py-2 px-2 rounded-md bg-neutral-700 border-neutral-700 text-neutral-800 cursor-default">
                        <FaArrowUp className="rotate-90" />
                      </button>
                    </Toolip>
                  )}
                </span>
              </div>
            </label>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => showSuccessToast("Hello")}
              className="rounded-full text-sm border py-1 px-2 flex items-center gap-1 border-outlineWhite hover:bg-neutral-700 "
            >
              Quick Guide <FaArrowUp size={10} className="rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
