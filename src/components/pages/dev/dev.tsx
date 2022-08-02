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

import DeployButton from "./DeployButton";

export default function DevPage() {
  const contractMakerAddresses: { name: string; address: string }[] = [
    {
      name: "Forwarder",
      address: process.env.NEXT_PUBLIC_FORWARDER_ADDRESS ?? "",
    },
    {
      name: "Minft Registry",
      address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS ?? "",
    },
    {
      name: "Minft Factory",
      address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS ?? "",
    },
    {
      name: "Classic Mint",
      address: process.env.NEXT_PUBLIC_CLASSIC_MINT ?? "",
    },
    {
      name: "Classic Mint with whitelist",
      address: process.env.NEXT_PUBLIC_CLASSIC_MINT_WITH_WL ?? "",
    },
    {
      name: "Dutch Auction",
      address: process.env.NEXT_PUBLIC_DUTCH_AUCTION ?? "",
    },
    {
      name: "Dutch Auction with whitelist",
      address: process.env.NEXT_PUBLIC_DUTCH_AUCTION_WITH_WL ?? "",
    },
    {
      name: "Fair Dutch Auction",
      address: process.env.NEXT_PUBLIC_FAIR_DUTCH_AUCTION ?? "",
    },
    {
      name: "Fair Dutch Auction with whitelist",
      address: process.env.NEXT_PUBLIC_FAIR_DUTCH_WITH_WL ?? "",
    },
    {
      name: "Pure whitelist",
      address: process.env.NEXT_PUBLIC_PURE_WHITELIST ?? "",
    },
  ];

  return (
    <div className="p-10">
      <div className="flex flex-col">
        <div className="text-2xl">Development Eyes</div>
        <div className="text-base text-gray-500">
          Development logs and variables
        </div>
      </div>

      <div>
        <div className="mt-10 mb-5 text-xl ">Contract Maker Addresses</div>
        <div className="relative w-fit overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-fit text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {contractMakerAddresses.map((item, index) => (
                <tr
                  key={index}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="py-4 px-6">{item.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="mt-10 mb-5 text-xl ">Contract Deployment</div>

        <div className="mt-5">
          <DeployButton
            contractType={enumContractType.CLASSIC_MINT}
            payload={cmPayload}
          />
        </div>
        <div className="mt-5">
          <DeployButton
            contractType={enumContractType.PURE_WHITELIST}
            payload={pwlPayload}
          />
        </div>

        <div className="mt-5">
          <DeployButton
            contractType={enumContractType.DUTCH_AUCTION}
            payload={daPayload}
          />
        </div>

        <div className="mt-5">
          <DeployButton
            contractType={enumContractType.FAIR_DUTCH_AUCTION}
            payload={fdaPayload}
          />
        </div>

        <div className="mt-5">
          <DeployButton
            contractType={enumContractType.CLASSIC_MINT_WITH_WL}
            payload={wlCMPayload}
          />
        </div>

        <div className="mt-5">
          <DeployButton
            contractType={enumContractType.DUTCH_AUCTION_WITH_WL}
            payload={wlDAPayload}
          />
        </div>

        <div className="mt-5">
          <DeployButton
            contractType={enumContractType.FAIR_DUTCH_AUCTION_WITH_WL}
            payload={wlFDAPayload}
          />
        </div>

        <div className="mt-5">
          <DeployButton
            contractType="PaymentSplit"
            payload={paymentSliptPayload}
          />
        </div>
      </div>
    </div>
  );
}
