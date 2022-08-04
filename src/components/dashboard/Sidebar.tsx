/* eslint-disable @next/next/no-img-element */
// !Needs the user's name to display each user's name

import { formatEthAddress } from "eth-address";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDashboardState } from "redux/reducers/selectors/dashboard";
import { getAddress } from "redux/reducers/selectors/user";
import { setSelectedSidebar } from "redux/reducers/slices/dashboard";

import { PROFILE_IMAGE } from "@/data/DemoProject";

import { IDashboardState } from "@/interfaces";

import ButtonLink from "../links/ButtonLink";

type SidebarProps = {
  currentPage?: string;
};

let sidebarItems: { label: string; icon: any; value: string }[] = [];

if (process.env.NEXT_PUBLIC_ENVIRONMENT == "production") {
  sidebarItems = [
    {
      label: "Dashboard",
      value: "dashboard-home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 mr-4 h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      label: "Whitelist",
      value: "whitelist",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 mr-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },

    {
      label: "Launchpad",
      value: "minting-page-builder",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 mr-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
  ];
} else {
  sidebarItems = [
    {
      label: "Dashboard",
      value: "dashboard-home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 mr-4 h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      label: "Whitelist",
      value: "whitelist",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 mr-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },

    {
      label: "Trait Mixer",
      value: "nft-generator",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 mr-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      label: "Contract Maker",
      value: "contract-maker",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 mr-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },

    {
      label: "Launchpad",
      value: "minting-page-builder",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 mr-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },

    {
      label: "Marketing",
      value: "marketing",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 mr-4 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      ),
    },
    {
      label: "IP Rights",
      value: "ip-rights",
      icon: (
        <svg
          className="ml-2 mr-4 h-6 w-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 11C14.447 11 14 11.448 14 12C14 13.103 13.103 14 12 14C10.897 14 10 13.103 10 12C10 11.448 9.553 11 9 11C8.447 11 8 11.448 8 12C8 14.206 9.794 16 12 16C14.206 16 16 14.206 16 12C16 11.448 15.553 11 15 11ZM18 19H6C5.448 19 5 18.551 5 18V9H19V18C19 18.551 18.552 19 18 19ZM8.121 5.293C8.308 5.107 8.565 5 8.828 5H15.172C15.435 5 15.692 5.107 15.879 5.293L17.586 7H6.414L8.121 5.293ZM20.121 6.707L17.293 3.879C16.727 3.312 15.973 3 15.172 3H8.828C8.027 3 7.273 3.312 6.707 3.879L3.879 6.707C3.312 7.273 3 8.027 3 8.829V18C3 19.654 4.346 21 6 21H18C19.654 21 21 19.654 21 18V8.829C21 8.027 20.688 7.273 20.121 6.707Z"
            fill="#757D8A"
          />
        </svg>
      ),
    },
    {
      label: "Development Eyes",
      value: "dev-page",
      icon: (
        <svg
          className="ml-2 mr-4 h-6 w-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 11C14.447 11 14 11.448 14 12C14 13.103 13.103 14 12 14C10.897 14 10 13.103 10 12C10 11.448 9.553 11 9 11C8.447 11 8 11.448 8 12C8 14.206 9.794 16 12 16C14.206 16 16 14.206 16 12C16 11.448 15.553 11 15 11ZM18 19H6C5.448 19 5 18.551 5 18V9H19V18C19 18.551 18.552 19 18 19ZM8.121 5.293C8.308 5.107 8.565 5 8.828 5H15.172C15.435 5 15.692 5.107 15.879 5.293L17.586 7H6.414L8.121 5.293ZM20.121 6.707L17.293 3.879C16.727 3.312 15.973 3 15.172 3H8.828C8.027 3 7.273 3.312 6.707 3.879L3.879 6.707C3.312 7.273 3 8.027 3 8.829V18C3 19.654 4.346 21 6 21H18C19.654 21 21 19.654 21 18V8.829C21 8.027 20.688 7.273 20.121 6.707Z"
            fill="#757D8A"
          />
        </svg>
      ),
    },
  ];
}

const selectedPageStyles =
  "flex h-12 cursor-pointer transition-all items-center border-r-4 border-y bg-indigo-50 border-y-indigo-100 border-indigo-500 hover:bg-indigo-200 border-0 px-3 py-4 text-base font-normal stroke-gray-500 shadow-none hover:bg-opacity-90";
const defaultStyles =
  "flex h-12 cursor-pointer transition-all stroke-[#757D8A] items-center text-gray-500  border-0  px-3 py-4 text-base font-normal text-black shadow-none hover:bg-gray-200 hover:text-gray-500";

