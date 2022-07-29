import DeployedContracts from "features/dashboard/components/DeployedContracts";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import useStorage from "@/hooks/storage";

import { IProject } from "@/interfaces";

export default function DashboardHome() {
  const project = useSelector(getProjectState) as IProject;
  const { getItem, setItem, removeItem } = useStorage();

  return (
    <div className="container flex h-screen w-full px-10 pt-0">
      <div className="flex w-full flex-col  rounded-lg font-dmsans ">
        <DeployedContracts />
      </div>
    </div>
  );
}
