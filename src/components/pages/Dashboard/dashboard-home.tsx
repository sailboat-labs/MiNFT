import { formatEthAddress } from "eth-address";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import useStorage from "@/hooks/storage";

import DeployedContracts from "@/components/dashboard/UserDeployedContracts";

import { IProject } from "@/interfaces";

export default function DashboardHome() {
  const project = useSelector(getProjectState) as IProject;
  const { getItem, setItem, removeItem } = useStorage();

  return (
    <div className="container flex h-screen w-full px-10 pt-10">
      <div className="flex h-72 w-full flex-col  rounded-lg font-dmsans ">
        <div className="text-gray-500">
          {getItem("isAuthenticated") == "true" &&
            getItem("account") &&
            formatEthAddress(getItem("account"))}
        </div>
        <div className="text-3xl">{project.projectName}</div>
        <DeployedContracts />
      </div>
    </div>
  );
}
