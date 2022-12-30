import { FC, ReactNode } from "react";

type H1Props = {
  children: ReactNode;
};

export const H1: FC<H1Props> = ({ children }) => {
  return <h1 className="font-medium text-xl">{children}</h1>;
};
