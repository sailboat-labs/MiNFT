import {
  collection,
  DocumentData,
  getFirestore,
  query,
} from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import NewProperty from "@/components/nft/NewProperty";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";

import { ILayer } from "@/interfaces/get-started";
import { useRouter } from "next/router";

interface TraitGroup {
  [groupName: string]: {
    traits: string[];
    activeIndex: number;
  };
}

const firestore = getFirestore(firebaseApp);

const GetStartedPage = () => {
  const router = useRouter()
  console.log(router.query);
  
  const [NFT, setNFT] = useState<any>({});
  const [outputImages, setOutputImages] = useState<any[]>([]);
  const [traitGroups, setTraitGroups] = useState<TraitGroup>({
    "group 1": {
      traits: ["img 1", "img 2", "img 3"],
      activeIndex: 0,
    },
    "group 2": {
      traits: ["img 1", "img 2", "img 3", "img 4", "img 5"],
      activeIndex: 1,
    },
    "group 3": {
      traits: ["img 1", "img 2", "img 3", "img 4"],
      activeIndex: 1,
    },
  });

  const _query = query(
    collection(firestore, "art-engine/francis/test/output/images")
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

    setOutputImages(data);
  }, [loading, snapshots]);

 

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
    setNFT({
      ...NFT,
      [groupName]: traitGroups[groupName]?.traits[traitIndex],
    });
    setTraitGroups({
      ...traitGroups,
      [groupName]: {
        ...traitGroups[groupName],
        activeIndex: traitIndex,
      },
    });
  }

  function fetchGenerated() {
    //
  }

  return (
    <>
      <Head>
        <title>Get Started</title>
      </Head>
      <section className="box-border flex min-h-screen bg-white">
        {/* <div className="h-screen ">
          {outputImages.map((item, index) => (
            <div key={index}>
              <img className="w-36" src={item.url} alt="" />
              <div>{item.filename}</div>
            </div>
          ))}
        </div> */}
        <div className="container mx-auto flex max-w-7xl items-start justify-between gap-8 p-12 px-4">
          <section className="flex-1">
            <NewProperty />
            {/* Group Previews */}
            <div className="mt-10 flex flex-col gap-10">
              {layers.map((item, index) => (
                <PropertyGroup
                  key={index}
                  onChange={handleTraitChanged}
                  name={item.name}
                  elements={item.elements}
                />
              ))}
              {/* <PropertyGroup
                onChange={handleTraitChanged}
                name="Group 1"
                traits={[]}
                activeTraitIndex={3}
              />
              <PropertyGroup
                onChange={handleTraitChanged}
                name="Group 2"
                traits={[]}
                activeTraitIndex={1}
              /> */}
            </div>
          </section>
          <section className="max-w-[308px] flex-1">
            {/* Project preview */}
            <NFTPreview className="mt-10" layers={layers} />
            {/* collection size */}
            {/* Generate collection */}
          </section>
        </div>
      </section>
    </>
  );
};

export default GetStartedPage;
