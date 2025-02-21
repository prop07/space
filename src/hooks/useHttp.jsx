import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const useHttp = (path, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState(null);

  const fetchData = async (customBody = null) => {
    try {
      setStatus("pending");
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if ((method === "POST" || method === "PUT") && (customBody || body)) {
        options.body = JSON.stringify(customBody || body);
      }
      const response = await fetch(apiUrl + path, options);
      const result = await response.json();
      if (!response.ok || result.status === "error") {
        throw new Error(result.message || "Operation failed");
      }
      setData(result.data);
      setStatus("success");
      setMessage(result.message);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong");
    }
  };

  return { data, status, message, setStatus, fetchData };
};

export default useHttp;
