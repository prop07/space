import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store";
import Toast from "./components/notifications/Toast.jsx";
import { CloudStatusProvider } from "./context/CloudStatusProvider.jsx";
import SpaceDetailHandler from "./context/SpaceDetailHandler.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CloudStatusProvider>
      <Provider store={store}>
        <SpaceDetailHandler />
        <Toast />
        <App />
      </Provider>
    </CloudStatusProvider>
  </StrictMode>
);
