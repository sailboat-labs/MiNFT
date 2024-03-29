/* eslint-disable @next/next/no-img-element */
import LaunchPadSkeleton from "features/launch/components/launch-skeleton";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { IProjectLaunch } from "@/interfaces";
import { firestore } from "@/pages/dashboard";

import FAQ from "../faq";
import LaunchHeader from "../LaunchHeader";
import WhitelistRegistration from "../whitelist-registration";
import WhitelistVerify from "../whitelist-verification/whitelist-verification";

type props = {
  session: "draft" | "published";
};

export default function ProjectLaunch({ session }: props) {
  const [activeTab, setActiveTab] = useState<string>("roadmap");

  const [launchInformation, setLaunchInformation] = useState<IProjectLaunch>();
  const [isProjectExists, setIsProjectExists] = useState(true);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [animateLaunchIn, setAnimateLaunchIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoadingProject(true);
    if (!router.query.project) return;

    const _doc = doc(
      firestore,
      `Projects/${router.query.project}/Launchpad/${session}`
    );

    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setIsProjectExists(snapshot.exists());
      setLaunchInformation(snapshot.data() as IProjectLaunch);
      setTimeout(() => {
        setAnimateLaunchIn(true);
      }, 1000);
    });

    setIsLoadingProject(false);

    return () => {
      unsubscribe();
    };
  }, [router.query]);

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      (window as any).ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  if (!isProjectExists)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        That&apos;s weird. We can&apos;t find this launch. Confirm the link once
        more
      </div>
    );

  return (
    <div className="mb-20">
      <LaunchHeader />

      <div
        className={`pointer-events-none absolute w-screen transition-all duration-200 ${
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
        {
          <div className="h-screen overflow-y-auto">
            <div className="">
              <section>
                <div className="container mx-auto mt-20 max-w-[1664px]  px-6 py-24 lg:grid lg:grid-cols-2">
                  {/* left side */}
                  <article className="md:pr-12 lg:pr-32">
                    <h1 className="text-6xl font-extrabold">
                      {launchInformation?.projectName}
                    </h1>
                    <div className="my-4 inline-flex items-center gap-3 text-sm">
                      <div className="rounded border border-pink-500 py-1 px-2 text-pink-500 ">
                        {launchInformation?.contractType}
                      </div>
                      <div className="rounded border border-pink-500 py-1 px-2 text-pink-500 ">
                        {launchInformation?.startTimeStamp.replace("T", " at ")}
                      </div>
                      <div className="flex items-center gap-2 rounded border border-gray-300 py-1 px-2 text-gray-400 ">
                        <span>Total items:</span>
                        <strong className=" font-semibold text-gray-700">
                          {launchInformation?.totalQuantity}
                        </strong>
                      </div>
                      <div className="flex items-center gap-2 rounded border border-gray-300 py-1 px-2 text-gray-400 ">
                        <span>Price:</span>
                        <strong className=" font-semibold text-gray-700">
                          {launchInformation?.mintPrice}ETH
                        </strong>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {launchInformation?.twitterLink &&
                        launchInformation?.twitterLink?.length > 0 && (
                          <div
                            onClick={() => {
                              window.open(launchInformation?.twitterLink);
                            }}
                            className="flex w-fit cursor-pointer items-center gap-1 rounded-xl border-2 py-1 pl-2 pr-4 text-sm transition-transform hover:scale-105"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                            Twitter
                          </div>
                        )}

                      {launchInformation?.links?.map((link, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            window.open(link.link);
                          }}
                          className="flex w-fit cursor-pointer items-center gap-1 rounded-xl border-2 py-1 pl-2 pr-4 text-sm transition-transform hover:scale-105"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                          {link.label}
                        </div>
                      ))}

                      {launchInformation?.contractAddress &&
                        launchInformation.contractAddress?.length > 0 && (
                          <div
                            onClick={() => {
                              window.open(launchInformation.contractAddress);
                            }}
                            className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border-2 py-1 pl-2 pr-4 text-sm transition-transform hover:scale-105"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Contract
                          </div>
                        )}
                    </div>
                    <p className="my-4">{launchInformation?.summary}</p>

                    <div className="mt-6 grid grid-rows-2 gap-5">
                      {launchInformation?.hasWhitelist && (
                        <div className=" rounded-2xl  p-4 ring-1 ring-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-medium  rounded-full bg-gray-100 py-1 px-2 text-sm text-gray-700 ring-1 ring-gray-200">
                              Whitelist Mint
                            </span>
                            {/* <span className="font-semibold text-pink-500">
                              ENDED
                            </span> */}
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
                                {launchInformation.mintPerWallet} TOKENS
                              </strong>
                            </span>{" "}
                            •{" "}
                            <span>Price {launchInformation.mintPrice} ETH</span>
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
                          <span>{launchInformation?.totalQuantity}</span> •{" "}
                          <span>Price {launchInformation?.mintPrice} ETH</span>
                        </p>
                      </div>

                      {launchInformation?.hasWhitelist && (
                        <WhitelistRegistration
                          session={session}
                          launchInformation={launchInformation}
                        />
                      )}
                    </div>
                  </article>
                  {/* right side */}
                  <article className="mt-20 mb-20 ml-20 lg:mt-0">
                    <figure className="h-fit w-auto overflow-hidden rounded-2xl">
                      <img
                        className="h-auto w-full"
                        src={launchInformation?.mainImage}
                        alt=""
                      />
                    </figure>
                  </article>
                </div>
              </section>
              {launchInformation?.hasWhitelist && <WhitelistVerify />}
              <section className="bg-gray-100">
                <div className="container mx-auto grid max-w-[1664px] gap-10  px-6  py-20 md:grid-cols-2">
                  <article className=" md:pr-12 lg:pr-32">
                    <h1 className="text-6xl font-extrabold">
                      {launchInformation?.projectName}
                    </h1>
                    <figure className="mt-8 grid h-fit w-fit grid-cols-3 gap-3 overflow-hidden rounded-2xl">
                      {launchInformation?.secondaryImage &&
                        launchInformation?.secondaryImage.map((item, index) => (
                          <img
                            key={index}
                            className="h-52 w-52 object-cover"
                            src={item}
                            alt=""
                          />
                        ))}
                    </figure>
                    <p className="my-5 mt-8 text-gray-500">
                      {launchInformation?.description}
                    </p>
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
                          {!launchInformation?.roadmap ||
                            (launchInformation?.roadmap?.length < 1 && (
                              <div className="mb-10">No roadmap</div>
                            ))}

                          {launchInformation?.roadmap &&
                            launchInformation?.roadmap.map((item, index) => (
                              <div key={index}>
                                <strong>{item.title}</strong>
                                <ul className=" mb-6 list-disc text-gray-600">
                                  <li>{item.description}</li>
                                </ul>
                              </div>
                            ))}
                        </>
                      ) : (
                        <p>{launchInformation?.team}</p>
                      )}
                    </div>
                  </article>
                </div>
              </section>
              {launchInformation?.faq && (
                <FAQ launchInformation={launchInformation} />
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
