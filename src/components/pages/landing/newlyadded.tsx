/* eslint-disable @next/next/no-img-element */

import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import { Collection } from "@/types";
const firestore = getFirestore(firebaseApp);

export default function NewlyAdded() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [animateIntoView, setAnimateIntoView] = useState(false);

  const _query = query(
    collection(firestore, "collections"),
    orderBy("dateCreated", "desc"),
    limit(10)
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
    <div id="newly_added" className="contained mt-10">
      <a href="#newly_added">
        <strong className="text-xl">Newly Added</strong>
      </a>

      <section className="flex items-center overflow-hidden gap-5">
        <div className="h-20 w-20 bg-red-200"></div>

        <div id="scrollbar" className="relative">
          <div
            className="mt-8 snap-x snap-mandatory gap-4 overflow-x-auto xl:grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            <div className="flex w-max items-start gap-10">
              {collections
                .filter((item) => item.image != null)
                .map((item, index) => (
                  <div
                    key={index}
                    className="relative flex-1 cursor-pointer snap-center snap-always transition-all"
                  >
                    <div className="flex flex-col items-center">
                      <img
                        className="h-48 w-52 rounded-lg border-2 bg-white object-cover"
                        src={item.image}
                        alt=""
                      />

                      <p className="my-5 text-center text-lg text-gray-700">
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div onClick={()=>{window.scrollTo(100,0)}} className="h-20 w-20 bg-red-200"></div>
      </section>
    </div>
  );
}
