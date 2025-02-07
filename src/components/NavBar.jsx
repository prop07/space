import { Link } from "react-router";

const NavBar = () => {
  return (
    <div className=" fixed bg-primary w-full">
      <div className="flex  justify-between items-center p-2">
        <div className="px-2 font-semibold tracking-widest">
          <Link to={"/"}>Space</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
