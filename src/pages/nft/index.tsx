/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getGeneratedImages } from "redux/reducers/selectors/layers";

import TraitGroupNavigator from "@/components/layout/TraitGroupNavigator";
import GeneratedToken from "@/components/nft/GeneratedToken";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectedTraits from "@/components/nft/SelectedTraits";
import SelectFolder from "@/components/nft/SelectFolder";

import { IGeneratedTokens } from "@/interfaces";

import { NFTLayer } from "@/types";

const Index = ({ router }: any) => {
  const dispatch = useDispatch();
  const { account, isAuthenticated } = useMoralis();
  const generatedTokens: IGeneratedTokens[] = useSelector(getGeneratedImages);

  // const [layers, setLayers] = useState<NFTLayer[]>([]);

  const store = useSelector((state) => state) as any;
  const layersState = store.layersReducer;
  const generatedImagesState = store.generatedImagesReducer;

  const tabs: { label: string; route: string }[] = [
    { label: "Preview", route: "" },
    { label: "Manage", route: "" },
    { label: "Settings", route: "" },
    { label: "Generate", route: "" },
  ];

  return (
    <>
      <Head>
        <title>Manage</title>
      </Head>
      <SelectFolder />
      {/* <div className="flex w-full justify-between py-5 px-5">
        <Link href="/" passHref>
          <span className="flex cursor-pointer select-none items-center justify-center text-xl font-black leading-none  text-black">
            MiNFT<span className="text-[#FFD32D]">.</span>
          </span>
        </Link>
        <div className="flex gap-5">
          {tabs.map((tab, index) => (
            <div key={index} className="rounded-2xl border px-5 py-2">
              {tab.label}
            </div>
          ))}
        </div>
        <Link href="/" passHref>
          <span className="flex cursor-pointer select-none items-center justify-center text-xl font-black leading-none  text-black">
            MiNFT<span className="text-[#FFD32D]">.</span>
          </span>
        </Link>
      </div> */}
      <div className="flex">
        <TraitGroupNavigator />
        <div className="h-screen w-[20%] overflow-y-auto overflow-x-hidden border-r">
          {/* <TraitsSearchbar /> */}

          <div className="mt-0 h-[length:calc(100vh-0px)] flex-col gap-10 overflow-y-auto">
            {layersState && (
              <>
                {layersState.layers.map((item: NFTLayer, index: number) => (
                  <PropertyGroup
                    key={index}
                    name={item.name}
                    elements={
                      layersState.layers.find(
                        (layer: NFTLayer) => layer.name == item.name
                      )?.elements
                    }
                  />
                ))}
              </>
            )}
          </div>
        </div>

        <div className="min-h-screen w-[40%] border-r">
          <section className="box-border flex min-h-screen bg-white">
            <div className="container mx-auto flex max-w-7xl items-start justify-between gap-8">
              <section className="flex-1">
                <div className="flex flex-col justify-between gap-5">
                  <SelectedTraits />
                  {/* <NFTLayering /> */}
                </div>
              </section>
            </div>
          </section>
        </div>
        <div className="mt-0 min-h-screen w-[40%]">
          <section className=" px-0">
            <div
              className={`border-l pt-5 pl-5 pr-0 transition-all duration-200 ${
                generatedTokens.length > 0
                  ? "translate-x-0 opacity-100"
                  : "w-52 translate-x-52 opacity-0"
              }`}
            >
              <div className="flex h-10 items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span className="text-xl">Generated Images</span>
              </div>
              <div className="grid h-[length:calc(100vh-3.9rem)] w-full  grid-cols-5 flex-col gap-3 overflow-y-auto pt-5 ">
                {generatedTokens
                  .filter((token, index) => index < 40)
                  .map((token, index) => (
                    <GeneratedToken key={index} token={token} />
                  ))}
              </div>
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

export default Index;
