import { Link, useLocation } from "react-router";
import { SpaceNavMenu } from "../features/space";

const NavBar = () => {
  const path = useLocation();

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.getAttribute("data-theme") === "dark") {
      htmlElement.removeAttribute("data-theme");
    } else {
      htmlElement.setAttribute("data-theme", "dark");
    }
  };
  return (
    <div className=" fixed bg-black w-full">
      <div className="flex  justify-between items-center p-2 h-[52px]">
        <div className="px-2 font-semibold tracking-widest">
          <Link to={"/"}>Space</Link>
        </div>
        {path.pathname.includes("/space") ? <SpaceNavMenu /> : null}
        <button onClick={toggleTheme}>toogle</button>
      </div>
    </div>
  );
};

export default NavBar;
