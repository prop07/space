import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, Link } from "react-router";
import { successToast, errorToast } from "@/components/notifications/Toast";
import { useCreateSpace, useFindSpace } from "@/features/space";
import useScreenWidth from "@/hooks/useScreenWidth";
import { Toolip } from "@/components/ui/Toolip";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const createspace = useCreateSpace();
  const { data, status, message, findSpace } = useFindSpace(searchQuery);
  const width = useScreenWidth();

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
          <h1 className=" text-center font-bold pb-8 px-2 text-4xl tracking-normal">
            Help You Find Space?
          </h1>
          <div className=" flex justify-center">
            <div
              style={{ width: `${width - 18}px` }}
              className=" max-w-[600px] "
            >
              <input
                onChange={(e) => setSearchQuery(e.target.value.trim())}
                onKeyDown={handleKeyDown}
                className="bg-secondary pb-2 pt-3 px-3 w-full rounded-t-md focus:outline-none border-t border-x border-outlineWhite"
                type="text"
                placeholder="Enter space code !"
                id="inputField"
                autoFocus
              />
              <label htmlFor="inputField">
                <div className="bg-secondary cursor-text flex justify-between  rounded-b-md px-3 py-3 border-b border-x border-outlineWhite">
                  <button
                    onClick={generateSpace}
                    className="bg-secondary text-sm flex items-center gap-2  font-semibold text-neutral-300 cursor-pointer hover:bg-neutral-700 border py-1 px-2 rounded-md border-outlineWhite "
                  >
                    Create Space <FaPlus className="text-white" size={13} />
                  </button>
                  <span className="h-10 w-10 flex justify-center items-center">
                    {searchQuery && status === "pending" ? (
                      <CgSpinner
                        className="animate-spin text-white"
                        size={21}
                      />
                    ) : searchQuery && status === "success" ? (
                      <Link to={`space?id=${data.space_code}`}>
                        <button className="text-sm font-semibold border py-2 px-2 rounded-md bg-neutral-100 border-neutral-100 text-black cursor-pointer">
                          <FaArrowUp className="rotate-90" />
                        </button>
                      </Link>
                    ) : (
                      <Toolip title={"Enter valid code"}>
                        <button className="text-sm font-semibold border py-2 px-2 rounded-md bg-neutral-700 border-neutral-700 text-secondary cursor-default">
                          <FaArrowUp className="rotate-90" />
                        </button>
                      </Toolip>
                    )}
                  </span>
                </div>
              </label>
            </div>
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
