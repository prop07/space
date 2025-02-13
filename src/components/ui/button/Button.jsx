const Button = ({ onClick, icon, placeHolder }) => {
  return (
    <button
      className="cursor-pointer py-2 px-2 hover:bg-neutral-700 rounded-md"
      onClick={onClick}
    >
      <span className=" font-semibold tracking-wider">{placeHolder}</span>
      {icon}
    </button>
  );
};

export default Button;
