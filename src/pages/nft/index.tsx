import { getFirestore } from "firebase/firestore";
import Head from "next/head";
import React from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { firebaseApp } from "@/lib/firebase";

import TraitGroupNavigator from "@/components/layout/TraitGroupNavigator";
import Generate from "@/components/nft/Generate";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectedTraits from "@/components/nft/SelectedTraits";
import SelectFolder from "@/components/nft/SelectFolder";

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
    //
  }

  return (
    <>
      <Head>
        <title>Manage</title>
      </Head>
      <SelectFolder />
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
            <NFTPreview className="mt-20" />
            {/* <div className="grid grid-cols-8">
              {generatedImagesState.images.map((image: any, index: number) => (
                <img className="h-32 w-32" key={index} src={image} alt="" />
              ))}
            </div> */}
          </section>
        </div>
        <div className="min-h-screen w-[20%] border-l">
          <section className="box-border flex min-h-screen bg-white">
            <div className="container mx-auto flex max-w-7xl items-start justify-between gap-8">
              <section className="flex-1">
                <div className="flex flex-col justify-between gap-5">
                  <SelectedTraits />
                  <Generate />
                </div>
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

export default Index;
