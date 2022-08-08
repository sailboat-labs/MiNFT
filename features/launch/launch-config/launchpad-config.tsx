/* eslint-disable @next/next/no-img-element */
import { Tab } from "@headlessui/react";
import { classNames } from "features/traitmixer/components";
import { doc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import Button from "@/components/buttons/Button";
import UploadButton from "@/components/buttons/Upload";
import CustomSelect from "@/components/input-controls/CustomSelect";
import PageLoader from "@/components/shared/PageLoader";

import { IProject, IProjectLaunch } from "@/interfaces";
import { firestore } from "@/pages/dashboard";

import MoreConfiguration from "./components/more-configuration";
import PublishLaunchPad from "./components/publish-launchpad";
import saveLaunchPadDraft, {
  handleLaunchImageUpload,
} from "./launchpad-config.logic";
import LaunchPadSkeleton from "../components/launch-skeleton";

const CONTRACT_TYPES = [
  {
    name: "Classic Mint",
    label: "Classic Mint",
  },
  {
    name: "Dutch Auction",
    label: "Dutch Auction",
  },
  {
    name: "Fair Dutch Auction",
    label: "Fair Dutch Auction",
  },
  {
    name: "Classic Mint with whitelist",
    label: "Classic Mint with whitelist",
  },
  {
    name: "Dutch Auction with whitelist",
    label: "Dutch Auction with whitelist",
  },
  {
    name: "Fair Dutch Auction with whitelist",
    label: "Fair Dutch Auction with whitelist",
  },
  {
    name: "Pure whitelist",
    label: "Pure whitelist",
  },
];

const LaunchpadConfig: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>("roadmap");
  const project = useSelector(getProjectState) as IProject;
  const [mainImage, setMainImage] = useState<File>();
  const [secondaryImage, setSecondaryImage] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const fileInputSecondaryImage = useRef<HTMLInputElement>(null);
  const [animateLaunchIn, setAnimateLaunchIn] = useState(false);

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
      setTimeout(() => {
        setAnimateLaunchIn(true);
      }, 1000);
      console.log({ data: snapshot.data() });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function handleSaveLaunchPadDraft(
    field: string,
    value:
      | string
      | boolean
      | { title: string; description: string }[]
      | string[]
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

  async function handleFileChanged(
    evt: ChangeEvent<HTMLInputElement>,
    imageType: "main" | "secondary"
  ) {
    setShowSavingDraftLoader(true);
    console.log("saving");

    const fileListArray: File[] = [];
    const files: FileList | null = evt.target.files;
    // console.log(files?.length);
    if (files !== null) {
      for (let index = 0; index < files.length; index++) {
        fileListArray.push(files[index]);
      }
    }

    if (fileListArray.length < 1) return;

    if (imageType == "main") {
      setMainImage(fileListArray[0]);

      const url = await handleLaunchImageUpload(
        project,
        fileListArray[0],
        "draft",
        "mainImage"
      );
      if (!url) return toast.error("Could not upload image");
      await handleSaveLaunchPadDraft("mainImage", url as string);
    } else {
      setSecondaryImage(fileListArray);

      const downloadUrls: string[] = [];

      for (let index = 0; index < fileListArray.length; index++) {
        const element = fileListArray[index];
        const url = await handleLaunchImageUpload(
          project,
          element,
          "draft",
          `secondaryImage${index}`
        );
        if (!url) return toast.error("Could not upload image");
        downloadUrls.push(url as string);
      }
      await handleSaveLaunchPadDraft(`secondaryImage`, downloadUrls);
      setShowSavingDraftLoader(false);
    }

    console.log("saved");
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div
        className={`pointer-events-none fixed scale-75 bg-white transition-all dark:bg-[color:var(--dark)] ${
          showSavingDraftLoader || isLoadingLaunchInformation
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        <PageLoader className="h-[30px] w-[30px]" />
      </div>

      <div
        className={`pointer-events-none absolute -ml-52 w-full overflow-x-hidden  transition-all duration-200 ${
          animateLaunchIn ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <LaunchPadSkeleton />
      </div>

      <div
        className={`transition-all duration-300 ${
          animateLaunchIn ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
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
                          handleSaveLaunchPadDraft(
                            "projectName",
                            e.target.value
                          );
                        }}
                      />
                      <div className="my-4  grid grid-cols-2 flex-wrap items-center gap-3 text-sm ">
                        <CustomSelect
                          onChange={(value) => {
                            handleSaveLaunchPadDraft(
                              "contractType",
                              value.name as string
                            );
                          }}
                          wrapperClass="flex-1"
                          togglerClass="w-full py-1 border rounded bg-gray-50"
                          options={CONTRACT_TYPES}
                        />
                        {/* <input
                          defaultValue={launchInformation?.contractType}
                          onChange={(e) => {
                            handleSaveLaunchPadDraft(
                              "contractType",
                              e.target.value
                            );
                          }}
                          className="rounded border border-pink-500 py-1 px-2 text-pink-500 "
                          placeholder="Mint Type eg. Classic Mint"
                        /> */}
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
                            type="number"
                            className="w-20  py-0 px-2 text-sm font-semibold"
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
                            type="number"
                            className="w-20  py-0 px-2 text-sm font-semibold"
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
                      <figure className="h-[32rem] w-[26rem] overflow-hidden rounded-md bg-gray-50">
                        {/* <input
                          className="absolute h-20 rounded-lg "
                          type="file"
                          onChange={(event) => {
                            handleFileChanged(event, "main");
                          }}
                          accept="image/*"
                          ref={fileInput}
                        /> */}
                        <UploadButton
                          wrapperClass="h-fit w-full py-2 bg-gray-200"
                          onChange={(event) => {
                            handleFileChanged(event, "main");
                          }}
                          accept="image/*"
                          type="block"
                          label="Select new image"
                        />
                        <img
                          className="h-auto w-full object-cover"
                          src={
                            mainImage
                              ? URL.createObjectURL(mainImage)
                              : launchInformation?.mainImage
                          }
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
                          handleSaveLaunchPadDraft(
                            "projectName",
                            e.target.value
                          );
                        }}
                      />

                      <figure className="mt-10 w-fit">
                        <UploadButton
                          multiple
                          onChange={(event: any) => {
                            handleFileChanged(event, "secondary");
                          }}
                          accept="image/*"
                          desc="Select multiples of 3, up to 9, for best look"
                        />
                        {/* <input
                          className=" rounded-lg "
                          type="file"
                          onChange={(event: any) => {
                            handleFileChanged(event, "secondary");
                          }}
                          multiple
                          accept="image/*"
                          ref={fileInputSecondaryImage}
                        /> */}
                        {/* <div className="mt-8 ">
                          Select multiples of 3, up to 9, for best look
                        </div> */}

                        {secondaryImage.length > 0 ? (
                          <figure className="mt-4 mb-10  grid h-fit w-fit grid-cols-3 gap-3 overflow-hidden rounded-2xl">
                            {secondaryImage.map((item, index) => (
                              <div className="group relative" key={index}>
                                <img
                                  className="h-52 w-52 object-cover"
                                  src={URL.createObjectURL(item)}
                                  alt=""
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur transition-all duration-100 group-hover:opacity-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6  transform cursor-pointer transition-all duration-100 hover:scale-110"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="red"
                                    strokeWidth={2}
                                    onClick={() => alert("removing image")}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </div>
                              </div>
                            ))}
                          </figure>
                        ) : (
                          <figure className="mt-8 grid h-fit  w-fit grid-cols-3 gap-3 overflow-hidden rounded-2xl">
                            {launchInformation?.secondaryImage &&
                              launchInformation?.secondaryImage.map(
                                (item, index) => (
                                  <div className="group relative" key={index}>
                                    <img
                                      className="h-52 w-52 object-cover"
                                      src={item}
                                      alt=""
                                    />
                                    <div className="absolute inset-0 flex  items-center justify-center opacity-0 backdrop-blur transition-all duration-100 group-hover:opacity-100">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 transform cursor-pointer transition-all duration-100 hover:scale-110"
                                        fill="none"
                                        onClick={() => alert("removing image")}
                                        viewBox="0 0 24 24"
                                        stroke="red"
                                        strokeWidth={2}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                )
                              )}
                          </figure>
                        )}
                      </figure>
                      <textarea
                        defaultValue={launchInformation?.description}
                        onChange={(e) => {
                          handleSaveLaunchPadDraft(
                            "description",
                            e.target.value
                          );
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
                            activeTab == "roadmap" &&
                            "border-b-2 border-pink-500"
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
                            {roadmap && roadmap.length < 1 && (
                              <div className="mb-10">No roadmap</div>
                            )}

                            {roadmap &&
                              roadmap.map((item, index) => (
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
                                    Close
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
    </div>
  );

  function handleAddNewRoadMap() {
    toast.dismiss();
    if (roadMapTitle.length < 1 || roadMapDescription.length < 1)
      return toast.error("Enter roadmap title and description");
    if (roadmap) {
      handleSaveLaunchPadDraft("roadmap", [
        ...roadmap,
        { title: roadMapTitle, description: roadMapDescription },
      ]);
      setRoadmap([
        ...roadmap,
        { title: roadMapTitle, description: roadMapDescription },
      ]);
    } else {
      handleSaveLaunchPadDraft("roadmap", [
        { title: roadMapTitle, description: roadMapDescription },
      ]);
      setRoadmap([{ title: roadMapTitle, description: roadMapDescription }]);
    }

    setRoadMapDescription("");
    setRoadMapTitle("");
  }
};

export default LaunchpadConfig;
