const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("API URL is not defined. Check your environment variables.");
}

export const fetchSpaceDetail = async (id) => {
  const response = await fetch(`${apiUrl}/space/${id}`);
  const data = await response.json();

  if (!response.ok || data.status === "error") {
    throw new Error(data.message || "Failed to fetch space data");
  }

  return data;
};
