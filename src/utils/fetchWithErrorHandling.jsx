const fetchWithErrorHandling = async (url, options, rejectWithValue) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      if (!response.ok || data.status === "error") {
        return rejectWithValue(data.message || "Operation failed");
      }
      return data;
    } catch (error) {
      return rejectWithValue({
        status: "error",
        message: error.message || "Unknown error occurred",
      });
    }
  };
  
  export default fetchWithErrorHandling;
  