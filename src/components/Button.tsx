interface Props {
  onClick?: () => void;
  title: string;
  color: "dark" | "red";
  className?: string;
}

export default function Button({
  onClick = () => {},
  title = "Button",
  color = "dark",
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`${
        color === "dark"
          ? "bg-gradient-to-b from-dark-1 to-black "
          : "bg gradient-to-b from-red to-[#B71A34]"
      } px-[30px] py-[10px] text-white font-bold rounded-full
      transition duration-200 hover:opacity-90
      ${className}
      `}
    >
      {title}
    </button>
  );
}
