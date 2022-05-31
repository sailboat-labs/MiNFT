import Head from "next/head";
import React from "react";

import NewProperty from "@/components/nft/NewProperty";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";

const GetStartedPage = () => {
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
              <PropertyGroup />
              <PropertyGroup />
              <PropertyGroup />
              <PropertyGroup />
              <PropertyGroup />
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
            <NFTPreview />
            {/* collection size */}
            {/* Generate collection */}
          </section>
        </div>
      </section>
    </>
  );
};

export default GetStartedPage;
