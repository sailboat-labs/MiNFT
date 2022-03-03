import { Menu, Transition } from "@headlessui/react";
import { formatEthAddress } from "eth-address";
import { useMetaMask } from "metamask-react";
import { Fragment } from "react";

export default function ProfileIcon() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  return (
    <div className="w-fit text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center  rounded-md bg-opacity-20 text-sm  font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="cursor-pointer rounded-[50%] p-1 transition-all hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }: any) => (
                  <button
                    className={`${
                      active ? "bg-primaryblue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                  >
                    {account && formatEthAddress(account)}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: any) => (
                  <button
                    className={`${
                      active ? "bg-primaryblue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Watchlist
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: any) => (
                  <button
                    className={`${
                      active ? "bg-primaryblue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    My Comments
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }: any) => (
                  <button
                    className={`${
                      active ? "bg-primaryblue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Disconnect
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
