/* eslint-disable @next/next/no-img-element */
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { User } from "@/types";

type props = {
  account: string;
};

export default function UserNfts({ account }: props) {
  const [nfts, setNfts] = useState<any[]>([]);
  const [selectedNft, setSelectedNft] = useState(-1);
  const [loadingNfts, setLoadingNfts] = useState(true);

  async function getNFTS() {
    setLoadingNfts(true)
    try {
      const { data } = await axios.get("/api/ensnfts", { params: { account } });
      setNfts(data.data);
      setLoadingNfts(false)
    } catch (error) {
      setLoadingNfts(false)
    }

    
  }

  useEffect(() => {
    if (!account) return;
    getNFTS();
  }, [account]);

  async function setNftAsAvatar(link: string) {
    const user: User = {
      walletId: account!,
      avatarUrl: link,
      lastUpdated: new Date().toISOString(),
    };

    try {
      const { data } = await axios.put("/api/user", { user });
      toast.success("Avatar updated");
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
    }
  }

  async function setNftAsName(name: string) {
    const user: User = {
      walletId: account!,
      name: name,
      lastUpdated: new Date().toISOString(),
    };

    try {
      const { data } = await axios.put("/api/user", { user });
      toast.success("Name updated");
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
    }
  }

  return (
    <div className="contained mt-10 flex flex-col">
      <span className=" w-full text-2xl font-bold">My NFTs</span>
      {loadingNfts ? (
        <svg
          role="status"
          className="mr-2 mt-10 inline h-10 w-10 animate-spin text-gray-200 "
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          ></path>
        </svg>
      ) : (
        <div>
          {nfts.length < 1 ? (
            <div className="mt-10 text-xl font-bold text-gray-500 flex flex-col justify-center items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              No NFTs found
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {nfts.map((nft, index) => (
                <div
                  onMouseOver={() => {
                    setSelectedNft(index);
                  }}
                  onMouseLeave={() => {
                    setSelectedNft(-1);
                  }}
                  key={index}
                  className="flex cursor-pointer flex-col gap-3"
                >
                  <img
                    className="h-52 w-52 rounded-lg  object-cover transition-all hover:scale-105"
                    src={nft.image_url}
                    alt=""
                  />
                  <span className="text-sm text-gray-600">{nft.name}</span>
                  <div
                    className={`transition-all  ${
                      selectedNft == index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Menu as="div" className="relative inline-block text-left">
                      <div className="flex items-center gap-3">
                        <Menu.Button className="gradient-button rounded bg-primaryblue px-2 text-sm capitalize text-white transition-all hover:scale-105">
                          Set NFT as
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
                        <Menu.Items
                          className={`absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `}
                        >
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setNftAsAvatar(nft.image_url);
                                  }}
                                  className={`${
                                    active
                                      ? "bg-primaryblue text-white"
                                      : "text-gray-900"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                  <div
                                    className={`w-fit text-sm  transition-all  `}
                                  >
                                    Use as profile picture
                                  </div>
                                </button>
                              )}
                            </Menu.Item>
                            {nft.asset_contract.name == "ENS" && (
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      setNftAsName(nft.name);
                                    }}
                                    className={`${
                                      active
                                        ? "bg-primaryblue text-white"
                                        : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    <div
                                      className={` w-fit text-sm  transition-all`}
                                    >
                                      Use as username
                                    </div>
                                  </button>
                                )}
                              </Menu.Item>
                            )}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
