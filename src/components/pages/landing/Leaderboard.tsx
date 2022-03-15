/* eslint-disable @next/next/no-img-element */
import {
  collection,
  DocumentData,
  getFirestore,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import { getRandomAvatar } from "@/utils/GetRandomAvatar";
import { groupBy } from "@/utils/GroupBy";

import { Collection } from "@/types";
import { formatEthAddress } from "eth-address";

const firestore = getFirestore(firebaseApp);

export default function Leaderboard() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [animateIntoView, setAnimateIntoView] = useState(false);
  const [groupedData, setGroupedData] = useState<Map<string,Collection[]>>()

  const _query = query(
    collection(firestore, "collections")
    // orderBy("commentCount", "desc"),
    // limit(4)
  );
  const [snapshots, collectionLoading] = useCollectionData(_query);

  useEffect(() => {
    if (collectionLoading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: Collection[], curr: DocumentData) => {
      acc.push(curr as Collection);
      return acc;
    }, []);

    const grouped = groupBy(
      data,
      (data: Collection) => data.owner?.toLowerCase() ?? ""
    );

    console.log(grouped);
    setGroupedData(grouped)

    setCollections(data);
    setTimeout(() => {
      setAnimateIntoView(true);
    }, 500);
  }, [collectionLoading, snapshots]);

  return (
    <div>
      {collections && (
        <div className="contained mt-10 flex h-fit flex-col items-center">
          <span className="text-3xl font-bold">Leaderboard</span>

          {/* Shimmer animation */}
          <div
            className={`mt-5 grid grid-cols-2 gap-3 transition-all md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5${
              animateIntoView
                ? "absolute scale-95 opacity-0"
                : "relative scale-100 animate-pulse opacity-100 "
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
            className={`lg:grid-gap-8 mt-0 grid grid-cols-2 gap-3 px-0 md:grid-cols-3 lg:grid-cols-4
            ${
              animateIntoView ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {groupedData &&
              Array.from(groupedData).map((collection, index) => (
                <div className="flex items-center gap-5" key={index}>
                  <span className="text-lg font-bold  text-gray-500 dark:text-gray-200">
                    {index + 1}.
                  </span>
                  <img
                    className="h-16 w-16 rounded-full border-2 object-cover"
                    src={collection[0] ?? getRandomAvatar(collection[0])}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {collection[0]}
                    </span>
                    <span>
                      {collection[1].length} collections
                      {/* {collection.commentCount == 1 ? "" : "s"} */}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
