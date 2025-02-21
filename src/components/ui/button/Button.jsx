const Button = ({ onClick, icon, placeHolder, className }) => {
  return (
    <button
      className={`${className}  flex items-center gap-1 cursor-pointer p-2 rounded-md hover:bg-default-hover`}
      onClick={onClick}
    >
      {placeHolder && (
        <span className=" font-semibold tracking-wider">{placeHolder}</span>
      )}
      {icon}
    </button>
  );
};

export default Button;

export const ToggleButton = ({
  onClick,
  icon,
  placeHolder,
  active,
  className,
}) => {
  return (
    <button
      className={`${className} ${
        active
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "hover:bg-default-hover border border-black dark:border-white"
      } flex items-center gap-1 cursor-pointer p-2 rounded-md `}
      onClick={onClick}
    >
      {placeHolder && (
        <span className=" font-semibold tracking-wider">{placeHolder}</span>
      )}
      {icon}
    </button>
  );
};
