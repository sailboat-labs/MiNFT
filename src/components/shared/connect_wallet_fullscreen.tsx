import { Dialog, Transition } from "@headlessui/react";
// import { useMetaMask } from "metamask-react";
import { Fragment, useEffect, useState } from "react";

export default function ConnectWalletFullScreen() {
  const [isOpen, setIsOpen] = useState(false);

 
  function openModal() {
    setIsOpen(true);
  }

  // const { status, connect, account } = useMetaMask();


  // useEffect(() => {
  //    if (account && status === "connected") return setIsOpen(false);
  //   return openModal()
  // }, [account,status,isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[1000] overflow-y-auto"
          onClose={()=>{null}}
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
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Connect your wallet
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Connect your wallet to proceed with this action
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="gradient-button"
                    // onClick={connect}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
