import { useSelector } from "react-redux";
import { getDashboardState } from "redux/reducers/selectors/dashboard";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Whitelist from "@/components/dashboard/Whitelist";
import NFTGenerator from "@/components/pages/Dashboard/NftGenerator";

import { IDashboardState } from "@/interfaces";

import ContractMakerView from "./contract-maker";

export default function DashboardHomePage() {
  const dashboardState = useSelector(getDashboardState) as IDashboardState;
  const selectedSidebar = dashboardState.selectedSidebar;

  const content: { component: any; value: string; label: string }[] = [
    {
      component: <NFTGenerator />,
      value: "nft-generator",
      label: "NFT Generator",
    },
    {
      component: <ContractMakerView />,
      value: "contract-maker",
      label: "Contract Maker",
    },
    {
      component: <Whitelist />,
      value: "whitelist",
      label: "Whitelist",
    },
  ];

  return (
    <DashboardLayout
      title={content.find((item) => item.value == selectedSidebar)?.label ?? ""}
      child={
        content.find((item) => item.value == selectedSidebar)?.component ?? (
          <></>
        )
      }
    />
  );
}
