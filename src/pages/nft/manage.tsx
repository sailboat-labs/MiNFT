import axios from "axios";
import {
  collection,
  DocumentData,
  getFirestore,
  query,
} from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";

import { firebaseApp } from "@/lib/firebase";

import FolderUploader from "@/components/nft/FolderUpload";
import ViewGeneratedTokens from "@/components/nft/GeneratedTokens";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";

import { ILayer } from "@/interfaces/get-started";

const firestore = getFirestore(firebaseApp);

const GetStartedPage = ({ router }: any) => {
  const { account, isAuthenticated } = useMoralis();

  console.log(router);

  const _query = query(
    collection(
      firestore,
      `art-engine/users/${account}/${router.query.name}/layers`
    )
  );

  const [snapshots, loading] = useCollectionData(_query);

  const [layers, setLayers] = useState<ILayer[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: ILayer[], curr: DocumentData) => {
      acc.push(curr as ILayer);
      return acc;
    }, []);

    setLayers(data);
  }, [loading, snapshots]);

  useEffect(() => {
    if (!isAuthenticated) router.push("/nft");
  }, [isAuthenticated]);

  /**
   * handles change in a property group trait
   *
   * @param {Object.<string, string|number>} param0 - object of group name and traitIndex
   */
  function handleTraitChanged({
    groupName,
    traitIndex,
  }: {
    groupName: string;
    traitIndex: number;
  }): void {
    // setNFT({
    //   ...NFT,
    //   [groupName]: traitGroups[groupName]?.traits[traitIndex],
    // });
    // setTraitGroups({
    //   ...traitGroups,
    //   [groupName]: {
    //     ...traitGroups[groupName],
    //     activeIndex: traitIndex,
    //   },
    // });
  }

  function generateTokens() {
    const data = JSON.stringify({
      address: account,
      collection: router.query?.name?.toString().toLowerCase(),
      layersOrder: [
        {
          name: "Background",
        },
        {
          name: "Skin",
        },
        {
          name: "Clothes",
        },
        {
          name: "Eyes",
        },
        {
          name: "Head Accessory",
        },
        {
          name: "Bling",
        },
      ],
    });

    const config: any = {
      method: "post",
      url: "https://art-engine-qb27e.ondigitalocean.app/generate",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast.success(response.data.toString());
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Head>
        <title>Manage</title>
      </Head>
      <div className="flex">
        <div className="min-h-screen w-[20%] border-r">
          <div className="mt-10 flex flex-col gap-10">
            {layers.map((item, index) => (
              <PropertyGroup
                key={index}
                onChange={handleTraitChanged}
                name={item.name}
              />
            ))}
          </div>
        </div>
        <div className="min-h-screen w-[60%]">
          <section className="flex flex-1 justify-center">
            <NFTPreview className="mt-10" layers={layers} />
          </section>
        </div>
        <div className="min-h-screen w-[20%] border-l">
          <section className="box-border flex min-h-screen bg-white">
            <div className="container mx-auto flex max-w-7xl items-start justify-between gap-8 p-12 px-4">
              <section className="flex-1">
                <div className="flex flex-col items-center gap-5">
                  <FolderUploader />
                  {layers && (
                    <div
                      onClick={() => {
                        generateTokens();
                        // axios.post("/api/nft/token_generator");
                      }}
                      className="gradient-button"
                    >
                      Generate Tokens
                    </div>
                  )}
                  {layers && (
                    <div className="">
                      <ViewGeneratedTokens />
                    </div>
                  )}
                </div>
                {/* <NewProperty /> */}
                {/* Group Previews */}
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export function getServerSideProps({ query }: any) {
  // if query object was received, return it as a router prop:
  if (query.name) {
    return { props: { router: { query } } };
  }
  // obtain slug elsewhere, redirect or fallback to some default value:
  /* ... */
  return { props: { router: { query: { name: "" } } } };
}

export default GetStartedPage;
