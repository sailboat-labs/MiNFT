import { getFirestore } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { firebaseApp } from "@/lib/firebase";

import GenerateToken from "@/components/nft/GenerateToken";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectFolder from "@/components/nft/SelectFolder";
import NFTSettings from "@/components/nft/settings";

import { NFTLayer } from "@/types";

const firestore = getFirestore(firebaseApp);

const Index = ({ router }: any) => {
  const dispatch = useDispatch();
  const history = useRouter();
  // const [layers, setLayers] = useState<NFTLayer[]>([]);

  const store = useSelector((state) => state) as any;
  const layersState = store.layersReducer;
  const generatedImagesState = store.generatedImagesReducer;

  const tabs: { label: string; route: string }[] = [
    { label: "Preview", route: "" },
    { label: "Manage", route: "" },
    { label: "Generate", route: "" },
  ];

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
    //
  }

  return (
    <>
      <Head>
        <title>Manage</title>
      </Head>
      <div className="flex w-full justify-between border-b-2 py-5 px-5">
        <Link href="/" passHref>
          <span className="flex cursor-pointer select-none items-center justify-center text-xl font-black leading-none  text-black">
            MiNFT<span className="text-[#FFD32D]">.</span>
          </span>
        </Link>
        <div className="flex gap-5">
          {tabs.map((tab, index) => (
            <div
              onClick={() => {
                // history.push(tab.route);
              }}
              key={index}
              className="cursor-pointer rounded-2xl border px-5 py-2"
            >
              {tab.label}
            </div>
          ))}
          <NFTSettings />
        </div>
        <Link href="/" passHref>
          <span className="flex cursor-pointer select-none items-center justify-center text-xl font-black leading-none  text-black">
            MiNFT<span className="text-[#FFD32D]">.</span>
          </span>
        </Link>
      </div>
      <SelectFolder />
      <div className="flex">
        {/* <TraitGroupNavigator /> */}
        <div className="h-screen w-[60%] overflow-y-auto overflow-x-hidden border-r">
          {/* <TraitsSearchbar /> */}

          <div className="mt-0 h-[length:calc(100vh-0px)] flex-col gap-10 overflow-y-auto px-10">
            {layersState && (
              <>
                {layersState.layers.map((item: NFTLayer, index: number) => (
                  <PropertyGroup
                    key={index}
                    onChange={handleTraitChanged}
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
        <div className="min-h-screen w-[40%]">
          <section className="flex w-[29rem] flex-col justify-center pl-20">
            <NFTPreview className="mt-20" />
            <GenerateToken />
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
