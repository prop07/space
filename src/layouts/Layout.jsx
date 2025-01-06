import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="bg-neutral-900 text-white min-h-[100vh] flex flex-col overflow-hidden">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
