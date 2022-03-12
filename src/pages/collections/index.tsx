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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import Layout from "@/components/layout/Layout";
import ExploreCategories from "@/components/pages/landing/categories";
import PageLoader from "@/components/shared/PageLoader";

import { getRandomAvatar } from "@/utils/GetRandomAvatar";

import { Collection } from "@/types";

const firestore = getFirestore(firebaseApp);
export default function AllCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [animateIntoView, setAnimateIntoView] = useState(false);

  const router = useRouter();

  const { category } = router.query;

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

  useEffect(() => {
    if (!category) return;
    setSelectedCategory(category as string);
  }, [category]);

  return (
    <Layout>
      <div ref={soonWrapperElement} className="contained mt-10">
        {loadingCollection && <PageLoader />}

        <strong className="flex  flex-col gap-3 stroke-black text-2xl dark:stroke-white md:text-3xl">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
          <span className="flex flex-row capitalize">
            {!selectedCategory || selectedCategory == "all"
              ? "All"
              : selectedCategory}{" "}
            Collections
          </span>
        </strong>

        <div className={`mt-3 flex flex-col transition-all `}>
          <ExploreCategories
            dismissible
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div
            id="soon-text"
            className="absolute -translate-x-[22rem] translate-y-[25rem] -rotate-90 text-8xl text-gray-200 dark:text-gray-700 lg:text-[6rem]"
          >
            All Collections
          </div>

          <div className="mt-5 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow sm:rounded-lg">
                <table className="min-w-full rounded-lg dark:border-2 dark:border-gray-700">
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
                              className="cursor-pointer border-b transition-all hover:bg-gray-50 dark:bg-[#121212] dark:hover:bg-gray-700"
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
                                  <div className="text-md dark:text-white">
                                    {collection.name}
                                  </div>
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
    </Layout>
  );
}
