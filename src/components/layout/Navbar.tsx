/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
// import DarkModeMenu from "../navbar/darkmode-toggle";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { usePageLoader } from "@/hooks/pageloader";

import DarkModeMenu from "./DarkmodeToggle";
import ProfileIcon from "../shared/ProfileIcon";

type props = {
  className?: string;
};

export default function Navbar({ className }: props) {
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  const { Loader, setState, state } = usePageLoader();

  return (
    <section
      className={`fixed z-[999] w-full border-gray-500 bg-white text-gray-700 shadow transition-all   ${className}`}
    >
      {state && <Loader />}
      <div
        className={`absolute z-[2] flex h-screen w-full flex-col bg-white shadow  transition-all   lg:hidden 
      ${navOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex justify-between px-8 py-3 ">
          <Link href="/" passHref>
            <div className="flex w-fit justify-between">
              <span className="flex cursor-pointer select-none items-center text-xl font-black leading-none  text-gray-900  md:mb-0 lg:items-center lg:justify-center">
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
            <div className="flex w-full justify-between ">
              <Link href="/" passHref>
                <span className="flex cursor-pointer select-none items-center text-xl font-black leading-none text-gray-900   md:mb-0 lg:items-center lg:justify-center">
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
          </div>
        </div>

        <div className="ml-5 hidden  items-center space-x-6 lg:inline-flex lg:justify-end">
          {/* <DarkModeMenu className="md:mr-5" /> */}

          <ProfileIcon />
        </div>
      </div>
    </section>
  );
}
