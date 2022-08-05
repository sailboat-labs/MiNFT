import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import PageLoader from "@/components/shared/PageLoader";

export default function Demo() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <a
        className="relative mt-12 w-fit rounded-xl border border-black bg-transparent px-7 py-4 font-bold text-black transition-all hover:scale-105 hover:cursor-pointer md:px-10"
        onClick={openModal}
      >
        Watch Demo
      </a>
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
                <Dialog.Panel className="relative z-[99999999999] w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-center">
                    <div className="absolute z-[1]">
                      <PageLoader />
                    </div>
                    <iframe
                      className="relative z-[1]"
                      // width={600}
                      // height={500}
                      width="871"
                      height="490"
                      src="https://www.youtube.com/embed/IBXKoUMEWeM?autoplay=1&rel=0"
                      title="Magic Mint Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
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
