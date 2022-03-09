/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import VisibilitySensor from "react-visibility-sensor";

import ProfileIcon from "@/components/shared/profile_icon";

import AuthenticationDialog from "../../shared/AuthenticationDialog";

// import DarkModeMenu from "../navbar/darkmode-toggle";

export default function Header() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const { account,isAuthenticated } = useMoralis();

  return (
    <div className="bg-opacity-20 bg-gradient-to-b from-primaryblue  to-white">
      <img
        className="absolute -mt-5 w-screen object-cover "
        src="/images/Sprinkle.svg"
        alt=""
      />

      <AuthenticationDialog
        showAuthDialog={showAuthDialog}
        setShowAuthDialog={setShowAuthDialog}
      />
      <div
        className={`fixed z-[2] flex h-screen w-full flex-col bg-white shadow  transition-all lg:hidden 
      ${navOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex justify-between px-8 py-3">
          <Link href="/" passHref>
            <div className="flex w-fit justify-between">
              <span className="flex cursor-pointer select-none items-center text-xl font-black leading-none text-gray-900 md:mb-0 lg:items-center lg:justify-center">
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
              className="gradient-button mr-5 cursor-pointer rounded px-3 py-1 text-xs font-medium leading-6  hover:text-gray-900"
            >
              Connect your wallet
            </div>
          )}
        </div>
        <div className="flex justify-center">
          {account && isAuthenticated && <ProfileIcon />}
        </div>
      </div>
      <section
        className={`fixed z-[3] w-full px-8  text-gray-700 transition-all ${
          headerVisible ? "bg-transparent" : "bg-white  shadow"
        }`}
      >
        <div className="contained flex  flex-col items-center justify-between py-3 md:flex-row">
          <div className="relative flex w-full flex-col md:flex-row lg:w-fit">
            <div className="relative z-[2] flex">
              {/* <img
              className="mx-auto w-10 h-10"
              src="/logo.webp"
              alt="feature image"
            /> */}
              <div className="flex w-full flex-row justify-between">
                <Link passHref href="/">
                  <span
                    className={`mx-auto flex cursor-pointer select-none items-center text-xl font-black leading-none  text-gray-900  transition-all md:mb-0 lg:w-auto lg:items-center lg:justify-center 
                ${
                  headerVisible
                    ? "translate-y-12 scale-[2] md:translate-x-8"
                    : "translate-y-0 scale-100"
                }
                `}
                  >
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
                className={`ml-10 transition-all 
              ${
                headerVisible
                  ? "translate-x-5 opacity-0"
                  : "translate-x-0 opacity-100"
              }
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

          <div className="ml-5 hidden items-center space-x-6 md:inline-flex lg:justify-end">
            {/* <DarkModeMenu className="md:mr-5" /> */}
            {account && isAuthenticated && (
              <Link passHref href="/collection/add">
                <div className="mr-5 cursor-pointer rounded bg-gray-200 px-3 py-1 font-medium leading-6  hover:text-gray-900">
                  Add Project
                </div>
              </Link>
            )}
            {!account && (
              <div
                onClick={() => {
                  setShowAuthDialog(true);
                }}
                className="gradient-button mr-5 cursor-pointer rounded px-3 py-1 text-xs font-medium leading-6  hover:text-gray-900"
              >
                Connect your wallet
              </div>
            )}
            {account && isAuthenticated && <ProfileIcon />}
          </div>
        </div>
      </section>

      {/* Header */}
      <div className="contained pt-20 pb-10 relative z-[2]">
        <VisibilitySensor
          // partialVisibility
          onChange={(isVisible) => {
            setHeaderVisible(isVisible);
          }}
        >
          <div className="-mt-5 p-10 "></div>
        </VisibilitySensor>
        <div className="flex flex-col justify-center text-center lg:justify-start lg:text-left">
          <div className="mt-10 text-4xl font-bold">
            Discover, collect, and sell
          </div>
          <div className="text-4xl font-bold">extraordinary NFTs</div>
          <div className="flex w-fit cursor-pointer justify-center gap-3 py-5 transition-all hover:translate-x-1 hover:scale-105 lg:justify-start">
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
                strokeWidth="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Learn More About NFT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
