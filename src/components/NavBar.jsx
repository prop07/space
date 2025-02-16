import { Link, useLocation } from "react-router";
import { SpaceNavMenu } from "../features/space";
import Theme from "./Theme";

const NavBar = () => {
  const path = useLocation();

  return (
    <div className=" fixed  w-full">
      <div className="flex  justify-between  p-2 h-[52px]">
        <div className="px-2 font-semibold tracking-widest">
          <Link to={"/"}>Space</Link>
        </div>
        <div className="flex">
          {path.pathname.includes("/space") ? <SpaceNavMenu /> : null}
          <Theme />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
