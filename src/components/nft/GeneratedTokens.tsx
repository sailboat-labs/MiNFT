/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { collection, DocumentData, query } from "firebase/firestore";
import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useMoralis } from "react-moralis";

import { IGeneratedTokens } from "@/interfaces/get-started";

import { firestore } from "./NewProperty";

export default function ViewGeneratedTokens() {
  const [isOpen, setIsOpen] = useState(false);

  const { account, logout, isAuthenticated } = useMoralis();

  const [outputImages, setOutputImages] = useState<IGeneratedTokens[]>([]);

  const _query = query(
    collection(
      firestore,
      `art-engine/users/${account}/${router.query.name}/generated`
    )
  );
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce(
      (acc: IGeneratedTokens[], curr: DocumentData) => {
        acc.push(curr as IGeneratedTokens);
        return acc;
      },
      []
    );

    setOutputImages(data);
  }, [loading, snapshots]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  if (outputImages.length < 1) return <></>;

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button type="button" onClick={openModal} className="gradient-button">
          View Generated Tokens
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-fit max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Generated Tokens
                    <span className="ml-3 text-sm font-normal text-gray-500">
                      {outputImages.length} image
                      {outputImages.length == 1 ? "" : "s"}
                    </span>
                  </Dialog.Title>
                  <div className="mt-5">
                    <div className="grid w-fit grid-flow-row grid-cols-12 gap-1">
                      {outputImages.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image.url}
                            className="h-22 w-22 cursor-pointer rounded-md object-cover transition-all hover:scale-150"
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Awesome! close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
