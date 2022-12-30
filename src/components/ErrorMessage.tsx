import { FC, ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
  return <label className="text-red-700">{children}</label>;
};
