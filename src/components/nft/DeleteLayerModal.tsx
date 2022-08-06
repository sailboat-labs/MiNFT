/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteLayer } from "redux/reducers/slices/layers";

import { ILayer } from "@/interfaces";

type props = {
  layer: ILayer;
};

export default function DeleteLayerModal({ layer }: props) {
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
      <div
        onClick={openModal}
        className="flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-red-500 hover:text-white dark:text-gray-200"
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
        Delete Layer
      </div>

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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-[color:var(--dark)]">
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
                    Delete Layer &apos;{layer.name}&apos;
                  </Dialog.Title>

                  <div className="mt-2 flex flex-row gap-5">
                    <div className="flex h-max flex-col justify-between ">
                      <p className=" text-gray-500">
                        Are you sure you want to delete{" "}
                        <span className="font-bold text-black">
                          &apos;{layer.name}&apos;
                        </span>
                        {layer.elements.length > 0 ? (
                          <span> and its elements?</span>
                        ) : (
                          "?"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="my-5 grid w-fit grid-cols-3 gap-3">
                    {layer.elements.map((element, index) => (
                      <div key={index}>
                        <img
                          src={element.path}
                          alt=""
                          className="h-24 w-24 rounded-lg bg-gray-50 object-cover"
                        />
                      </div>
                    ))}
                  </div>
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
                        dispatch(deleteLayer(layer.name));
                        closeModal();
                        toast.success("Layer Deleted");
                      }}
                    >
                      Delete
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
