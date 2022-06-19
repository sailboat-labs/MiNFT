/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
// import DarkModeMenu from "../navbar/darkmode-toggle";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import { usePageLoader } from "@/hooks/pageloader";

import DarkModeMenu from "./DarkmodeToggle";
import { categories } from "../pages/landing/categories";

type props = {
  className?: string;
};

export default function Navbar({ className }: props) {
  const links: { label: string; route: string }[] = [
    { label: "Categories", route: "/" },
    { label: "All Collections", route: "/" },
  ];

  const requiredAuthPaths = ["/profile"];

  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  const { Loader, setState, state } = usePageLoader();

  return (
    <section
      className={`fixed z-[999] w-full border-gray-500 bg-white text-gray-700 shadow transition-all  dark:border-b-2 dark:bg-black dark:text-white ${className}`}
    >
      {state && <Loader />}
      <div
        className={`absolute z-[2] flex h-screen w-full flex-col bg-white shadow  transition-all  dark:bg-black lg:hidden 
      ${navOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex justify-between px-8 py-3 ">
          <Link href="/" passHref>
            <div className="flex w-fit justify-between">
              <span className="flex cursor-pointer select-none items-center text-xl font-black leading-none  text-gray-900 dark:text-white md:mb-0 lg:items-center lg:justify-center">
                MiNFT<span className="text-indigo-600">.</span>
              </span>
            </div>
          </Link>
          <svg
            onClick={() => {
              setNavOpen(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex w-full justify-center py-5"></div>
        <div className="flex justify-center"></div>
        <DarkModeMenu />
      </div>
      <div className="container relative z-[1] mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-between px-8 py-3 md:flex-row">
        <div className="relative flex w-full flex-col md:flex-row lg:w-fit">
          <div className="relative z-[2] flex w-full">
            {/* <img
              className="mx-auto w-10 h-10"
              src="/logo.webp"
              alt="feature image"
            /> */}
            <div className="flex w-full justify-between ">
              <Link href="/" passHref>
                <span className="flex cursor-pointer select-none items-center text-xl font-black leading-none text-gray-900  dark:text-white md:mb-0 lg:items-center lg:justify-center">
                  MiNFT<span className="text-indigo-600">.</span>
                </span>
              </Link>

              <svg
                onClick={() => {
                  setNavOpen(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer transition-all hover:scale-105 lg:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            </div>
            {/* <div
              className={`ml-10 hidden transition-all lg:block
              `}
            >
              <input
                className="rounded-lg bg-gray-100 px-8 py-2 transition-all focus:border-0 focus:px-10"
                placeholder="Search..."
              />
            </div> */}
          </div>
          {/* <nav className=" relative z-[2] hidden md:flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
            <Link passHref href="/">
              <div className="mr-5 cursor-pointer font-medium leading-6 text-gray-500 hover:text-gray-900">
                Home
              </div>
            </Link>
            <Link passHref href="/nft">
              <div className="mr-5 cursor-pointer font-medium leading-6 text-gray-500 hover:text-gray-900">
                NFT
              </div>
            </Link>
            <Link passHref href="/nft/entries">
              <div className="mr-5 cursor-pointer font-medium leading-6 text-gray-500 hover:text-gray-900">
                NFT Entries
              </div>
            </Link>
            <a
              href="#_"
              className="mr-5 font-medium leading-6 text-gray-500 hover:text-gray-900"
            >
              About Us
            </a>
          </nav> */}
        </div>

        <div className="ml-5 hidden  items-center space-x-6 lg:inline-flex lg:justify-end">
          {/* <DarkModeMenu className="md:mr-5" /> */}
          <div className="flex gap-5">
            {/* {links.map((link, index) => (
              <Link passHref href={link.route} key={index}>
                <span className="cursor-pointer text-gray-600 transition-all hover:scale-105 hover:text-black">
                  {link.label}
                </span>
              </Link>
            ))} */}
            <div className="flex items-center gap-5">
              <Menu as="div" className="relative inline-block text-left">
                <div className="flex items-center gap-3">
                  <Menu.Button className="cursor-pointer  transition-all hover:scale-105">
                    Categories
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
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5  focus:outline-none dark:border-2 dark:border-gray-500 dark:bg-black dark:text-white">
                    <div className="px-1 py-1 ">
                      {categories.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <div className="">
                              <Link
                                passHref
                                href={`/collections?category=${item.label}`}
                              >
                                <button
                                  className={`${
                                    active
                                      ? "bg-primaryblue text-white"
                                      : "text-gray-900"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize dark:text-white`}
                                >
                                  {item.label}
                                </button>
                              </Link>
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <DarkModeMenu />
        </div>
      </div>
    </section>
  );
}
