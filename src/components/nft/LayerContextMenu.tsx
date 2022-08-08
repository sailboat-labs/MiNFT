import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { ILayer } from "@/interfaces";

import DeleteLayerModal from "./DeleteLayerModal";

type props = {
  layer: ILayer;
};

export default function LayerContextMenu({ layer }: props) {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 rounded-full border-2 bg-gray-50 transition-all hover:scale-105 dark:border-gray-500 dark:bg-transparent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-[999] mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border dark:border-gray-600 dark:bg-[color:var(--dark)]">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => <DeleteLayerModal layer={layer} />}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
