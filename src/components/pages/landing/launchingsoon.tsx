/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  DocumentData,
  collection,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import { Collection } from "@/types";
import ExploreCategories from "./categories";
import Link from "next/link";
import PageLoader from "@/components/shared/PageLoader";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import dayjs from "dayjs";
import { firebaseApp } from "@/lib/firebase";
import { getRandomAvatar } from "@/utils/GetRandomAvatar";
import gsap from "gsap";
import useAuthenticationDialog from "@/hooks/UseAuthDialog";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

const firestore = getFirestore(firebaseApp);
export default function LaunchingSoon() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [animateIntoView, setAnimateIntoView] = useState(false);

  const { account, isAuthenticated } = useAuthenticationDialog();

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
            <strong className="flex flex-col items-start justify-between gap-4 text-xl md:flex-row md:items-center">
              Launching Soon
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
                            sortBy: "presaleMintDate",
                            isAsc: !sort.isAsc,
                          });
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 cursor-pointer transition-all hover:scale-110 ${
                          sort.sortBy == "presaleMintDate" && sort.isAsc
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

                {/* Table data */}
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
                              return ("" + a.name).localeCompare(b.name ?? "");
                            }
                            return ("" + b.name).localeCompare(a.name ?? "");

                          case "projectType":
                            if (sort.isAsc) {
                              return ("" + a.projectType).localeCompare(
                                b.projectType ?? ""
                              );
                            }
                            return ("" + b.projectType).localeCompare(
                              a.projectType ?? ""
                            );

                          case "presaleMintDate":
                            if (sort.isAsc) {
                              return a.preMintDate?.localeCompare(
                                b.preMintDate!
                              );
                            }
                            return b.preMintDate?.localeCompare(a.preMintDate!);

                          case "commentCount":
                            if (sort.isAsc) {
                              return (
                                (a.commentCount ?? 0) - (b.commentCount ?? 0)
                              );
                            }
                            return b.commentCount ?? 0 - a.commentCount ?? 0;

                          case "favorited":
                            if (sort.isAsc) {
                              return (
                                (a.favorited?.length ?? 0) -
                                (b.favorited?.length ?? 0)
                              );
                            }
                            return (
                              (b.favorited?.length ?? 0) -
                              (a.favorited?.length ?? 0)
                            );

                          case "publicMintDate":
                            if (sort.isAsc) {
                              return a.publicMintDate?.localeCompare(
                                b.publicMintDate!
                              );
                            }
                            return b.publicMintDate?.localeCompare(
                              a.publicMintDate!
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
                            setLoadingCollection(true);
                            router.push(`/collection/${collection.slug!}`);
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
                              ? dayjs(new Date(collection.preMintDate!)).format(
                                  "DD/MM/YYYY"
                                )
                              : "N/A"}
                          </td>
                          <td className="whitespace-nowrap border-r py-4 px-6 text-sm text-gray-500 dark:text-gray-200">
                            {collection.publicMintDate
                              ? dayjs(
                                  new Date(collection.publicMintDate!)
                                ).format("DD/MM/YYYY")
                              : "N/A"}
                          </td>
                          <td className="whitespace-nowrap border-r py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                            {collection.whitelistAvailable == "yes" ? (
                              <div className="w-fit rounded-md bg-green-600 stroke-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-fit rounded-md bg-red-600 stroke-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            )}
                          </td>
                          <td className="whitespace-nowrap border-r py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                            {collection.teamInfo ? (
                              <div className="w-fit rounded-md bg-green-600 stroke-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-fit rounded-md bg-red-600 stroke-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            )}
                          </td>
                          <td className="whitespace-nowrap border-r py-4 px-6 text-sm capitalize text-gray-500 dark:text-gray-200">
                            {collection.projectType}
                          </td>
                          <td className="whitespace-nowrap border-r py-4 px-6 text-sm capitalize text-gray-500 dark:text-gray-200">
                            {collection.commentCount ?? 0}
                          </td>
                          <td className=" gap-2 whitespace-nowrap py-4 px-6 text-sm capitalize text-gray-500 dark:text-gray-200 ">
                            <div className="flex items-center gap-5">
                              {collection.favorited?.length ?? 0}
                              {account && isAuthenticated && (
                                <div
                                  className={` ${
                                    collection.favorited?.some(
                                      (walletId) =>
                                        walletId.toLowerCase() ==
                                        account.toLowerCase()
                                    )
                                      ? "fill-red-600 stroke-red-600"
                                      : "hidden stroke-black dark:stroke-white"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
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
