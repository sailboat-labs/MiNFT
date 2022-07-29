/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/buttons/Button";

const LaunchpadConfig: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>("roadmap");

  //roadmap
  const [roadmap, setRoadmap] = useState<
    { title: string; description: string }[]
  >([]);
  const [roadMapTitle, setRoadMapTitle] = useState("");
  const [roadMapDescription, setRoadMapDescription] = useState("");
  const [isShowingAddNewRoadmap, setIsShowingAddNewRoadmap] = useState(false);

  useEffect(() => {
    // prepareContract();
  }, []);

  return (
    <div className="h-screen overflow-y-auto">
      <div className="">
        <section>
          <div className="container mx-auto mt-20 max-w-[1664px]  px-6 py-24 lg:grid lg:grid-cols-2">
            {/* left side */}
            <article className="md:pr-12 lg:pr-32">
              <input
                className="text-6xl font-extrabold"
                placeholder="Project Name"
              />
              <div className="my-4 grid grid-cols-2 items-center gap-3 text-sm xl:grid-cols-4">
                <input
                  className="rounded border border-pink-500 py-1 px-2 text-pink-500 "
                  placeholder="Mint Type eg. Classic Mint"
                />
                <input
                  className="rounded border border-pink-500 py-1 px-2 text-pink-500 "
                  placeholder="Mint date"
                />

                <div className="flex items-center gap-1 rounded border border-gray-300 py-1 px-2 text-gray-400 ">
                  <span className="flex">
                    Total <span className="block">&nbsp;Items</span>:
                  </span>
                  <input className="w-20 font-semibold" placeholder="0" />
                </div>
                <div className="flex items-center gap-2 rounded border border-gray-300 py-1 px-2 text-gray-400 ">
                  <span>Price:</span>
                  <input className="w-10 font-semibold" placeholder="0.1" />
                </div>
              </div>
              <p className="my-4">
                <textarea
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
                <div className=" rounded-2xl  p-4 ring-1 ring-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-medium  rounded-full bg-gray-100 py-1 px-2 text-sm text-gray-700 ring-1 ring-gray-200">
                      Whitelist Mint
                    </span>
                    <span className="font-semibold text-pink-500">ENDED</span>
                  </div>
                  <p className="mt-6 text-sm">
                    <span>
                      WHITELIST <strong className="font-semibold">4463</strong>
                    </span>{" "}
                    •{" "}
                    <span>
                      MAX <strong className="font-semibold">3 TOKENS</strong>
                    </span>{" "}
                    • <span>Price 1 ETH</span>
                  </p>
                </div>
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
            {/* <article className="mt-20 mb-20 ml-20 lg:mt-0">
              <figure className="overflow-hidden rounded-2xl">
                <img
                  className="h-auto w-full"
                  src="/images/launch-project.gif"
                  alt=""
                />
              </figure>
            </article> */}
          </div>
        </section>
        <section className="bg-gray-100 pb-20">
          <div className="container mx-auto grid max-w-[1664px] gap-10  px-6  py-24 md:grid-cols-2">
            <article className="mt-20 w-full md:pr-12 lg:pr-32">
              <input
                className="w-full bg-gray-100 text-6xl font-extrabold"
                placeholder="Project Name"
              />
              <textarea
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
                    className="rounded-lg border-none bg-gray-100"
                    placeholder="Team information... "
                  />
                )}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );

  function handleAddNewRoadMap() {
    toast.dismiss();
    if (roadMapTitle.length < 1 || roadMapDescription.length < 1)
      return toast.error("Enter roadmap title and description");
    setRoadmap([
      ...roadmap,
      { title: roadMapTitle, description: roadMapDescription },
    ]);

    setRoadMapDescription("");
    setRoadMapTitle("");
  }
};

export default LaunchpadConfig;
