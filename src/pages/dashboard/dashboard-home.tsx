import { formatEthAddress } from "eth-address";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import { IProject } from "@/interfaces";

export default function DashboardHome() {
  const { account, logout, isAuthenticated } = useMoralis();
  const project = useSelector(getProjectState) as IProject;

  return (
    <div className="container flex h-screen w-full px-10 pt-20">
      <div className="flex h-72 w-fit flex-col  rounded-lg font-dmsans ">
        <div className="text-gray-500">
          {account && formatEthAddress(account!)}
        </div>
        <div className="text-3xl">{project.projectName}</div>
      </div>
    </div>
  );
}
