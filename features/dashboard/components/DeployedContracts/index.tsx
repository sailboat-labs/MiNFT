import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import PageLoader from "@/components/shared/PageLoader";

import { enumContractType } from "@/enums/contract-type.enum";
import { IProject } from "@/interfaces";

import { deployContract, getCloneContracts } from "./index.logic";

export default function DeployedContracts() {
  const dispatch = useDispatch();
  const project = useSelector(getProjectState) as IProject;

  const [clones, setClones] = useState<
    {
      name: string;
      symbol: string;
      address: string;
      network: { chainId: number; name: string };
      contractType: string;
    }[]
  >([]);
  const [isDeployingContract, setIsDeployingContract] = useState(false);
  const [isFetchingContracts, setIsFetchingContracts] = useState(false);

  async function handleDeployContract(contractType: string) {
    setIsDeployingContract(true);
    try {
      await deployContract({ contractType });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while trying to create contract");
    }
    setIsDeployingContract(false);
  }

  async function handleGetCloneContracts() {
    setIsFetchingContracts(true);

    try {
      const _clones = await getCloneContracts();
      setClones(_clones.response as any);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching contracts");
    }
    setIsFetchingContracts(false);
  }

  useEffect(() => {
    handleGetCloneContracts();
  }, []);

  return (
    <div className="mt-0 w-full ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-3xl">{project.projectName}</div>

          <div className="mt-5 flex items-center gap-3">
            <div className=" text-2xl">Deployed Contracts</div>
          </div>
          <div className="text-base text-gray-500">
            The list of contract instances that you have deployed with minft
            across all networks.
          </div>
          {/* <div className="gradient-button mt-5">Manage Contract</div> */}
        </div>
        {isDeployingContract ? (
          <PageLoader />
        ) : (
          <div
            onClick={() => {
              // dispatch(setSelectedSidebar("contract-maker"));

              if (isDeployingContract) return;

              handleDeployContract(enumContractType.CLASSIC_MINT);
            }}
            className="gradient-button"
          >
            Add new contract
          </div>
        )}
      </div>

      {isFetchingContracts ? (
        <div className="mt-20 flex flex-col items-center justify-center gap-3">
          <PageLoader />
          Fetching contracts from network...
        </div>
      ) : (
        <div className="relative mt-10 overflow-x-auto sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Contract Type
                </th>
                <th scope="col" className="py-3 px-6">
                  Network
                </th>
                <th scope="col" className="py-3 px-6">
                  Contract Address
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {clones.map((clone, index) => (
                <tr
                  key={index}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                  >
                    {clone.name}
                  </th>
                  <td className="py-4 px-6">{clone.contractType}</td>
                  <td className="py-4 px-6">{clone.network.name}</td>
                  <td className="py-4 px-6">{clone.address}</td>
                  <td className=" py-4 px-6">
                    <div className="rounded-10 bg-green-600 text-green-700">
                      Deployed
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isFetchingContracts && clones.length < 1 && (
            <div className="mt-20 w-full text-center">
              No Contracts Deployed
            </div>
          )}
        </div>
      )}
    </div>
  );
}
