import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function TraitContextMenu() {
  const blendModes = [
    "source-over",
    "lighter",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
  ];

  return (
    <>
      <Menu as="div">
        <Menu.Button className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -right-2 -top-2 h-6 w-6 rotate-45 scale-0  transform rounded-full bg-white p-1 shadow-md transition duration-150 hover:rotate-[135deg] hover:cursor-pointer hover:border hover:border-gray-200 hover:shadow-none group-hover:scale-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="mt-21 absolute right-0 z-[1000000] w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {blendModes.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-violet-500 text-white dark:text-gray-200"
                          : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {item}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
