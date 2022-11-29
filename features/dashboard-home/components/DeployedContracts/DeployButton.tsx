import { useState } from "react";
import toast from "react-hot-toast";

import PageLoader from "@/components/shared/PageLoader";

import { deployClone } from "@/contract-api/logic/deployClone";

interface DeployProps {
  contractType: string;
  payload: any;
}

const DeployButton = ({ contractType, payload }: DeployProps) => {
  const [isDeployingContract, setIsDeployingContract] = useState(false);

  async function handleDeployContract(contractType: string, payload: any[]) {
    setIsDeployingContract(true);
    try {
      await deployClone(contractType, payload);
    } catch (error) {
      toast.error("An error occurred while trying to create contract");
    }

    setIsDeployingContract(false);
  }
  return (
    <div>
      {isDeployingContract ? (
        <PageLoader />
      ) : (
        <div
          onClick={() => {
            // dispatch(setSelectedSidebar("contract-maker"));

            if (isDeployingContract) return;

            handleDeployContract(contractType, payload);
          }}
          className="gradient-button"
        >
          Add new {contractType}
        </div>
      )}
    </div>
  );
};

export default DeployButton;
