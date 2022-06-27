/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { IGeneratedTokens } from "@/interfaces";

type props = {
  token: IGeneratedTokens;
};

export default function GeneratedToken({ token }: props) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  console.log(token);

  return (
    <>
      <div onClick={openModal} className="mb-5 flex flex-col gap-1">
        <img
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          src={token.file}
          alt=""
          className="h-32 w-32 cursor-pointer rounded-lg object-cover transition-all hover:scale-105"
        />
        <div className="text-sm text-gray-500">{token.metadata.name}</div>
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
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex gap-5">
                    <img
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      src={token.file}
                      alt=""
                      className=" h-96 w-96  rounded-lg object-cover"
                    />
                    <div>
                      <div className="text-gray-500">
                        {token.metadata?.name?.split("#")[0]}
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-gray-900"
                      >
                        {token.metadata.name}
                      </Dialog.Title>
                      <div className="mt-5 grid grid-cols-3 gap-3">
                        {token.renderObjects.map((object, index) => (
                          <div
                            key={index}
                            className="rounded-xl border bg-gray-50 p-3"
                          >
                            <div className="text=gray-500 text-xs">
                              {object.trait}
                            </div>
                            <div>{object.filename?.split(".")[0]}</div>
                          </div>
                        ))}
                      </div>

                      {/* <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Got it, thanks!
                        </button>
                      </div> */}
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
