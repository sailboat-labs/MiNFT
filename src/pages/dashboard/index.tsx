import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardState,
  getSlideInModalState,
} from "redux/reducers/selectors/dashboard";
import { setSlideInModalConfig } from "redux/reducers/slices/dashboard";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Whitelist from "@/components/dashboard/Whitelist";
import NFTGenerator from "@/components/pages/Dashboard/NftGenerator";

import { IDashboardState } from "@/interfaces";

import ContractMakerView from "./contract-maker";

export default function DashboardHomePage() {
  const dashboardState = useSelector(getDashboardState) as IDashboardState;
  const selectedSidebar = dashboardState.selectedSidebar;

  const content: {
    component: any;
    value: string;
    label: string;
    titleOptions?: any;
  }[] = [
    {
      component: <NFTGenerator />,
      value: "nft-generator",
      label: "NFT Generator",
      titleOptions: <NFTGeneratorTitleOptions />,
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
      titleBarEndChildren={
        content.find((item) => item.value == selectedSidebar)?.titleOptions ??
        ""
      }
      child={
        content.find((item) => item.value == selectedSidebar)?.component ?? (
          <></>
        )
      }
    />
  );
}

function NFTGeneratorTitleOptions() {
  const slideInModalState = useSelector(getSlideInModalState);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(
          setSlideInModalConfig({
            key: "componentLabel",
            value: "nft-gen-settings",
          })
        );
        dispatch(setSlideInModalConfig({ key: "show", value: true }));
      }}
      className="flex cursor-pointer items-center gap-2 rounded border px-2 py-1 transition-all hover:bg-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 rotate-0 cursor-pointer transition-all hover:rotate-180 hover:scale-110"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      Settings
    </div>
  );
}
