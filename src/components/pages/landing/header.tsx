/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

import { usePageLoader } from "@/hooks/pageloader";

import DarkModeMenu from "@/components/layout/DarkmodeToggle";
import Search from "@/components/shared/Search";

// import DarkModeMenu from "../navbar/darkmode-toggle";

export default function Header() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  // const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { Loader, setState } = usePageLoader(false);

  return (
    <div
      id="ref"
      className="bg-opacity-20 bg-gradient-to-b from-primaryblue to-white   dark:from-black dark:to-black"
    >
      <Loader />
      <div className="flex h-fit">
        <img
          className="translate-all absolute z-[1] -mt-5 w-screen object-cover"
          src="/images/Sprinkle.svg"
          alt=""
        />

        <div className="absolute z-[2] hidden h-[27rem] w-full bg-gradient-to-b from-transparent to-black dark:block"></div>
      </div>

      <div
        className={`fixed z-[99] flex h-screen w-full flex-col bg-white shadow transition-all  dark:bg-[color:var(--dark)]  dark:bg-black lg:hidden 
      ${navOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex justify-between px-8 py-3 dark:text-white dark:text-gray-200">
          <Link href="/" passHref>
            <div className="flex w-fit justify-between">
              <span className="flex cursor-pointer select-none items-center text-xl font-black leading-none text-gray-900 dark:text-gray-200 md:mb-0 lg:items-center lg:justify-center">
                Magic Mynt<span className="text-indigo-600">.</span>
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

        <DarkModeMenu />
      </div>
      <section
        className={`fixed z-[3] w-full bg-white px-8 text-gray-700 transition-all dark:bg-[color:var(--dark)]  ${
          headerVisible
            ? "bg-transparent dark:border-b-0 dark:border-transparent"
            : "shadow dark:border-b-2  dark:border-gray-500 dark:bg-black"
        }`}
      >
        <div className="contained flex  flex-col items-center justify-between py-3 md:flex-row">
          <div className="relative flex w-full flex-col md:flex-row lg:w-fit">
            <div className="relative z-[2] flex">
              <div className="flex w-full flex-row justify-between">
                <Link passHref href="/">
                  <span
                    className={` flex cursor-pointer select-none items-center text-xl font-black leading-none  text-gray-900 transition-all  dark:text-gray-200 md:mb-0 lg:w-auto lg:items-center lg:justify-center 
                ${
                  headerVisible
                    ? "mx-auto translate-y-12 scale-[2] md:translate-x-8"
                    : " translate-y-0 scale-100"
                }
                `}
                  >
                    Magic Mynt<span className="text-indigo-600">.</span>
                  </span>
                </Link>
                <svg
                  onClick={() => {
                    setNavOpen(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer stroke-black transition-all hover:scale-105 dark:stroke-white lg:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
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

          <div className="ml-5 hidden items-center space-x-6 md:inline-flex lg:justify-end">
            {/* <DarkModeMenu className="md:mr-5" /> */}
            <Search />

            <DarkModeMenu />
          </div>
        </div>
      </section>

      {/* Header */}
      <div className="contained relative z-[2] pt-20 pb-10">
        <VisibilitySensor
          // partialVisibility
          onChange={(
            isVisible: boolean | ((prevState: boolean) => boolean)
          ) => {
            setHeaderVisible(isVisible);
          }}
        >
          <div className="-mt-5 p-10 "></div>
        </VisibilitySensor>
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
          <div className="flex flex-col justify-center text-center dark:text-white dark:text-gray-200 lg:justify-start lg:text-left">
            <div className="mt-10 text-4xl font-bold">
              The place for crowd-sourced
            </div>
            <div className="text-4xl font-bold">
              alpha on the hottest NFT projects
            </div>
            <div
              onClick={() => {
                document.getElementById("faq")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-3 py-5 transition-all hover:translate-x-1 hover:scale-105 lg:w-fit lg:justify-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Learn More About Magic Mynt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
