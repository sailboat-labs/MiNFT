import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLayers } from "redux/reducers/selectors/layers";

import AddLayer from "@/components/nft/AddLayer";
import GenerateToken from "@/components/nft/GenerateToken";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectFolder from "@/components/nft/SelectFolder";
import NFTSettings from "@/components/nft/settings";

import { ILayer } from "@/interfaces";

import { NFTLayer } from "@/types";

const NFTGenerator = ({ router }: any) => {
  const layers = useSelector(getLayers);
  const [animateLayersIn, setAnimateLayersIn] = useState(false);

  function handleTraitChanged({
    groupName,
    traitIndex,
  }: {
    groupName: string;
    traitIndex: number;
  }): void {
    //
  }

  useEffect(() => {
    setTimeout(() => {
      if (animateLayersIn) {
        setAnimateLayersIn(true);
      } else {
        setAnimateLayersIn(false);
      }
    }, 1000);
  }, [animateLayersIn]);

  return (
    <>
      <Head>
        <title>NFT Trait Generator</title>
      </Head>

      {layers.length < 1 && (
        <SelectFolder className="mt-52 w-[length:calc(100vw-30rem)] flex-1" />
      )}

      {layers.length > 0 && (
        <div className="flex w-full">
          <div className="h-screen w-full overflow-x-hidden overflow-y-hidden border-r">
            {/* <TraitsSearchbar /> */}

            {/* <NewProperty /> */}

            <div className="border-b-2 px-20 py-2">
              <AddLayer />
            </div>

            {layers.length > 0 && (
              <div className="mt-0 h-[length:calc(100vh-0px)] w-full min-w-[900px] flex-col gap-10 overflow-y-auto px-10 pb-10">
                <>
                  {layers.map((item: ILayer, index: number) => (
                    <PropertyGroup
                      key={index}
                      index={index}
                      layersCount={layers.length}
                      onChange={handleTraitChanged}
                      layer={item}
                      elements={
                        layers.find(
                          (layer: NFTLayer) => layer.name == item.name
                        )?.elements
                      }
                    />
                  ))}
                </>
              </div>
            )}
          </div>
          <div className="min-h-screen w-[40%]">
            <section className="flex w-[29rem] flex-col justify-center pl-20">
              <div className="flex gap-5 pt-10">
                {/* {tabs.map((tab, index) => (
                <div
                  onClick={() => {
                    // history.push(tab.route);
                  }}
                  key={index}
                  className="cursor-pointer rounded-2xl border px-5 py-2"
                >
                  {tab.label}
                </div>
              ))} */}
                <NFTSettings />
              </div>
              <NFTPreview className="mt-10" />
              <GenerateToken />
            </section>
          </div>
        </div>
      )}
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

export default NFTGenerator;
