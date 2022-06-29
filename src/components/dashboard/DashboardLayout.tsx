import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Seo from "../Seo";

type props = {
  child: ReactNode;
};

export default function DashboardLayout({ child }: props) {
  return (
    <main>
      <Seo templateTitle="Dashboard" />
      {/* <Header /> */}
      <div className="flex h-screen flex-row overflow-y-hidden">
        <Sidebar currentPage="/" />
        <div className="h-screen flex-1 overflow-y-hidden px-6">
          {/* <Navbar title="Account Information" /> */}
          {child}
        </div>
      </div>
    </main>
  );
}
