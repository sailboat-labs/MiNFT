/* eslint-disable @next/next/no-img-element */
import {
  collection,
  DocumentData,
  getFirestore,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import NewNFT from "@/components/modals/NewNFT";

import ellipsify from "@/utils/ellipsify";
const firestore = getFirestore(firebaseApp);

const Homepage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [layers, setLayers] = useState<
    { name: string; preview: string; owner: string }[]
  >([]);
  // flag to determine if wallet is connected or not
  const [walletIsConnected, setWalletIsConnected] = useState<boolean>(true);
  /**
   * handles mouse click on element
   * - connects to user's wallet
   *
   * @param _evt - MouseEvent object
   * @returns {undefined}
   */
  function connectWallet(_evt: React.MouseEvent<HTMLButtonElement>): void {
    setWalletIsConnected(true);
    // todo: code to connect wallet goes here
    alert("connect to wallet");
  }

  const _query = query(collection(firestore, "/art-engine/users/francis"));

  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce(
      (
        acc: { name: string; preview: string; owner: string }[],
        curr: DocumentData
      ) => {
        acc.push(curr as { name: string; preview: string; owner: string });
        return acc;
      },
      []
    );

    console.log(data);

    setLayers(data);
  }, [loading, snapshots]);

  return (
    <section>
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white p-5">
        <strong className="text-3xl">MiNFT</strong>
        {walletIsConnected ? (
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            {ellipsify("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Connect Wallet
          </button>
        )}
      </header>
      <main>
        {/* connect wallet ui content */}
        {walletIsConnected ? (
          <section>
            <div className="max-w-8xl container mx-auto  px-4">
              {/* header slider */}
              <div className="mb-8 flex items-center gap-6 border-b-[3px] border-gray-200 py-8">
                <h3 className="text-3xl">Art</h3>
                <h3 className="text-3xl text-gray-300">Contract</h3>
              </div>
              {/* new nft project */}
              <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-6">
                <article
                  onClick={() => setIsOpen(true)}
                  className="flex h-[250px] transform flex-col rounded border border-gray-200 bg-white transition-all duration-150 hover:border-collapse hover:scale-105 hover:cursor-pointer "
                >
                  <div className="relative z-10 flex flex-1 items-center justify-center bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="gray"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <p className="p-3 text-center font-semibold">Create New</p>
                </article>
                <NewNFT
                  isOpen={isOpen}
                  closeModal={() => {
                    setIsOpen(false); // if successful, redirect to get-started
                    // router.push("/nft/get-started");
                  }}
                />

                {layers.map((item, index) => (
                  <article
                  onClick={()=>{
                    router.push({pathname:"/nft/manage",query:{address:item.owner,name:item.name}})
                  }}
                    key={index}
                    className="border-gray2100 transition-all flex  flex-col rounded border bg-white duration-150 hover:border-collapse hover:cursor-pointer hover:shadow-md"
                  >
                    <div className="flex flex-1 items-center justify-center bg-gray-200">
                      <img className="object-cover h-full rounded-t" src={item.preview} alt="" />
                    </div>
                    <p className="p-3 text-center font-semibold">{item.name}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="flex min-h-[length:calc(100vh-80px)] items-center justify-center ">
            <div className="max-w-8xl container mx-auto  px-4 text-center">
              <h1 className="text-7xl font-black">MiNFT</h1>
              <p className="my-6">
                NFT creation made easy. Create your NFTs with MiNFT
              </p>
              {walletIsConnected ? (
                <button className="sticky-top rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                  {ellipsify("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")}
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="sticky-top rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </section>
        )}
      </main>
    </section>
  );
};

export default Homepage;
