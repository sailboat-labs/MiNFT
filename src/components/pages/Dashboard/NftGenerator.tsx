import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLayers, getSearchFilter } from "redux/reducers/selectors/layers";

import GenerateToken from "@/components/nft/GenerateToken";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectFolder from "@/components/nft/SelectFolder";

import { IElement, ILayer } from "@/interfaces";

import { NFTLayer } from "@/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
    <div className="w-full ">
      <Tab.Group>
        <Tab.List className="flex w-fit space-x-1  rounded  p-1">
          {["Design", "Settings", "Generate"].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded py-2.5 px-16 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "border bg-indigo-100"
                    : "border text-gray-500 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {layers.length < 1 && (
              <SelectFolder className="mt-72 w-[length:calc(100vw-30rem)] flex-1" />
            )}

            {layers.length > 0 && (
              <div className="flex w-full">
                <div className="h-screen w-full overflow-y-hidden border-r">
                  {/* <NewProperty /> */}

                  {/* <div className="flex gap-x-20 border-b-2 px-20 py-2">
              <AddLayer />
              <div className="flex-1">
                <TraitsSearchbar />
              </div>
            </div> */}

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

                    <NFTPreview className="mt-10" />
                    <GenerateToken />
                  </section>
                </div>
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NFTGenerator;
