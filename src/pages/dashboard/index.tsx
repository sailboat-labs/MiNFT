import { useSelector } from "react-redux";
import { getDashboardState } from "redux/reducers/selectors/dashboard";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NFTGenerator from "@/components/pages/Dashboard/NftGenerator";

import { IDashboardState } from "@/interfaces";

import ContractMakerView from "./contract-maker";

export default function DashboardHomePage() {
  const dashboardState = useSelector(getDashboardState) as IDashboardState;
  const selectedSidebar = dashboardState.selectedSidebar;

  const content: { component: any; value: string }[] = [
    { component: <NFTGenerator />, value: "nft-generator" },
    { component: <ContractMakerView />, value: "contract-maker" },
  ];

  return (
    <div className="">
      <DashboardLayout
        child={
          content.find((item) => item.value == selectedSidebar)?.component ?? (
            <></>
          )
        }
      />
    </div>
  );
}
