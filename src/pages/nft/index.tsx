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
import { Layout } from "antd";
import useAuthenticationDialog from "@/hooks/UseAuthDialog";
import ProfileIcon from "@/components/shared/profile_icon";
const firestore = getFirestore(firebaseApp);

const Homepage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
   const { AuthDialog, setShowAuthDialog, account, isAuthenticated } =
     useAuthenticationDialog();
  const [layers, setLayers] = useState<
    { name: string; preview: string; owner: string }[]
  >([]);
  
  
 

  const _query = query(collection(firestore, `/art-engine/users/${account}`));

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


   if (!account || !isAuthenticated) {
     return (
       <Layout>
         <div className="mt-20 flex h-full w-full flex-col items-center justify-center gap-5 px-10 text-center">
           <AuthDialog />
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className="h-20 w-20"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             strokeWidth="1"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
             />
           </svg>
           <div className="text-2xl font-bold text-gray-900 dark:text-white">
             Connect your wallet to create a collection
           </div>
           <div
             onClick={() => {
               setShowAuthDialog(true);
             }}
             className="gradient-button"
           >
             Connect your wallet
           </div>
         </div>
       </Layout>
     );
   }


  return (
    <section>
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white p-5">
        <span className="flex cursor-pointer select-none items-center text-xl font-black leading-none  text-gray-900 dark:text-white md:mb-0 lg:items-center lg:justify-center">
          MiNFT<span className="text-indigo-600">.</span>
        </span>
        {isAuthenticated ? (
          <>{account && isAuthenticated && <ProfileIcon />}</>
        ) : (
          <button
            onClick={() => {
              setShowAuthDialog(true);
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Connect Wallet
          </button>
        )}
      </header>
      <main>
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
                  // setIsOpen(false); // if successful, redirect to get-started
                  // router.push("/nft/get-started");
                }}
              />

              {layers.map((item, index) => (
                <article
                  onClick={() => {
                    router.push({
                      pathname: "/nft/manage",
                      query: {  name: item.name },
                    });
                  }}
                  key={index}
                  className="border-gray2100 flex flex-col  rounded border bg-white transition-all duration-150 hover:border-collapse hover:cursor-pointer hover:shadow-md"
                >
                  <div className="flex flex-1 items-center justify-center bg-gray-200">
                    <img
                      className="h-full rounded-t object-cover"
                      src={item.preview}
                      alt=""
                    />
                  </div>
                  <p className="p-3 text-center font-semibold">{item.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Homepage;
