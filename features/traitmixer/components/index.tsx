import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getIsLoadingLayers,
  getLayers,
  getSearchFilter,
} from "redux/reducers/selectors/layers";

import GenerateToken from "@/components/nft/GenerateToken";
import NFTPreview from "@/components/nft/NFTPreview";
import PropertyGroup from "@/components/nft/PropertyGroup";
import SelectFolder from "@/components/nft/SelectFolder";
import BasicSettings from "@/components/pages/settings/BasicSettings";
import CollectionSettings from "@/components/pages/settings/Collection";
import OutputSettingsPage from "@/components/pages/settings/RenderSettings";
import PageLoader from "@/components/shared/PageLoader";

import { IElement, ILayer } from "@/interfaces";

import GeneratedTokens from "./generated-tokens";
import ShareTraits from "./share";

import { NFTLayer } from "@/types";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NFTGenerator = () => {
  const layers = useSelector(getLayers);
  const isLoadingLayers = useSelector(getIsLoadingLayers);
  const searchFilter = useSelector(getSearchFilter);
  const dispatch = useDispatch();

  if (isLoadingLayers) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <PageLoader /> Loading your layers...
      </div>
    );
  }

  return (
    <div
      className={`w-full transition-all ${
        isLoadingLayers
          ? "translate-x-10 opacity-0"
          : "translate-x-0 opacity-100"
      }`}
    >
      <Tab.Group>
        <Tab.List className="sticky top-0 z-[2] flex w-full items-center justify-center space-x-1 rounded border-b bg-white p-3 dark:border-gray-500 dark:bg-[color:var(--dark)]">
          <div className="flex w-fit items-center gap-2">
            {["Mixer", "Settings", "Generated", "Share"].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded py-2 px-16 text-sm font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:border-gray-500",
                    selected
                      ? "border bg-indigo-100 font-bold dark:bg-gray-600 dark:text-white"
                      : "border text-gray-500 hover:bg-gray-50  dark:bg-[rgba(255,255,255,0.05)] dark:text-gray-300 dark:backdrop-blur "
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
              <SelectFolder className="mt-96 w-[length:calc(100vw-30rem)] flex-1" />
            )}

            {layers.length > 0 && (
              <div className="flex w-full flex-col-reverse justify-between gap-10 2xl:flex-row">
                <div className=" w-full overflow-y-hidden border-r dark:border-gray-500">
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
                              onChange={() => {
                                //
                              }}
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
                <div className="sticky top-4 flex h-10 items-start justify-center px-4 2xl:w-[40%]">
                  <section className="flex flex-col justify-center">
                    <NFTPreview className="mt-10" />
                    <GenerateToken />
                  </section>
                </div>
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel className="dark:text-gray-400">
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
