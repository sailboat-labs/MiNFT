/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTrait } from "redux/reducers/slices/layers";

import { IElement } from "@/interfaces";

type props = {
  trait: IElement;
};

export default function DeleteTraitModal({ trait }: props) {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/1200/svg"
        className="absolute -left-2 -top-2 h-6 w-6 rotate-45 scale-0  transform rounded-full bg-white p-1 shadow-md transition duration-150 hover:rotate-[135deg] hover:cursor-pointer hover:border hover:border-gray-200 hover:shadow-none group-hover:scale-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={openModal}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[10000]" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-5 flex items-center gap-2 text-lg font-medium leading-6 text-red-500"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Trait &apos;{trait.filename?.split(".")[0]}&apos;
                  </Dialog.Title>

                  <div className="mt-2 flex flex-row gap-5">
                    <img
                      src={trait.path}
                      alt=""
                      className="h-36 w-36 rounded-lg bg-gray-50 object-cover"
                    />
                    <div className="flex h-max flex-col justify-between ">
                      <p className=" text-gray-500">
                        Are you sure you want to delete{" "}
                        <span className="font-bold text-black">
                          &apos;{trait.filename?.split(".")[0]}&apos;
                        </span>{" "}
                        from{" "}
                        <span className="font-bold text-black">
                          &apos;{trait.trait}&apos;
                        </span>{" "}
                        layer?
                      </p>
                      <div className="mt-4 flex gap-5">
                        <button
                          type="button"
                          className="focus-blue:ring-red-500 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            dispatch(
                              deleteTrait({
                                layerName: trait.trait,
                                elementName: trait.filename,
                              })
                            );
                            closeModal();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
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
