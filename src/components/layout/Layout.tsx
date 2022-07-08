import * as React from "react";

import Footer from "./footer";
import Seo from "../Seo";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-white text-black dark:bg-[#202124] dark:text-white dark:text-gray-200">
      <Seo />

      {/* <Navbar /> */}
      <div className="min-h-screen pt-[3.2rem]">
        <div>{children}</div>
      </div>
      <Footer className="bottom-0 w-full" />
    </div>
  );
}
