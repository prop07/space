const Button = ({ onClick, icon, placeHolder }) => {
  return (
    <button
      className="cursor-pointer p-2 rounded-md hover:bg-button-hover"
      onClick={onClick}
    >
      <span className=" font-semibold tracking-wider">{placeHolder}</span>
      {icon}
    </button>
  );
};

export default Button;
