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
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import { Collection } from "@/types";

const firestore = getFirestore(firebaseApp);
export default function LaunchingSoon() {
  const [collections, setCollections] = useState<Collection[]>([]);

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
  }, [loading, snapshots]);

  return (
    <div className="contained mt-10">
      <div className="mt-3 flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                    >
                      Collection Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                    >
                      Presale Mint Date & Time
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                    >
                      Public Mint Date & Time
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                    >
                      Whitelist Available
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                    >
                      Team Info
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                    >
                      Project Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {collections &&
                    collections.map((collection, index) => (
                      <tr key={index} className="border-b bg-white ">
                        <td className="flex items-center gap-5 whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900">
                          <div className="h-10 w-10 flex-shrink-0 rounded-[50%] bg-gray-100">
                            <img
                              className="h-full w-full rounded-[50%] object-cover"
                              src={
                                collection.image ??
                                "https://www.google.com/s2/favicons?sz=64&domain_url=https://nzvc.co.nz"
                              }
                              alt=""
                            />
                          </div>
                          <div>
                            <div className="text-md">{collection.name}</div>
                            <div className="whitespace-nowrap text-sm text-gray-500 ">
                              <span>{collection.supply}</span>
                              <span>&nbsp;circulating supply</span>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 ">
                          {dayjs(new Date(collection.preMintDate!)).format(
                            "DD MMM, YYYY. HH:MM"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 ">
                          {dayjs(new Date(collection.publicMintDate!)).format(
                            "DD MMM, YYYY HH:MM"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500">
                          {collection.whitelistAvailable == "yes"
                            ? "true"
                            : "false"}
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500">
                          {collection.teamInfo ? "true" : "false"}
                        </td>
                        <td className="whitespace-nowrap py-4 px-6 text-sm capitalize text-gray-500 ">
                          {collection.projectType}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
