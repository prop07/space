import { Link, useLocation } from "react-router";
import { SpaceNavMenu } from "../features/space";

const NavBar = () => {
  const path = useLocation();
  return (
    <div className=" fixed bg-primary w-full">
      <div className="flex  justify-between items-center p-2">
        <div className="px-2 font-semibold tracking-widest">
          <Link to={"/"}>Space</Link>
        </div>
        {path.pathname.includes("/space") ? <SpaceNavMenu /> : null}
      </div>
    </div>
  );
};

export default NavBar;
