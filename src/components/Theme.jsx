import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import Button from "./ui/button/Button";

const Theme = () => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  return (
    <Button
      onClick={toggleTheme}
      icon={
        theme === "dark" ? (
          <IoMoonOutline size={18} />
        ) : (
          <MdOutlineWbSunny size={18} />
        )
      }
    />
  );
};

export default Theme;
