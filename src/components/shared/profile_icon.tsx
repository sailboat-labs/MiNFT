/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Transition } from "@headlessui/react";
import { formatEthAddress } from "eth-address";
import { doc, getFirestore } from "firebase/firestore";
import Link from "next/link";
// import { useMetaMask } from "metamask-react";
import { Fragment, useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useMoralis } from "react-moralis";

import { firebaseApp } from "@/lib/firebase";

import { User } from "@/types";

const firestore = getFirestore(firebaseApp);

export default function ProfileIcon() {
  // const { status, connect, account, chainId, ethereum } = useMetaMask();
  const { account, logout, isAuthenticated } = useMoralis();

  const [user, setUser] = useState<User>();

  const [animateIntoView, setAnimateIntoView] = useState(false);

  const ref = doc(firestore, `users/${account}`);

  const [userSnapshot, loading, error] = useDocumentData(ref);

  useEffect(() => {
    if (!account || !isAuthenticated || loading || !userSnapshot) return;

    setUser(userSnapshot as User);
    setTimeout(() => {
      setAnimateIntoView(true);
    }, 1000);
  }, [account, isAuthenticated, userSnapshot, loading]);

  return (
    <div className="w-fit text-right dark:text-white">
      <div
        className={`flex h-full items-center justify-center transition-all ${
          animateIntoView ? "absolute opacity-0" : "animate-pulse"
        }`}
      >
        <div className={` h-3 w-48 rounded-lg bg-gray-200 `}></div>
      </div>

      <div
        className={`transition-all ${
          animateIntoView ? "opacity-100" : "absolute opacity-0"
        }`}
      >
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center  rounded-md bg-opacity-20 text-sm  font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <div className="flex cursor-pointer gap-3 rounded-[50%] p-1 transition-all hover:scale-105">
                <span>Ethereum Mainnet</span>
                <span className="border-l-2 border-gray-500 px-3">
                  {account && (user?.name ?? formatEthAddress(account!))}
                </span>
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
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1  ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:text-white">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }: any) => (
                    <button
                      className={`${
                        active ? " text-white" : "text-gray-900 dark:text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                    >
                      {account && (user?.name ?? formatEthAddress(account!))}
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: any) => (
                    <div
                      className={`${
                        active
                          ? "bg-primaryblue text-white"
                          : "text-gray-900 dark:text-white"
                      } group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm `}
                    >
                      <Link href="/profile" passHref>
                        <div
                          className={`${
                            active
                              ? "bg-primaryblue text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md py-0 text-sm `}
                        >
                          Profile
                        </div>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: any) => (
                    <div
                      className={`${
                        active
                          ? "bg-primaryblue text-white"
                          : "text-gray-900 dark:text-white"
                      } group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm `}
                    >
                      <Link href="/watchlist" passHref>
                        <div
                          className={`${
                            active
                              ? "bg-primaryblue text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md py-0 text-sm `}
                        >
                          Watchlist
                        </div>
                      </Link>
                    </div>
                  )}
                </Menu.Item>
                {/* <Menu.Item>
                  {({ active }: any) => (
                    <button
                      className={`${
                        active
                          ? "bg-primaryblue text-white"
                          : "text-gray-900 dark:text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      My Comments
                    </button>
                  )}
                </Menu.Item> */}
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }: any) => (
                    <button
                      onClick={logout}
                      className={`${
                        active
                          ? "bg-primaryblue text-white"
                          : "text-gray-900 dark:text-white"
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
    </div>
  );
}
