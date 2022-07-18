import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLayers, getSearchFilter } from "redux/reducers/selectors/layers";
import { getProjectState } from "redux/reducers/selectors/project";

import GenerateToken from "@/components/nft/GenerateToken";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectFolder from "@/components/nft/SelectFolder";

import { IElement, ILayer, IProject } from "@/interfaces";

import addLayersToFirebase from "./index.logic";

import { NFTLayer } from "@/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NFTGenerator = ({ router }: any) => {
  const layers = useSelector(getLayers);
  const project = useSelector(getProjectState) as IProject;
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

  useEffect(() => {
    if (layers.length < 1) return;
    addLayersToFirebase(layers, project);
  }, [layers]);

  return (
    <div className="w-full ">
      <Tab.Group>
        <Tab.List className="flex w-fit gap-2 space-x-1 rounded  p-3">
          {["Mixer", "Settings", "Generate"].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded py-2 px-16 text-sm font-medium leading-5 text-blue-700",
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
              <SelectFolder className="mt-96 w-[length:calc(100vw-30rem)] flex-1 bg-red-600" />
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
                    <div className="mt-0 h-screen w-full min-w-[900px] flex-col gap-10 overflow-y-auto px-10 ">
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
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NFTGenerator;
