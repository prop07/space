const Button = ({ onClick, icon, placeHolder, className }) => {
  return (
    <button
      className={`${className} flex items-center gap-1 cursor-pointer p-2 rounded-md hover:bg-btn-hover`}
      onClick={onClick}
    >
      <span className=" font-semibold tracking-wider">{placeHolder}</span>
      {icon}
    </button>
  );
};

export default Button;
