import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "./NotFound";
import Home from "./pages/Home";
import Space from "./pages/Space";
import Layout from "./layouts/Layout";
import Test from "./trash/Test";

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
        path: "/test",
        element: <Test />,
        handle: { title: "test page" },
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />;
};
export default Router;
