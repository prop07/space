import React, { createContext, useState, useContext } from "react";

// Create the context
const CloudStatusContext = createContext();

// Create a provider component
export const CloudStatusProvider = ({ children }) => {
  const [cloudStatus, setCloudStatus] = useState("idle"); // Default status

  return (
    <CloudStatusContext.Provider value={{ cloudStatus, setCloudStatus }}>
      {children}
    </CloudStatusContext.Provider>
  );
};

// Custom hook for easier consumption
export const useCloudStatus = () => {
  return useContext(CloudStatusContext);
};
