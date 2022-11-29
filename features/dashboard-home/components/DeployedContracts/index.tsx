import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import PageLoader from "@/components/shared/PageLoader";

import { getCloneContracts } from "@/contract-api/logic/getClone";
import {
  cmPayload,
  daPayload,
  fdaPayload,
  paymentSliptPayload,
  pwlPayload,
  wlCMPayload,
  wlDAPayload,
  wlFDAPayload,
} from "@/contract-api/payload";
import { enumContractType } from "@/enums/contract-type.enum";
import { IProject } from "@/interfaces";

import DeployButton from "./DeployButton";

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
  const [isFetchingContracts, setIsFetchingContracts] = useState(false);

  async function handleGetCloneContracts() {
    setIsFetchingContracts(true);

    try {
      const _clones = await getCloneContracts();
      setClones(_clones.response as any);
    } catch (error) {
      console.log(error);
      // toast.error("An error occurred while fetching contracts");
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

        <DeployButton
          contractType={enumContractType.CLASSIC_MINT}
          payload={cmPayload}
        />

        <DeployButton
          contractType={enumContractType.PURE_WHITELIST}
          payload={pwlPayload}
        />

        <DeployButton
          contractType={enumContractType.DUTCH_AUCTION}
          payload={daPayload}
        />

        <DeployButton
          contractType={enumContractType.FAIR_DUTCH_AUCTION}
          payload={fdaPayload}
        />

        <DeployButton
          contractType={enumContractType.CLASSIC_MINT_WITH_WL}
          payload={wlCMPayload}
        />

        <DeployButton
          contractType={enumContractType.DUTCH_AUCTION_WITH_WL}
          payload={wlDAPayload}
        />

        <DeployButton
          contractType={enumContractType.FAIR_DUTCH_AUCTION_WITH_WL}
          payload={wlFDAPayload}
        />

        <DeployButton
          contractType="PaymentSplit"
          payload={paymentSliptPayload}
        />
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
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-[color:var(--dark)] dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
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
