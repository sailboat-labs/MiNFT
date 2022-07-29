/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import PageLoader from "@/components/shared/PageLoader";

import ExploreCategories from "./categories";

import { Collection } from "@/types";

const firestore = getFirestore(firebaseApp);
export default function LaunchingSoon() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [animateIntoView, setAnimateIntoView] = useState(false);

  const router = useRouter();

  const [sort, setSort] = useState<{ sortBy: string; isAsc: boolean }>({
    sortBy: "presaleMintDate",
    isAsc: true,
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const _query = query(
    collection(firestore, "collections"),
    orderBy("lastUpdated", "desc"),
    limit(15)
  );
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: Collection[], curr: DocumentData) => {
      acc.push(curr as Collection);
      return acc;
    }, []);

    setCollections(data);
    setTimeout(() => {
      setAnimateIntoView(true);
    }, 500);
  }, [loading, snapshots]);

  const soonWrapperElement = useRef<any>(null);
  const q = gsap.utils.selector(soonWrapperElement);
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

  return (
    <div ref={soonWrapperElement} className="contained mt-10">
      {loadingCollection && <PageLoader />}

      <div className={`mt-3 flex flex-col transition-all `}>
        <ExploreCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div
          id="soon-text"
          className="absolute -translate-x-[25rem] translate-y-[25rem] -rotate-90 text-8xl text-gray-200 dark:text-gray-700 lg:text-[6rem]"
        >
          Launching Soon
        </div>

        <div className="mt-10 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <strong className="mb-5 flex w-full flex-col justify-between lg:gap-3">
              <div className="gradient-header">Launching Soon</div>
              <Link passHref href="/collections">
                <div className="gradient-button text-sm font-normal">
                  All Collections
                </div>
              </Link>
            </strong>
            <div className="mt-5 overflow-hidden shadow sm:rounded-lg">
              <table className="min-w-full rounded-lg dark:border-2 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {/* Collection */}
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                    >
                      <div className="flex items-center">
                        Collection
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

                    {/* Presale mint date and time */}
                    <th
                      scope="col"
                      className="flex flex-row items-center py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200"
                    >
                      Presale Mint
                      <br /> Date & Time
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

                    {/* Public mint date and time */}
                    <th
                      scope="col"
                      className=" py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200"
                    >
                      <div className="flex items-center">
                        Public Mint <br /> Date & Time
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

                    {/* Whitelist */}
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                    >
                      Whitelist
                    </th>

                    {/* Team Info */}
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                    >
                      Team Info
                    </th>

                    {/* Project Type */}
                    <th
                      scope="col"
                      className=" py-0 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200"
                    >
                      <div className="flex items-center justify-center gap-2">
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
                      </div>
                    </th>

                    {/* Comments */}
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                    >
                      <div className="flex items-center">
                        Comments
                        <svg
                          onClick={() => {
                            setSort({
                              sortBy: "commentCount",
                              isAsc: !sort.isAsc,
                            });
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 cursor-pointer transition-all hover:scale-110 ${
                            sort.sortBy == "commentCount" && sort.isAsc
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

                    {/* favorited */}
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                    >
                      <div className="flex items-center">
                        Favorited
                        <svg
                          onClick={() => {
                            setSort({
                              sortBy: "favorited",
                              isAsc: !sort.isAsc,
                            });
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 cursor-pointer transition-all hover:scale-110 ${
                            sort.sortBy == "commentCount" && sort.isAsc
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
  );
}
