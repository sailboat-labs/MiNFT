/* eslint-disable @next/next/no-img-element */
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { formatEthAddress } from "eth-address";
import { collectionGroup, getFirestore, query } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";

import { firebaseApp } from "@/lib/firebase";

import { getRandomAvatar } from "@/utils/GetRandomAvatar";

const firestore = getFirestore(firebaseApp);

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<
    {
      name?: string;
      address: string;
      avatar?: string;
      collectionCount: number;
      commentCount: number;
    }[]
  >([]);
  const [animateIntoView, setAnimateIntoView] = useState(false);

  const _query = query(
    collectionGroup(firestore, "comments")
    // orderBy("commentCount", "desc"),
    // limit(4)
  );

  const [sort, setSort] = useState("comment");

  async function getLeaderboard() {
    const { data } = await axios.get(
      "https://us-central1-minft-production.cloudfunctions.net/Leaderboard/"
    );

    setLeaderboard(data);
    setTimeout(() => {
      setAnimateIntoView(true);
    }, 1000);
  }

  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <div className="mt-10 bg-gray-50 py-12 dark:bg-gray-900">
      {leaderboard && (
        <div className="contained mt-0 flex h-fit flex-col items-start">
          <div className="flex items-center gap-5">
            <span className="text-2xl font-bold">Leaderboard</span>

            <Menu as="div" className="relative z-[10] inline-block text-left">
              <div className="flex items-center gap-3">
                <Menu.Button className="rounded bg-primaryblue px-2 py-1 text-sm capitalize text-white transition-all hover:scale-105">
                  {sort}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1  ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:text-white">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            setSort("comment");
                          }}
                          className={`${
                            active
                              ? "bg-primaryblue text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Comment
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            setSort("collection");
                          }}
                          className={`${
                            active
                              ? "bg-primaryblue text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Collection
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* Shimmer animation */}
          <div
            className={`grid grid-cols-2 gap-3 transition-all ${
              animateIntoView
                ? "absolute scale-95 opacity-0"
                : "relative mt-5 scale-100 animate-pulse opacity-100 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            }`}
          >
            {[...Array(4)].map((collection, index) => (
              <div className="flex items-center gap-3" key={index}>
                <div className="h-16 w-16 rounded-full border-2 bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex flex-col gap-1">
                  <span className="h-3 w-20 rounded-lg bg-gray-200 font-bold dark:bg-gray-500"></span>
                  <span className="h-2 w-16 rounded-lg bg-gray-200 font-bold dark:bg-gray-500"></span>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard Items */}
          <div
            className={`mt-10 grid grid-cols-1 gap-3 px-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-8
            ${
              animateIntoView ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {leaderboard &&
              leaderboard
                .filter(
                  (item) => item.collectionCount > 0 || item.commentCount > 0
                )
                .sort((a: any, b: any) => {
                  switch (sort) {
                    case "comment":
                      return b.commentCount - a.commentCount;
                    case "collection":
                      return b.collectionCount - a.collectionCount;

                    default:
                      return b.commentCount - a.commentCount;
                  }
                })
                .map((item, index) => (
                  <div
                    className="flex cursor-pointer items-center gap-5 transition-all"
                    key={index}
                  >
                    <span className="text-lg font-bold  text-gray-500 dark:text-gray-200">
                      {index + 1}.
                    </span>
                    <img
                      className="h-16 w-16 rounded-full border-2 object-cover"
                      src={item.avatar ?? getRandomAvatar(item.address)}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {item.name ?? formatEthAddress(item.address)}
                      </span>
                      <div>
                        <span className="flex items-center gap-1 ">
                          {item.commentCount}{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            />
                          </svg>
                        </span>
                        <span className="flex items-center gap-1">
                          {item.collectionCount}{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
