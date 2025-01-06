import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "./NotFound";
import Home from "./pages/Home";
import Space from "./pages/Space";
import Demo from "./components/Demo";
import Layout from "./layouts/Layout";

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Layout />,
    children: [
      {
        index: true, //base page
        element: <Home />,
        handle: { title: "Home" },
      },
      {
        path: "/space/:spaceId",
        element: <Space />,
        handle: { title: "Space" },
      },
      {
        path: "/demo",
        element: <Demo />,
        handle: { title: "demo" },
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />;
};
export default Router;
