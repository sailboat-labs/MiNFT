import * as React from "react";

import Footer from "./footer";
import Navbar from "./Navbar";
import Seo from "../Seo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-white text-black dark:bg-[color:var(--dark)] dark:bg-[#202124] dark:text-white ">
      <Seo />

      <Navbar />
      <div className="min-h-screen pt-[3.2rem]">
        <div className="container mx-auto max-w-7xl">
          <div>{children}</div>
        </div>
      </div>
      <Footer className="bottom-0 w-full" />
    </div>
  );
}
