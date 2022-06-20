import { getFirestore } from "firebase/firestore";
import Head from "next/head";
import React from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { firebaseApp } from "@/lib/firebase";

import TraitGroupNavigator from "@/components/layout/TraitGroupNavigator";
import GenerateToken from "@/components/nft/GenerateToken";
import PreviewLayers from "@/components/nft/PreviewLayers";
import PropertyGroup from "@/components/nft/PropertyGroup";
import TraitsSearchbar from "@/components/nft/TraitsSearchbar";

import { ILayer } from "@/interfaces/get-started";

import { NFTLayer } from "@/types";

const firestore = getFirestore(firebaseApp);

const Index = ({ router }: any) => {
  const dispatch = useDispatch();
  const { account, isAuthenticated } = useMoralis();
  const _layers: ILayer[] = [];

  // const [layers, setLayers] = useState<NFTLayer[]>([]);

  const store = useSelector((state) => state) as any;
  const layersState = store.layersReducer;
  const generatedImagesState = store.generatedImagesReducer;

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
    console.log("handleTraitChanged");
  }

  return (
    <>
      <Head>
        <title>Manage</title>
      </Head>
      <div className="flex">
        <TraitGroupNavigator />
        <div className="h-screen w-[20%] overflow-hidden border-r">
          <TraitsSearchbar />

          <div className="mt-0 h-[length:calc(100vh-55px)] flex-col gap-10 overflow-y-auto">
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
        <div className="min-h-screen w-[60%]">
          <section className="flex flex-1 justify-center">
            {/* <NFTPreview className="mt-10" layers={layers} /> */}
            <div className="grid grid-cols-8">
              {generatedImagesState.images.map((image: any, index: number) => (
                <img className="h-32 w-32" key={index} src={image} alt="" />
              ))}
            </div>
          </section>
        </div>
        <div className="min-h-screen w-[20%] border-l">
          <section className="container px-4">
            <div className="p-12 px-4">
              <GenerateToken />
            </div>
            <PreviewLayers />
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
