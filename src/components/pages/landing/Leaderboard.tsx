/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import {
  collectionGroup,
  getFirestore,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { firebaseApp } from "@/lib/firebase";

import { getRandomAvatar } from "@/utils/GetRandomAvatar";
import { formatEthAddress } from "eth-address";


const firestore = getFirestore(firebaseApp);

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<
    { name: string; collectionCount: number; commentCount: number }[]
  >([]);
  const [animateIntoView, setAnimateIntoView] = useState(false);

  const _query = query(
    collectionGroup(firestore, "comments"),
    // orderBy("commentCount", "desc"),
    // limit(4)
  );


  async function getLeaderboard(){
   const {data} = await axios.get("https://us-central1-minft-staging.cloudfunctions.net/Leaderboard/")

   setLeaderboard(data)
   setTimeout(() => {
     setAnimateIntoView(true)
   }, 1000);

  }

  useEffect(()=>{
    getLeaderboard()
  },[])

 

  return (
    <div>
      {leaderboard && (
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
            {leaderboard &&
              leaderboard.map((item, index) => (
                <div className="flex items-center gap-5" key={index}>
                  <span className="text-lg font-bold  text-gray-500 dark:text-gray-200">
                    {index + 1}.
                  </span>
                  <img
                    className="h-16 w-16 rounded-full border-2 object-cover"
                    src={item.name ?? getRandomAvatar(item.name)}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {formatEthAddress(item.name)}
                    </span>
                    <span>
                      {item.collectionCount} collections
                      {item.commentCount} comments
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
