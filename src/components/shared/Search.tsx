/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import { getRandomAvatar } from "@/utils/GetRandomAvatar";

import { Collection } from "@/types";

const firestore = getFirestore(firebaseApp);

export default function Search() {
  const [isOpen, setIsOpen] = useState(() => {return false});

  const [collections, setCollections] = useState<Collection[]>([]);

  const [searchQuery, setSearchQuery] = useState('')


  

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
  <>
    <div className="inset-0 flex items-center justify-center">
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        className="flex items-center gap-2 rounded-lg border-2 stroke-gray-400 px-5 py-1 pr-36 text-gray-400 transition-all hover:bg-gray-100 dark:border-gray-500 dark:stroke-gray-700 dark:hover:bg-gray-800"
      >
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </button>
    </div>

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 mt-20 inline-block w-full max-w-3xl transform overflow-hidden rounded-2xl  bg-white p-6 text-left shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Search collection
              </Dialog.Title>

              <input
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search"
                className="mt-5 flex w-full items-center gap-2 rounded-lg border-2 stroke-gray-400 px-5 py-1  pr-36 transition-all dark:border-gray-500 dark:stroke-gray-700"
              />

              <div className="mt-5 flex flex-col gap-0">
                {collections
                  .filter((collection) =>
                    collection.name
                      ?.toLowerCase()
                      .replace(" ", "")
                      .includes(searchQuery.toLowerCase()) && searchQuery != ''
                  )
                  .map((collection, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center gap-3 border-b-2 pb-3 transition-all hover:bg-gray-100 pt-3"
                    >
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
                      {collection.name}
                      <div></div>
                    </div>
                  ))}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  </>
);
}
