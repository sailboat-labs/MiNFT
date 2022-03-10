/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from "dayjs";
import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import PageLoader from "@/components/shared/PageLoader";

import { getRandomAvatar } from "@/utils/GetRandomAvatar";

import ExploreCategories from "./categories";

import { Collection } from "@/types";

const firestore = getFirestore(firebaseApp);
export default function LaunchingSoon() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [animateIntoView, setAnimateIntoView] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const _query = query(
    collection(firestore, "collections"),
    orderBy("lastUpdated", "desc"),
    limit(100)
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

  return (
    <div className="contained mt-10">
      {loadingCollection && <PageLoader />}

      <div className={`mt-3 flex flex-col transition-all `}>
        <ExploreCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="mt-10 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <table className="min-w-full dark:border-2 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                    >
                      Collection Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                    >
                      Presale Mint Date & Time
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                    >
                      Public Mint Date & Time
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
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200 "
                    >
                      Project Type
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
                      .map((collection, index) => (
                        <Link
                          key={index}
                          href={{
                            pathname: `/collection/[slug]`,
                            query: {
                              slug: collection.slug!,
                            },
                          }}
                          passHref
                        >
                          <tr
                            onClick={() => {
                              setLoadingCollection(true);
                            }}
                            className="cursor-pointer border-b dark:bg-[#121212] transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <td className="flex items-center gap-5 whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900">
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
                                <div className="text-md dark:text-white">{collection.name}</div>
                                <div className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-200 ">
                                  <span>{collection.supply}</span>
                                  <span>&nbsp;circulating supply</span>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-200 ">
                              {collection.preMintDate
                                ? dayjs(
                                    new Date(collection.preMintDate!)
                                  ).format("DD/MM/YYYY, HH : MM")
                                : "N/A"}
                            </td>
                            <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-200 ">
                              {collection.publicMintDate
                                ? dayjs(
                                    new Date(collection.publicMintDate!)
                                  ).format("DD/MM/YYYY, HH : MM ")
                                : "N/A"}
                            </td>
                            <td className="whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                              {collection.whitelistAvailable == "yes"
                                ? "true"
                                : "false"}
                            </td>
                            <td className="whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500 dark:text-gray-200">
                              {collection.teamInfo ? "true" : "false"}
                            </td>
                            <td className="whitespace-nowrap py-4 px-6 text-sm capitalize text-gray-500 dark:text-gray-200 ">
                              {collection.projectType}
                            </td>
                          </tr>
                        </Link>
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
