import React, { FC } from "react";

interface AppProps {
  active?: boolean;
  children: React.ReactNode;
}

const NavTab: FC<AppProps> = ({ children, active }) => {
  return (
    <div
      className={`relative my-2 ml-2 rounded-tl-full rounded-bl-full  text-sm font-medium text-white transition-all duration-100 hover:bg-[#0d7ba3] dark:text-gray-700  ${
        active && "bg-white  text-[#085E7D] hover:bg-white hover:tracking-wider"
      }`}
    >
      {active && (
        <div className="pointer-events-none absolute bottom-full left-0 h-2 w-full bg-white before:absolute before:h-full before:w-full before:rounded-br-full before:bg-[#085E7D]"></div>
      )}

      <div className="block h-full w-full">{children}</div>
      {active && (
        <div className="pointer-events-none absolute top-full left-0 h-2 w-full bg-white before:absolute before:h-full before:w-full before:rounded-tr-full before:bg-[#085E7D]"></div>
      )}
    </div>
  );
};

export default NavTab;
