import { FC, ReactNode } from "react";

export type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
};

export const Button: FC<ButtonProps> = ({ children, onClick, type }) => {
  return (
    <button
      className="bg-black text-white py-3 px-7 rounded-lg"
      onClick={onClick}
      type={type || "submit"}
    >
      {children}
    </button>
  );
};
