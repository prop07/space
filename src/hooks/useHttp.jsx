import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const useHttp = (path, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (method === "POST" && body) {
        options.body = JSON.stringify(body);
      }
      const response = await fetch(apiUrl + path, options);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useHttp;
