import { ReactNode } from "react";

import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import Seo from "../Seo";

type props = {
  child: ReactNode;
  title: string;
};

export default function DashboardLayout({ child, title }: props) {
  return (
    <main>
      <Seo templateTitle="Dashboard" />
      {/* <Header /> */}
      <div className="flex h-screen flex-row overflow-y-hidden">
        <Sidebar currentPage="/" />
        <div className="h-screen flex-1 overflow-y-hidden">
          <Navbar title={title} />
          {child}
        </div>
      </div>
    </main>
  );
}
