/* eslint-disable @next/next/no-img-element */
import { Tab } from "@headlessui/react";
import { classNames } from "features/traitmixer/components";
import { doc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import Button from "@/components/buttons/Button";
import PageLoader from "@/components/shared/PageLoader";

import { IProject, IProjectLaunch } from "@/interfaces";
import { firestore } from "@/pages/dashboard";

import MoreConfiguration from "./components/more-configuration";
import PublishLaunchPad from "./components/publish-launchpad";
import saveLaunchPadDraft from "./launchpad-config.logic";

const LaunchpadConfig: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>("roadmap");
  const project = useSelector(getProjectState) as IProject;

  const [launchInformation, setLaunchInformation] = useState<IProjectLaunch>();
  const [isLoadingLaunchInformation, setisLoadingLaunchInformation] =
    useState(true);

  //roadmap
  const [roadmap, setRoadmap] = useState<
    { title: string; description: string }[]
  >([]);
  const [roadMapTitle, setRoadMapTitle] = useState("");
  const [roadMapDescription, setRoadMapDescription] = useState("");
  const [isShowingAddNewRoadmap, setIsShowingAddNewRoadmap] = useState(false);

  //state
  const [showSavingDraftLoader, setShowSavingDraftLoader] = useState(false);

  useEffect(() => {
    const _doc = doc(firestore, `Projects/${project.slug}/Launchpad/draft`);
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setLaunchInformation(snapshot.data() as IProjectLaunch);
      setRoadmap((snapshot.data() as IProjectLaunch)?.roadmap);
      setisLoadingLaunchInformation(false);
      console.log({ data: snapshot.data() });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function handleSaveLaunchPadDraft(
    field: string,
    value: string | boolean | { title: string; description: string }[]
  ) {
    setShowSavingDraftLoader(true);
    const saveDraft = await saveLaunchPadDraft(project, field, value);

    if (!saveDraft)
      toast.error(
        "Error Ocurred while saving draft. Changes will not be saved"
      );

    setTimeout(() => {
      setShowSavingDraftLoader(false);
    }, 500);
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div
        className={`pointer-events-none fixed scale-75 bg-white transition-all ${
          showSavingDraftLoader || isLoadingLaunchInformation
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        <PageLoader className="h-[30px] w-[30px]" />
      </div>

      <Tab.Group>
        <Tab.List className="sticky top-0 z-[2] flex w-full items-center justify-center space-x-1 rounded border-b bg-white p-3">
          <div className="flex w-fit items-center gap-2">
            {["Builder", "More", "Publish"].map((category) => (
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
            <div className="">
              <section>
                <div className="container mx-auto mt-20 max-w-[1664px]  px-6 py-24 lg:grid lg:grid-cols-2">
                  {/* left side */}
                  <article className="md:pr-12 lg:pr-32">
                    <input
                      defaultValue={launchInformation?.projectName}
                      className="text-6xl font-extrabold"
                      placeholder="Project Name"
                      onChange={(e) => {
                        handleSaveLaunchPadDraft("projectName", e.target.value);
                      }}
                    />
                    <div className="my-4 grid grid-cols-2 items-center gap-3 text-sm xl:grid-cols-4">
                      <input
                        defaultValue={launchInformation?.contractType}
                        onChange={(e) => {
                          handleSaveLaunchPadDraft(
                            "contractType",
                            e.target.value
                          );
                        }}
                        className="rounded border border-pink-500 py-1 px-2 text-pink-500 "
                        placeholder="Mint Type eg. Classic Mint"
                      />
                      <input
                        defaultValue={launchInformation?.startTimeStamp}
                        onChange={(e) => {
                          handleSaveLaunchPadDraft(
                            "startTimeStamp",
                            e.target.value
                          );
                        }}
                        className="rounded border border-pink-500 py-1 px-2 text-pink-500 "
                        placeholder="Mint date"
                      />

                      <div className="flex items-center gap-1 rounded border border-gray-300 py-1 px-2 text-gray-400 ">
                        <span className="flex">
                          Total <span className="block">&nbsp;Items</span>:
                        </span>
                        <input
                          defaultValue={launchInformation?.totalQuantity}
                          onChange={(e) => {
                            handleSaveLaunchPadDraft(
                              "totalQuantity",
                              e.target.value
                            );
                          }}
                          className="w-20 font-semibold"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex items-center gap-2 rounded border border-gray-300 py-1 px-2 text-gray-400 ">
                        <span>Price:</span>
                        <input
                          defaultValue={launchInformation?.mintPrice}
                          onChange={(e) => {
                            handleSaveLaunchPadDraft(
                              "mintPrice",
                              e.target.value
                            );
                          }}
                          className="w-10 font-semibold"
                          placeholder="0.1"
                        />
                      </div>
                    </div>
                    <p className="my-4">
                      <textarea
                        defaultValue={launchInformation?.summary}
                        onChange={(e) => {
                          handleSaveLaunchPadDraft("summary", e.target.value);
                        }}
                        className="w-full rounded border-none py-2 pr-2 pl-0"
                        placeholder="Project Summary..."
                      ></textarea>
                    </p>
                    {/* <p>
                Read our&nbsp;
                <Link href="/terms-and-conditions">
                  <a className="relative font-medium text-pink-500 before:absolute before:top-full before:left-0 before:h-[2px] before:w-0 before:bg-pink-400 before:transition-all before:duration-150 before:hover:w-full">
                    terms & conditions
                  </a>
                </Link>
              </p> */}
                    <div className="mt-6 grid grid-rows-2 gap-5">
                      {launchInformation && launchInformation.hasWhitelist && (
                        <div className=" rounded-2xl  p-4 ring-1 ring-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-medium  rounded-full bg-gray-100 py-1 px-2 text-sm text-gray-700 ring-1 ring-gray-200">
                              Whitelist Mint
                            </span>
                            <span className="font-semibold text-pink-500">
                              ENDED
                            </span>
                          </div>
                          <p className="mt-6 text-sm">
                            <span>
                              WHITELIST{" "}
                              <strong className="font-semibold">4463</strong>
                            </span>{" "}
                            •{" "}
                            <span>
                              MAX{" "}
                              <strong className="font-semibold">
                                3 TOKENS
                              </strong>
                            </span>{" "}
                            • <span>Price 1 ETH</span>
                          </p>
                        </div>
                      )}
                      <div className=" mb-20  rounded-2xl p-4 ring-1 ring-pink-400">
                        <div className="flex items-center justify-between">
                          <span className="text-medium  rounded-full bg-gray-100 py-1 px-2 text-sm text-gray-700 ring-1 ring-gray-200">
                            Public
                          </span>
                        </div>
                        <p className="mt-6 text-sm">
                          <span>10,000</span> • <span>Price 1 ETH</span>
                        </p>
                      </div>
                    </div>
                  </article>
                  {/* right side */}
                  <article className="mt-20 mb-20 ml-20 lg:mt-0">
                    <figure className="overflow-hidden rounded-2xl">
                      <img
                        className="h-auto w-full"
                        src="/images/launch-project.gif"
                        alt=""
                      />
                    </figure>
                  </article>
                </div>
              </section>
              <section className="bg-gray-100 pb-20">
                <div className="container mx-auto grid max-w-[1664px] gap-10  px-6  py-24 md:grid-cols-2">
                  <article className="mt-20 w-full md:pr-12 lg:pr-32">
                    <input
                      className="w-full bg-gray-100 text-6xl font-extrabold"
                      placeholder="Project Name"
                      defaultValue={launchInformation?.projectName}
                      onChange={(e) => {
                        handleSaveLaunchPadDraft("projectName", e.target.value);
                      }}
                    />
                    <textarea
                      defaultValue={launchInformation?.description}
                      onChange={(e) => {
                        handleSaveLaunchPadDraft("description", e.target.value);
                      }}
                      className="my-5 w-full rounded border-none bg-gray-100 pl-0 text-gray-500"
                      placeholder="Project Description"
                    ></textarea>
                  </article>
                  <article className="mt-20">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setActiveTab("roadmap")}
                        className={`py-2 pr-4 font-semibold ${
                          activeTab == "roadmap" && "border-b-2 border-pink-500"
                        }`}
                      >
                        Roadmap
                      </button>
                      <button
                        onClick={() => setActiveTab("team")}
                        className={`px-4 py-2 font-semibold ${
                          activeTab == "team" && "border-b-2 border-pink-500"
                        }`}
                      >
                        Team
                      </button>
                    </div>
                    <div className="mt-6">
                      {activeTab === "roadmap" ? (
                        <>
                          {roadmap.length < 1 && (
                            <div className="mb-10">No roadmap</div>
                          )}

                          {roadmap.map((item, index) => (
                            <div key={index}>
                              <strong>{item.title}</strong>
                              <ul className="ml-6 mb-6 list-disc text-gray-600">
                                <li>{item.description}</li>
                              </ul>
                            </div>
                          ))}

                          {isShowingAddNewRoadmap ? (
                            <div className="flex flex-col rounded-lg bg-gray-200 p-5">
                              <div>Add new roadmap item</div>
                              <input
                                value={roadMapTitle}
                                onChange={(e) => {
                                  setRoadMapTitle(e.target.value);
                                }}
                                className="mt-3 rounded bg-gray-100 px-3"
                                placeholder="title"
                              />
                              <textarea
                                value={roadMapDescription}
                                onChange={(e) => {
                                  setRoadMapDescription(e.target.value);
                                }}
                                className=" mt-4 rounded-lg border-none bg-gray-100 text-gray-600"
                                placeholder="description"
                              ></textarea>

                              <div className="mt-5 flex w-full justify-end gap-3">
                                <Button
                                  onClick={() => {
                                    setIsShowingAddNewRoadmap(false);
                                  }}
                                  className="cursor-pointer rounded-lg bg-white px-5 py-2 text-indigo-600"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleAddNewRoadMap();
                                  }}
                                  className="cursor-pointer rounded-lg bg-indigo-500 px-5 py-2 text-white"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              onClick={() => {
                                setIsShowingAddNewRoadmap(true);
                              }}
                              className="cursor-pointer rounded-lg bg-indigo-500 px-5 py-2 text-white"
                            >
                              Add new roadmap
                            </Button>
                          )}
                        </>
                      ) : (
                        <textarea
                          onChange={(e) => {
                            handleSaveLaunchPadDraft("team", e.target.value);
                          }}
                          defaultValue={launchInformation?.team}
                          className="rounded-lg border-none bg-gray-100"
                          placeholder="Team information... "
                        />
                      )}
                    </div>
                  </article>
                </div>
              </section>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <MoreConfiguration launchInformation={launchInformation} />
          </Tab.Panel>
          <Tab.Panel>
            <PublishLaunchPad />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );

  function handleAddNewRoadMap() {
    toast.dismiss();
    if (roadMapTitle.length < 1 || roadMapDescription.length < 1)
      return toast.error("Enter roadmap title and description");
    handleSaveLaunchPadDraft("roadmap", [
      ...roadmap,
      { title: roadMapTitle, description: roadMapDescription },
    ]);
    setRoadmap([
      ...roadmap,
      { title: roadMapTitle, description: roadMapDescription },
    ]);

    setRoadMapDescription("");
    setRoadMapTitle("");
  }
};

export default LaunchpadConfig;
