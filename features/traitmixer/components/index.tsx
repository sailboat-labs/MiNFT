import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLayers, getSearchFilter } from "redux/reducers/selectors/layers";
import { getProjectState } from "redux/reducers/selectors/project";

import GenerateToken from "@/components/nft/GenerateToken";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectFolder from "@/components/nft/SelectFolder";
import BasicSettings from "@/components/pages/settings/BasicSettings";
import CollectionSettings from "@/components/pages/settings/Collection";
import OutputSettingsPage from "@/components/pages/settings/RenderSettings";

import { IElement, ILayer, IProject } from "@/interfaces";

import GeneratedTokens from "./generated-tokens";
import ShareTraits from "./share";

import { NFTLayer } from "@/types";

export function classNames(...classes: string[]) {
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

  return (
    <div className=" w-full">
      <Tab.Group>
        <Tab.List className="sticky top-0 z-[2] flex w-full items-center justify-center space-x-1 rounded border-b bg-white p-3">
          <div className="flex w-fit items-center gap-2">
            {["Mixer", "Settings", "Generated", "Share"].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded py-2 px-16 text-sm font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "border bg-indigo-100 font-bold"
                      : "border text-gray-500 hover:bg-gray-50 "
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </div>
        </Tab.List>
        <Tab.Panels className="relative z-[1]">
          <Tab.Panel>
            {layers.length < 1 && (
              <SelectFolder className="mt-96 w-[length:calc(100vw-30rem)] flex-1 bg-red-600" />
            )}

            {layers.length > 0 && (
              <div className="flex w-full flex-col-reverse justify-between gap-10 2xl:flex-row">
                <div className=" w-full overflow-y-hidden border-r">
                  {layers.length > 0 && (
                    <div className="mt-0 w-full min-w-[900px] flex-col gap-10 overflow-y-auto px-10 ">
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
                <div className="sticky top-0 flex h-10 items-start justify-center px-4 2xl:w-[40%]">
                  <section className="flex flex-col justify-center">
                    <NFTPreview className="mt-10" />
                    <GenerateToken />
                  </section>
                </div>
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex w-full justify-end px-20 py-5">
              <div className="gradient-button">Save</div>
            </div>
            <div className="grid h-screen grid-cols-1 gap-24 overflow-y-auto px-10  xl:grid-cols-2">
              <div>
                <BasicSettings />
                <CollectionSettings />
              </div>
              <OutputSettingsPage />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <GeneratedTokens />
          </Tab.Panel>
          <Tab.Panel>
            <ShareTraits />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NFTGenerator;
