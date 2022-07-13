import { formatEthAddress } from "eth-address";
import { useDispatch } from "react-redux";
import { setSelectedSidebar } from "redux/reducers/slices/dashboard";

export default function DeployedContracts() {
  const dispatch = useDispatch();
  return (
    <div className="mt-10 w-full ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-2xl">Deployed Contracts</div>
          <div className="text-base text-gray-500">
            The list of contract instances that you have deployed with minft
            across all networks.
          </div>
        </div>
        <div
          onClick={() => {
            dispatch(setSelectedSidebar("contract-maker"));
          }}
          className="gradient-button "
        >
          Add new contract
        </div>
      </div>

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
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700">
              <th
                scope="row"
                className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
              >
                Nozomix
              </th>
              <td className="py-4 px-6">Classic Mint</td>
              <td className="py-4 px-6">Rinkeby</td>
              <td className="py-4 px-6">
                {formatEthAddress("0x65cF0585bD7B236b635DA7077624431DD9cec35e")}
              </td>
              <td className="py-4 px-6 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700">
              <th
                scope="row"
                className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
              >
                Nozomix
              </th>
              <td className="py-4 px-6">Classic Mint</td>
              <td className="py-4 px-6">Rinkeby</td>
              <td className="py-4 px-6">
                {formatEthAddress("0x65cF0585bD7B236b635DA7077624431DD9cec35e")}
              </td>
              <td className="py-4 px-6 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
