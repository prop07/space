import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField, resetField, updateField } from "../features/fieldSlice";
import { useCloudStatus } from "../context/CloudStatusProvider";
import { getSpaceDetail } from "../features/spaceSlice";

const TextForm = ({ spaceId, toggleForm, setToggleForm }) => {
  const { cloudStatus, setCloudStatus } = useCloudStatus();
  const fieldData = useSelector((state) => state.field);

  const [data, setData] = useState({ title: "", content: "" });
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const timeout = useRef(null);

  useEffect(() => {
    setCloudStatus("idle");
  }, [fieldData]);

  useEffect(() => {
    if (toggleForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleForm]);

  useEffect(() => {
    const addValue = () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      if (fieldData.data && data.title && data.content) {
        setCloudStatus("pending");
        timeout.current = setTimeout(() => {
          dispatch(
            updateField({
              id: spaceId,
              fieldData: {
                ...data,
                field_code: fieldData.data.field.field_code,
              },
            })
          );
          timeout.current = null;
        }, 500);
      } else if (data.title && data.content) {
        setCloudStatus("pending");
        timeout.current = setTimeout(() => {
          dispatch(addField({ id: spaceId, fieldData: data }));
          timeout.current = null;
        }, 500);
      }
    };

    addValue();
  }, [data.title, data.content]);

  const closeForm = () => {
    setToggleForm(false);
    dispatch(resetField());
    setData((prev) => ({ ...prev, title: "", content: "" }));
  };

  return (
    <div className=" mb-8">
      <button
        onClick={() => setToggleForm(true)}
        className={`${
          toggleForm ? "hidden" : "block"
        } border border-outlineWhite font-semibold p-2 rounded-md w-full text-start cursor-text`}
      >
        List anything...
      </button>
      <div className={`${!toggleForm ? "hidden" : "block"} `}>
        <div className=" border border-outlineWhite rounded-md p-2">
          <input
            ref={inputRef}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="bg-transparent w-full focus:outline-none"
            type="text"
            value={data.title}
            placeholder="Heading"
            id="inputTitle"
          />
          <label className=" cursor-text" htmlFor="inputContent">
            <textarea
              onChange={(e) =>
                setData((prev) => ({ ...prev, content: e.target.value }))
              }
              className=" mt-2 bg-transparent resize-none text-sm placeholder:text-sm w-full focus:outline-none"
              type="text"
              value={data.content}
              placeholder="Body..."
              id="inputContent"
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto"; // Reset height to auto to calculate the new scrollHeight
                const maxHeight = 400;
                e.target.style.height = `${Math.min(
                  e.target.scrollHeight,
                  maxHeight
                )}px`;
                e.target.style.overflowY =
                  e.target.scrollHeight > maxHeight ? "scroll" : "hidden"; // Enable scrolling if content exceeds maxHeight
              }}
            />
            <div className="flex justify-end">
              <button
                onClick={closeForm}
                className=" font-semibold cursor-pointer px-3 py-1 hover:bg-neutral-800 rounded-md "
              >
                Close
              </button>
            </div>
          </label>
        </div>
      </div>
      {/* <button
        className="border border-neutral-200 p-2 rounded-md mt-2"
        onClick={addValue}
      >
        Add Field
      </button> */}
    </div>
  );
};

export default TextForm;
