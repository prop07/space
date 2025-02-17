import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import TopLoadingBar from "../components/TopLoadingBar";

const Layout = () => {
  return (
    <div className=" bg-secondary text-text min-h-[100vh] flex flex-col overflow-hidden">
      <TopLoadingBar />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
