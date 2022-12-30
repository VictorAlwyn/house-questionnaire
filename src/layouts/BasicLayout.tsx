import Image from "next/image";
import { FC, ReactNode } from "react";

export type BasicLayoutProps = {
  children: ReactNode;
};

export const BasicLayout: FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full h-full">
      <div className="bg-red-200 h-screen w-2/5 relative">
        <Image
          src="https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
          fill={true}
          alt=""
        />
      </div>
      <div className="h-screen w-screen overflow-scroll">{children}</div>
    </div>
  );
};
