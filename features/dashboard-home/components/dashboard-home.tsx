import { formatEthAddress } from "eth-address";
import DelegateAccess from "features/dev-eyes/components/delegate-access";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";
import { getAddress } from "redux/reducers/selectors/user";

import { IProject } from "@/interfaces";

export default function DashboardHome() {
  const project = useSelector(getProjectState) as IProject;
  const address = useSelector(getAddress);

  return (
    <div className="container flex h-screen w-full px-10 pt-16">
      <div className="flex w-full flex-col  rounded-lg font-dmsans ">
        <div className="text-3xl">{project.projectName}</div>
        <div
          className={`text-lg text-gray-500 ${
            project.owner?.toLowerCase() == address.toLowerCase()
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          {project.owner && `By ${formatEthAddress(project.owner)}`}
        </div>
        {/* <DeployedContracts /> */}
        <DelegateAccess />
      </div>
    </div>
  );
}
