import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLayers, getSearchFilter } from "redux/reducers/selectors/layers";
import { setShowSettings } from "redux/reducers/slices/settings";

import SlideInModal from "@/components/modals/SlideIn";
import AddLayer from "@/components/nft/AddLayer";
import GenerateToken from "@/components/nft/GenerateToken";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectFolder from "@/components/nft/SelectFolder";
import NFTSettings from "@/components/nft/settings";
import TraitsSearchbar from "@/components/nft/TraitsSearchbar";

import { IElement, ILayer } from "@/interfaces";

import { NFTLayer } from "@/types";

const NFTGenerator = ({ router }: any) => {
  const layers = useSelector(getLayers);
  const searchFilter = useSelector(getSearchFilter);
  const [animateLayersIn, setAnimateLayersIn] = useState(false);
  const dispatch = useDispatch();
  const [sampleModal, setSampleModal] = useState(false);

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
      <NFTSettings />
      {layers.length < 1 && (
        <SelectFolder className="mt-72 w-[length:calc(100vw-30rem)] flex-1" />
      )}

      {layers.length > 0 && (
        <div className="flex w-full">
          <div className="h-screen w-full overflow-y-hidden border-r">
            {/* <NewProperty /> */}

            <div className="flex gap-x-20 border-b-2 px-20 py-2">
              <AddLayer />
              <div className="flex-1">
                <TraitsSearchbar />
              </div>
            </div>

            {layers.length > 0 && (
              <div className="mt-0 h-[length:calc(100vh-60px)] w-full min-w-[900px] flex-col gap-10 overflow-y-auto px-10 pb-10">
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
          <div className="h-screen w-[40%]">
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
              </div>
              <div
                className="gradient-button"
                onClick={() => dispatch(setShowSettings(true))}
              >
                Settings
              </div>
              {/* <div
                className="gradient-button"
                onClick={() => setSampleModal(true)}
              >
                Modal
              </div> */}

              <SlideInModal
                show={sampleModal}
                onClose={() => setSampleModal(false)}
                slideFrom="right" // todo: can also assume the value 'right'
              >
                <>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  iure voluptatem fugit magnam, ipsum laudantium a, quisquam
                  similique veritatis hic dolor quaerat quos aliquam accusantium
                  dignissimos porro eligendi ratione aspernatur.
                </>
              </SlideInModal>
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
