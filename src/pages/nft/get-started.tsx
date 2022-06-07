/* eslint-disable @next/next/no-img-element */

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
import PropertyGroup from "@/components/nft/PropertyGroup";
import PreviewNFT from "@/components/pages/nft/token_generator/nft_preview";

import { ILayer } from "@/interfaces";

interface TraitGroup {
  [groupName: string]: {
    traits: string[];
    activeIndex: number;
  };
}

const firestore = getFirestore(firebaseApp);

const GetStartedPage = () => {
  const [NFT, setNFT] = useState<any>({});
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

  const address = "francis";
  const collectionName = "nozo";

  const [layers, setLayers] = useState<ILayer[]>([]);

  const _query = query(
    collection(
      firestore,
      `art-engine/${address}/${collectionName}/input/layers/`
    )
  );
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: ILayer[], curr: DocumentData) => {
      acc.push(curr as ILayer);
      return acc;
    }, []);

    setLayers(data);
  }, [loading, snapshots]);

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

  return (
    <div className="w-full">
      <Head>
        <title>Get Started</title>
      </Head>
      <section className="box-border flex min-h-screen bg-white">
        <div className=" flex w-full items-start justify-between gap-8 p-12 px-4">
          <section className="max-w-6xl flex-1">
            <NewProperty address={address} collectionName={collectionName} />
            {/* Group Previews */}
            <div className="mt-10 flex flex-col gap-10">
              {layers.map((item, index) => (
                <PropertyGroup
                  key={index}
                  onChange={handleTraitChanged}
                  name={item.name}
                />
              ))}
            </div>
          </section>
          <section className="">
            {/* Project preview */}
            {/* <NFTPreview className="mt-10" layers={layers} /> */}
            {/* collection size */}
            {/* Generate collection */}
          </section>
          <div className="w-1/2">
            <PreviewNFT address={address} collectionName={collectionName} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStartedPage;
