import { createBrowserRouter, RouterProvider } from "react-router";
import NotFound from "./NotFound";
import Home from "./pages/Home";
import Space from "./pages/Space";
import Layout from "./layouts/Layout";
import Test from "./trash/Test";
import View from "./pages/View";

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
        path: "/space",
        element: <Space />,
        handle: { title: "Space" },
      },
      {
        path: "/view",
        element: <View />,
        handle: { title: "view" },
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
