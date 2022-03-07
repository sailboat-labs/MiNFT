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

  async function getNFTS() {
    const { data } = await axios.get("/api/ensnfts", {});

    setNfts(data.data);
    console.log(data.data);
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
    <div className="mt-10">
      <span className=" text-2xl font-bold">My NFTs</span>
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
                              setNftAsAvatar(nft.image_url)
                            }}
                            className={`${
                              active
                                ? "bg-primaryblue text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <div className={`w-fit text-sm  transition-all  `}>
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
                              <div className={` w-fit text-sm  transition-all`}>
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
    </div>
  );
}
