import { Transition } from "@headlessui/react";
import React, { useEffect } from "react";

import ExclamationSVG from "~/svg/exclamation.svg";

interface DashboardModalProps {
  show: boolean;
}

export default function DashboardModal({ show }: DashboardModalProps) {
  
  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <section className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div className="flex h-full w-full items-center justify-center ">
          <div className="flex h-auto w-11/12 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-10 px-20 xl:w-1/2">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
              <ExclamationSVG className="h-8 w-8 text-white" />
            </span>
            <div className="pt-8 text-xl font-bold text-black text-center sm:text-2xl">
              Sorry, this application does not work on mobile devices.
            </div>
            <p className="px-10 py-5 text-center text-lg font-medium text-gray-600">
              Magic Mynt uses features which may not be supported by your device.
              Please try again using another device.
            </p>
          </div>
        </div>
      </section>
    </Transition>
  );
}
