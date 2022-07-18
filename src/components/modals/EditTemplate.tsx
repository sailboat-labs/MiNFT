import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";
import { arrayMove } from "react-sortable-hoc";

import SortableList from "../SortableList";

interface AppProps {
  isOpen: boolean;
  closeModal: () => any;
}

const EditTemplate: FC<AppProps> = ({ isOpen, closeModal }) => {
  const [layers, setLayers] = useState([]);

  /**
   * moves array item from one index to another
   *
   * @param @type {{ oldIndex, newIndex}} - { oldIndex, newIndex }
   * @returns {undefined}
   */
  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    setLayers(arrayMove(layers, oldIndex, newIndex));
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="relative z-30">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
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
              <div className="mx-4 w-full max-w-5xl transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between gap-2 ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Template
                  </Dialog.Title>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-8 flex gap-10">
                  <article className="flex-1">
                    <div className="mt-2">
                      <div className="mt-3 flex flex-col gap-2">
                        <Dialog.Title
                          as="h4"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Project Name
                        </Dialog.Title>
                        <input
                          type="text"
                          className="rounded border border-gray-200"
                        />
                      </div>
                      {/* Sortable list */}
                      <div className="max-h-[500px] overflow-y-auto">
                        <SortableList onSortEnd={onSortEnd} />
                      </div>
                    </div>
                  </article>
                  {/* preview box */}
                  <div className="h-[350px] w-[350px]">some preview box</div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-gray-700"
                    // onClick={createProject}
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default EditTemplate;
