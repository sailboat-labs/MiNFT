import Head from "next/head";
import React, { useState } from "react";

import NewProperty from "@/components/nft/NewProperty";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";

interface TraitGroup {
  [groupName: string]: {
    traits: string[];
    activeIndex: number;
  };
}

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

  console.log(NFT);

  return (
    <>
      <Head>
        <title>Get Started</title>
      </Head>
      <section className="box-border flex min-h-screen bg-white">
        <div className="container mx-auto flex max-w-7xl items-start justify-between gap-8 p-12 px-4">
          <section className="flex-1">
            <NewProperty />
            {/* Group Previews */}
            <div className="mt-10 flex flex-col gap-10">
              {Object.entries(traitGroups).map(([groupName, value]) => (
                <PropertyGroup
                  key={groupName}
                  onChange={handleTraitChanged}
                  name={groupName}
                  traits={value.traits}
                  activeTraitIndex={value.activeIndex}
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
            {/* Project Name */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Project name"
                className=" flex-1 rounded-sm border-[color:var(--border-gray)]"
              />
              <button className="flex items-center gap-2 rounded-md bg-[color:var(--blue)] py-2 px-4 text-white">
                Save
              </button>
            </div>
            {/* Project preview */}
            <NFTPreview className="mt-10" nft={NFT!} />
            {/* collection size */}
            {/* Generate collection */}
          </section>
        </div>
      </section>
    </>
  );
};

export default GetStartedPage;
