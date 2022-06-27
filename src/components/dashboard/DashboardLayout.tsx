import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Seo from "../Seo";

type props = {
  child: ReactNode;
};

export default function DashboardLayout({ child }: props) {
  return (
    <div>
      <Seo templateTitle="Dashboard" />
      {/* <Header /> */}
      <div className="flex flex-row">
        <Sidebar currentPage="/" />
        <div>
          {/* <Navbar title="Account Information" /> */}
          {child}
        </div>
      </div>
    </div>
  );
}