/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
// import DarkModeMenu from "../navbar/darkmode-toggle";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import DarkModeMenu from "./DarkmodeToggle";
import { categories } from "../pages/landing/categories";
import AuthenticationDialog from "../shared/AuthenticationDialog";
import ProfileIcon from "../shared/profile_icon";

type props = {
  className?: string;
};

export default function Navbar({ className }: props) {
  const links: { label: string; route: string }[] = [
    { label: "Categories", route: "/" },
    { label: "All Collections", route: "/" },
  ];

  const requiredAuthPaths = ["/profile"];

  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const router = useRouter();
  const {
    // authenticate,
    isAuthenticating,
    isAuthenticated,
    account,
    // chainId,
    // logout,
  } = useMoralis();

  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!account && requiredAuthPaths.includes(router.pathname))
      setShowAuthDialog(true);
  }, [account]);

  return (
    <section
      className={`fixed z-[999] w-full border-gray-500 bg-white text-gray-700 shadow transition-all  dark:border-b-2 dark:bg-black dark:text-white ${className}`}
    >
      <AuthenticationDialog
        showAuthDialog={showAuthDialog}
        setShowAuthDialog={setShowAuthDialog}
      />
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
        <div className="flex w-full justify-center py-5">
          {!account && (
            <div
              onClick={() => {
                setShowAuthDialog(true);
              }}
              className="gradient-button mr-5 cursor-pointer rounded px-3 py-1 text-xs font-medium leading-6  hover:text-gray-900 dark:text-gray-200"
            >
              Connect your wallet
            </div>
          )}
        </div>
        <div className="flex justify-center">
          {account && isAuthenticated && <ProfileIcon />}
        </div>
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
            <div className="">
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
                            <button
                              className={`${
                                active
                                  ? "bg-primaryblue text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize dark:text-white`}
                            >
                              {item.label}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          {account && isAuthenticated && router.pathname !== "/collection/add" && (
            <Link passHref href="/collection/add">
              <div className="mr-5 cursor-pointer rounded bg-gray-200 px-3 py-1 font-medium leading-6 hover:text-gray-900  dark:bg-gray-700 dark:text-gray-200">
                Add Project
              </div>
            </Link>
          )}
          {!account && !isAuthenticating && (
            <div
              onClick={() => setShowAuthDialog(true)}
              className="gradient-button mr-5 cursor-pointer rounded px-3 py-1 text-xs font-medium leading-6  hover:text-gray-900"
            >
              Connect your wallet
            </div>
          )}
          {account && isAuthenticated && <ProfileIcon />}
          {isAuthenticating && (
            <div>
              <button
                disabled
                type="button"
                className="gradient-button text-xs"
              >
                <svg
                  role="status"
                  className="mr-2 inline h-4 w-4 animate-spin text-gray-200 "
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  ></path>
                </svg>
                Connecting...
              </button>
            </div>
          )}
          <DarkModeMenu />
        </div>
      </div>
    </section>
  );
}
