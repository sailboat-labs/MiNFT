import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<JSX.Element | string>("");
  const [description, setDescription] = useState<JSX.Element | string>();
  const [cancel, setCancel] = useState<any>();
  const [confirm, setConfirm] = useState<any>();

  function Modal() {
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-[1000] overflow-y-auto"
            onClose={() => {
              null;
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
                <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6  text-left align-middle shadow-xl transition-all dark:bg-gray-700">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    {title}
                  </Dialog.Title>
                  {description && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-white">
                        {description}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-5">
                    {cancel}
                    {confirm}
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  return {
    Modal,
    isOpen,
    setIsOpen,
    setTitle,
    setDescription,
    setConfirm,
    setCancel,
  };
}
