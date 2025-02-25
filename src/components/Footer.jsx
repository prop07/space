import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="py-2 flex justify-center">
      <Link to="https://github.com/prop07" target="_blank">
        <FaGithub className="text-button" size={25} />
      </Link>
    </div>
  );
};

export default Footer;