export default function Sidebar({ currentPage }: SidebarProps) {
  const dashboardState = useSelector(getDashboardState) as IDashboardState;
  const selectedSidebar = dashboardState.selectedSidebar;
  const address = useSelector(getAddress);
  const dispatch = useDispatch();

  return (
    <div className="z-1 relative z-[1000]  mt-0 flex h-screen w-[15rem] flex-col justify-between border-r bg-white font-dmsans  opacity-100 dark:bg-[color:var(--dark)]">
      <div className="flex flex-col pt-5">
        <div className="box-border flex h-16 flex-row items-center px-5 pt-6">
          <div className="h-16 w-16 rounded-full bg-indigo-800">
            <ButtonLink
              href="#"
              className="m-0 flex h-16 w-16 items-center justify-center border-0 bg-transparent p-0 shadow-none"
            >
              <img
                className="h-full w-full rounded-full"
                src={PROFILE_IMAGE}
                alt=""
              />
            </ButtonLink>
          </div>

          <div className="flex w-[15rem] flex-col pt-1 pl-4 pr-0 font-dmsans">
            <div className="text-sm font-normal text-gray-500">
              Welcome back,
            </div>
            <div className="text-lg font-bold text-gray-600">
              {formatEthAddress(address)}
            </div>
          </div>
        </div>

        <div className="mt-20 px-5 text-xs text-indigo-500">
          Product Features
        </div>
        <div className="mt-5 flex w-full flex-col gap-5">
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => {
                dispatch(setSelectedSidebar(item.value));
              }}
              key={index}
              className={
                selectedSidebar == item.value
                  ? `${selectedPageStyles}`
                  : `${defaultStyles}`
              }
            >
              {item.icon}

              <span className="">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {process.env.NEXT_PUBLIC_ENVIRONMENT == "development" && (
        <div className="flex w-full flex-col items-center justify-center py-10 font-dmsans text-lg text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Demonstration
        </div>
      )}

      {/* <div>
        <div>
          <ButtonLink
            href="/support"
            className="ml-4 flex h-12 items-center rounded-lg border-0 bg-gray-100 text-lg font-normal text-gray-500 shadow-none hover:bg-gray-200 hover:text-gray-500"
          >
            <svg
              className="mr-4 h-6 w-6"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.0002 10.9993C7.0002 10.4473 7.4482 9.99927 8.0002 9.99927C8.5522 9.99927 9.0002 10.4473 9.0002 10.9993C9.0002 11.5513 8.5522 11.9993 8.0002 11.9993C7.4482 11.9993 7.0002 11.5513 7.0002 10.9993ZM12.0002 9.99927C11.4482 9.99927 11.0002 10.4473 11.0002 10.9993C11.0002 11.5513 11.4482 11.9993 12.0002 11.9993C12.5522 11.9993 13.0002 11.5513 13.0002 10.9993C13.0002 10.4473 12.5522 9.99927 12.0002 9.99927ZM16.0002 9.99927C15.4482 9.99927 15.0002 10.4473 15.0002 10.9993C15.0002 11.5513 15.4482 11.9993 16.0002 11.9993C16.5522 11.9993 17.0002 11.5513 17.0002 10.9993C17.0002 10.4473 16.5522 9.99927 16.0002 9.99927ZM19.8986 12.2942C19.3916 15.5482 16.7686 18.2472 13.5196 18.8562C11.9506 19.1522 10.3526 18.9832 8.9026 18.3692C8.4916 18.1952 8.0666 18.1072 7.6496 18.1072C7.4596 18.1072 7.2716 18.1252 7.0866 18.1622L4.2746 18.7242L4.8376 15.9072C4.9556 15.3222 4.8836 14.6962 4.6306 14.0972C4.0166 12.6472 3.8486 11.0502 4.1436 9.48017C4.7526 6.23117 7.4506 3.60817 10.7056 3.10117C13.2956 2.69817 15.8286 3.51417 17.6566 5.34217C19.4856 7.17117 20.3026 9.70517 19.8986 12.2942ZM19.0716 3.92817C16.7866 1.64417 13.6266 0.625171 10.3976 1.12417C6.3206 1.76017 2.9406 5.04417 2.1776 9.11117C1.8096 11.0692 2.0216 13.0632 2.7886 14.8762C2.8856 15.1072 2.9156 15.3222 2.8776 15.5152L2.0196 19.8032C1.9536 20.1312 2.0566 20.4702 2.2936 20.7062C2.4826 20.8962 2.7376 20.9992 3.0006 20.9992C3.0656 20.9992 3.1306 20.9932 3.1966 20.9802L7.4796 20.1232C7.7256 20.0762 7.9636 20.1452 8.1226 20.2112C9.9376 20.9782 11.9316 21.1892 13.8876 20.8222C17.9556 20.0592 21.2396 16.6792 21.8756 12.6022C22.3776 9.37517 21.3566 6.21317 19.0716 3.92817Z"
                fill="#757D8A"
              />
            </svg>
            <span className="">Support</span>
          </ButtonLink>
        </div>

        <div>
          <ButtonLink
            href="/sign-out"
            // className="bg-currentColor flex h-12 w-72 flex-row items-center border-0 text-lg font-normal text-gray-500 shadow-none hover:bg-gray-200 hover:text-gray-500"
            className="ml-4 mb-12 flex h-12 items-center rounded-lg border-0 bg-gray-100 text-lg font-normal text-gray-500 shadow-none hover:bg-gray-200 hover:text-gray-500"
          >
            <svg
              className="mr-4 h-6 w-6"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 5C8 5.55 7.55 6 7 6H6V18H7C7.55 18 8 18.45 8 19C8 19.55 7.55 20 7 20H5C4.45 20 4 19.55 4 19V5C4 4.45 4.45 4 5 4H7C7.55 4 8 4.45 8 5ZM18.0039 7.4248L20.8179 11.4248C21.0679 11.7788 21.0599 12.2538 20.7999 12.5998L17.7999 16.5998C17.6039 16.8618 17.3029 16.9998 16.9989 16.9998C16.7909 16.9998 16.5799 16.9348 16.3999 16.7998C15.9579 16.4688 15.8689 15.8418 16.1999 15.4008L18.0009 12.9998H17.9999H9.9999C9.4479 12.9998 8.9999 12.5528 8.9999 11.9998C8.9999 11.4468 9.4479 10.9998 9.9999 10.9998H17.9999C18.0164 10.9998 18.0317 11.0044 18.0472 11.0089C18.0598 11.0127 18.0724 11.0165 18.0859 11.0178L16.3679 8.5748C16.0499 8.1238 16.1589 7.4998 16.6109 7.1818C17.0619 6.8628 17.6859 6.9728 18.0039 7.4248Z"
                fill="#757D8A"
              />
            </svg>
            <span>Sign out</span>
          </ButtonLink>
        </div>
      </div> */}
    </div>
  );
}
