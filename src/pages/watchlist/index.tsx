/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import dayjs from "dayjs";
import { getFirestore } from "firebase/firestore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { firebaseApp } from "@/lib/firebase";
import { usePageLoader } from "@/hooks/pageloader";
import useAuthenticationDialog from "@/hooks/UseAuthDialog";

import Layout from "@/components/layout/Layout";
import ExploreCategories from "@/components/pages/landing/categories";

import { getRandomAvatar } from "@/utils/GetRandomAvatar";

import { Collection } from "@/types";

const firestore = getFirestore(firebaseApp);
export default function WatchList() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [animateIntoView, setAnimateIntoView] = useState(false);
  const [loadingWatchList, setLoadingWatchList] = useState(true);

  const { Loader, state, setState } = usePageLoader();

  const { account, AuthDialog, isAuthenticated, setShowAuthDialog } =
    useAuthenticationDialog();

  const router = useRouter();

  const { category } = router.query;

  const [sort, setSort] = useState<{ sortBy: string; isAsc: boolean }>({
    sortBy: "presaleMintDate",
    isAsc: true,
  });

  const [selectedCategory, setSelectedCategory] = useState("all");

  async function getUserWatchList() {
    setLoadingWatchList(true);
    setAnimateIntoView(false);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_ENDPOINT}/User/watchlist?walletId=${account}`
      );

      setCollections(data);

      setTimeout(() => {
        setLoadingWatchList(false);
        setAnimateIntoView(true);
      }, 1000);
    } catch (error) {
      setLoadingWatchList(false);
      setAnimateIntoView(false);
    }
  }

  useEffect(() => {
    if (!account) return;
    getUserWatchList();
  }, [account]);

  const soonWrapperElement = useRef<any>(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const scrollButtonAnim = gsap.from("#soon-text", {
      // rotate:-15,
      y: 800,
      // opacity: 0,

      scrollTrigger: {
        trigger: "#soon-text",
        start: "top 100%",
        end: "top start",
        toggleActions: "restart pause resume reverse",
        scrub: 0.8,
        // markers: true,
      },
    });

    return () => {
      scrollButtonAnim.kill();
    };
  }, []);

  useEffect(() => {
    if (!category) return;
    setSelectedCategory(category as string);
  }, [category]);

  if (!account || !isAuthenticated) {
    return (
      <Layout>
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center gap-5 px-10 text-center">
          <AuthDialog />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            Connect your wallet to view your watchlist
          </div>
          <div
            onClick={() => {
              setShowAuthDialog(true);
            }}
            className="gradient-button"
          >
            Connect your wallet
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {!collections ? (
        <></>
      ) : (
        <div ref={soonWrapperElement} className="contained mt-10">
          {/* {loadingWatchList && <PageLoader />} */}
          {state && <Loader />}

          <strong className="flex  flex-col gap-3 stroke-black text-2xl dark:stroke-white md:text-3xl">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span
                className={`transition-all ${
                  animateIntoView
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-3 opacity-0"
                }`}
              >
                {selectedCategory != "null"
                  ? collections.filter((item) => {
                      if (selectedCategory == "all" || !selectedCategory)
                        return item.projectType;
                      else return item.projectType == selectedCategory;
                    }).length
                  : collections.length}
              </span>
            </div>
            <span className="flex flex-row capitalize">My Watchlist</span>
          </strong>

          <div className={`mt-3 flex flex-col transition-all `}>
            <div
              className={` w-fit rounded-lg bg-gray-100 px-5 py-5 transition-all dark:bg-gray-700 ${
                collections.filter((item) => item.preMintDate).length < 1
                  ? "hidden h-0 opacity-0"
                  : "mt-10 h-fit opacity-100"
              }`}
            >
              <div className="text-2xl font-semibold">Launching Soon</div>

              <div className="mt-5 flex gap-5 overflow-auto">
                {collections
                  .filter((item) => item.preMintDate)
                  .sort((a: any, b: any) =>
                    b.preMintDate.localeCompare(a.preMintDate)
                  )
                  .map((item, index) => (
                    <div
                      onClick={() => {
                        setState(true);
                        router.push(`/collection/${item.slug}`);
                      }}
                      key={index}
                      className="flex cursor-pointer flex-col items-center gap-3 transition-all"
                    >
                      <div className="flex-shrink-0 rounded-[50%] bg-gray-200">
                        <img
                          className="h-16 w-16 rounded-[50%] object-cover"
                          src={item.image ?? getRandomAvatar(item.owner)}
                          alt=""
                        />
                      </div>
                      <div>
                        {dayjs(new Date(item.preMintDate!)).format(
                          "DD/MM/YYYY"
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <ExploreCategories
              dismissible
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <div
              id="soon-text"
              className="absolute -translate-x-[22rem] translate-y-[25rem] -rotate-90 text-8xl text-gray-200 dark:text-gray-700 lg:text-[6rem]"
            >
              My Watchlist
            </div>

            <div className="mt-5 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="mt-5 overflow-hidden shadow sm:rounded-lg">
                  <table className="min-w-full rounded-lg dark:border-2 dark:border-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                        >
                          <div className="flex items-center">
                            Collection Name
                            <svg
                              onClick={() => {
                                setSort({
                                  sortBy: "name",
                                  isAsc: !sort.isAsc,
                                });
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 cursor-pointer transition-all hover:scale-110 ${
                                sort.sortBy == "name" && sort.isAsc
                                  ? "rotate-180"
                                  : "rotate-0"
                              } `}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="flex flex-row items-center py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200"
                        >
                          Presale Mint Date & Time
                          <svg
                            onClick={() => {
                              setSort({
                                sortBy: "preMintDate",
                                isAsc: !sort.isAsc,
                              });
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 cursor-pointer transition-all hover:scale-110 ${
                              sort.sortBy == "preMintDate" && sort.isAsc
                                ? "rotate-180"
                                : "rotate-0"
                            } `}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </th>
                        <th
                          scope="col"
                          className=" py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200"
                        >
                          <div className="flex items-center">
                            Public Mint Date & Time
                            <svg
                              onClick={() => {
                                setSort({
                                  sortBy: "publicMintDate",
                                  isAsc: !sort.isAsc,
                                });
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 cursor-pointer transition-all hover:scale-110 ${
                                sort.sortBy == "publicMintDate" && sort.isAsc
                                  ? "rotate-180"
                                  : "rotate-0"
                              } `}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                        >
                          Whitelist Available
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                        >
                          Team Info
                        </th>
                        <th
                          scope="col"
                          className="flex items-center py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200"
                        >
                          Project Type
                          <svg
                            onClick={() => {
                              setSort({
                                sortBy: "projectType",
                                isAsc: !sort.isAsc,
                              });
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 cursor-pointer transition-all hover:scale-110 ${
                              sort.sortBy == "projectType" && sort.isAsc
                                ? "rotate-180"
                                : "rotate-0"
                            } `}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={`transition-all  ${
                        animateIntoView ? "hidden" : ""
                      }`}
                    >
                      {/* Shimmer effects for loading state */}
                      {[...Array(5)].map((item, index) => (
                        <tr
                          key={index}
                          className="animate-pulse cursor-pointer border-b "
                        >
                          <td className="flex items-center gap-5 whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900">
                            <div className="h-10 w-10 flex-shrink-0 rounded-[50%] bg-gray-200"></div>
                            <div>
                              <div className="w-48 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                              <div className="mt-2 w-48 whitespace-nowrap rounded-lg bg-gray-200 py-2 text-sm text-gray-500 dark:text-gray-200"></div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-200 ">
                            <div className="w-48 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                          </td>
                          <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-200 ">
                            <div className="w-48 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                          </td>
                          <td className="whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                            <div className="w-36 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                          </td>
                          <td className="whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                            <div className="w-36 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                          </td>
                          <td className="whitespace-nowrap py-4 px-6 text-sm capitalize text-gray-500 dark:text-gray-200 ">
                            <div className="w-36 whitespace-nowrap rounded-lg bg-gray-200 py-3 text-sm text-gray-500 dark:text-gray-200"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tbody className={`${!animateIntoView ? "hidden" : ""}`}>
                      {collections &&
                        collections
                          .filter((item) => {
                            if (selectedCategory == "all" || !selectedCategory)
                              return item.projectType;
                            else return item.projectType == selectedCategory;
                          })
                          .sort((a: any, b: any) => {
                            switch (sort.sortBy) {
                              case "name":
                                if (sort.isAsc) {
                                  return ("" + a.name).localeCompare(
                                    b.name ?? ""
                                  );
                                }
                                return ("" + b.name).localeCompare(
                                  a.name ?? ""
                                );

                              case "projectType":
                                if (sort.isAsc) {
                                  return ("" + a.projectType).localeCompare(
                                    b.projectType ?? ""
                                  );
                                }
                                return ("" + b.projectType).localeCompare(
                                  a.projectType ?? ""
                                );

                              case "preMintDate":
                                if (sort.isAsc) {
                                  return a.preMintDate.localeCompare(
                                    b.preMintDate
                                  );
                                }
                                return b.preMintDate.localeCompare(
                                  a.preMintDate
                                );

                              case "publicMintDate":
                                if (sort.isAsc) {
                                  return a.preMintDate?.localeCompare(
                                    b.preMintDate!
                                  );
                                }
                                return b.preMintDate?.localeCompare(
                                  a.preMintDate!
                                );

                              default:
                                if (sort.isAsc) {
                                  return ("" + a.preMintDate).localeCompare(
                                    b.preMintDate ?? ""
                                  );
                                }
                                return ("" + b.preMintDate).localeCompare(
                                  a.preMintDate ?? ""
                                );
                            }
                          })
                          .map((collection, index) => (
                            <tr
                              key={index}
                              onClick={() => {
                                setState(true);
                                router.push(`/collection/${collection.slug}`);
                              }}
                              className="cursor-pointer border-b transition-all hover:bg-gray-50 dark:bg-[#121212] dark:hover:bg-gray-700"
                            >
                              <td className="flex items-center gap-5 whitespace-nowrap border-r py-4 px-6 text-sm font-medium text-gray-900">
                                <div className="h-10 w-10 flex-shrink-0 rounded-[50%] bg-gray-100">
                                  <img
                                    className="h-full w-full rounded-[50%] object-cover"
                                    src={
                                      collection.image ??
                                      getRandomAvatar(collection.owner)
                                    }
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <div className="text-md dark:text-white">
                                    {collection.name}
                                  </div>
                                  <div className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-200 ">
                                    <span>{collection.supply}</span>
                                    <span>&nbsp;circulating supply</span>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap border-r py-4 px-6 text-sm text-gray-500 dark:text-gray-200">
                                {collection.preMintDate
                                  ? dayjs(
                                      new Date(collection.preMintDate!)
                                    ).format("DD/MM/YYYY, HH : MM")
                                  : "N/A"}
                              </td>
                              <td className="whitespace-nowrap border-r py-4 px-6 text-sm text-gray-500 dark:text-gray-200">
                                {collection.publicMintDate
                                  ? dayjs(
                                      new Date(collection.publicMintDate!)
                                    ).format("DD/MM/YYYY, HH : MM ")
                                  : "N/A"}
                              </td>
                              <td className="whitespace-nowrap border-r py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                                {collection.whitelistAvailable == "yes"
                                  ? "true"
                                  : "false"}
                              </td>
                              <td className="whitespace-nowrap border-r py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                                {collection.teamInfo ? "true" : "false"}
                              </td>
                              <td className="whitespace-nowrap py-4 px-6 text-sm capitalize text-gray-500 dark:text-gray-200 ">
                                {collection.projectType}
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-center text-center">
                    {collections.filter((item) => {
                      if (selectedCategory == "all" || !selectedCategory)
                        return item.projectType;
                      else return item.projectType == selectedCategory;
                    }).length < 1 && (
                      <span className="py-10">
                        No Collection matches this filter
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
