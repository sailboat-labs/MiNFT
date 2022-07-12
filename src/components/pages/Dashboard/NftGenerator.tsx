import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLayers, getSearchFilter } from "redux/reducers/selectors/layers";

import GenerateToken from "@/components/nft/GenerateToken";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectFolder from "@/components/nft/SelectFolder";

import { IElement, ILayer } from "@/interfaces";

import { NFTLayer } from "@/types";

const NFTGenerator = ({ router }: any) => {
  const layers = useSelector(getLayers);
  const searchFilter = useSelector(getSearchFilter);
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
    <div>
      <Head>
        <title>NFT Trait Generator</title>
      </Head>
      {layers.length < 1 && (
        <SelectFolder className="mt-72 w-[length:calc(100vw-30rem)] flex-1" />
      )}

      {layers.length > 0 && (
        <div className="flex w-full flex-col-reverse justify-between gap-10 2xl:flex-row">
          <div className="h-screen w-full overflow-y-hidden border-r">
            {/* <NewProperty /> */}

            {/* <div className="flex gap-x-20 border-b-2 px-20 py-2">
              <AddLayer />
              <div className="flex-1">
                <TraitsSearchbar />
              </div>
            </div> */}

            {layers.length > 0 && (
              <div className="mt-0 h-auto w-full min-w-[900px] flex-col gap-10 overflow-y-auto px-10 pb-10 2xl:h-[length:calc(100vh-60px)]">
                <>
                  {layers
                    .filter((layer: ILayer) => {
                      const matchesLayerName = new RegExp(
                        `^${searchFilter}`,
                        "gi"
                      ).test(layer.name);

                      const matchesTraitValue =
                        layer.elements.findIndex((element: IElement) =>
                          new RegExp(`^${searchFilter}`, "gi").test(
                            element.traitValue
                          )
                        ) > -1;

                      return matchesLayerName || matchesTraitValue;
                    })
                    .map((item: ILayer, index: number) => (
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
          <div className="flex items-start  justify-center px-4 2xl:w-[40%]">
            <section className="flex flex-col justify-center">
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
              </div>

              <NFTPreview className="mt-10" />
              <GenerateToken />
            </section>
          </div>
        </div>
      )}
    </div>
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
