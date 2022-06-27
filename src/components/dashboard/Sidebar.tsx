// !Needs the user's name to display each user's name

import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDashboardState } from "redux/reducers/selectors/dashboard";
import { setSelectedSidebar } from "redux/reducers/slices/dashboard";

import ButtonLink from "@/components/links/ButtonLink";

import { IDashboardState } from "@/interfaces";

type SidebarProps = {
  currentPage?: string;
};

export default function Sidebar({ currentPage }: SidebarProps) {
  const user = "Francis"; // Change this value to be dynamic after passing in props from Operations

  const dashboardState = useSelector(getDashboardState) as IDashboardState;
  const selectedSidebar = dashboardState.selectedSidebar;
  const dispatch = useDispatch();

  const selectedPageStyles =
    "flex h-12 cursor-pointer transition-all items-center rounded-lg border-0 bg-indigo-800 text-white px-3 py-4 text-lg font-normal stroke-white shadow-none hover:bg-opacity-90";
  const defaultStyles =
    "flex h-12 cursor-pointer transition-all stroke-[#757D8A] items-center bg-gray-100 rounded-lg border-0  px-3 py-4 text-lg font-normal text-gray-500 shadow-none hover:bg-gray-200 hover:text-gray-500";

  const sidebarItems: { label: string; icon: any; value: string }[] = [
    {
      label: "Contract Maker",
      value: "contract-maker",
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
            d="M19 19C19 19.552 18.551 20 18 20H6C5.449 20 5 19.552 5 19V8C5 7.448 5.449 7 6 7V8C6 9.103 6.897 10 8 10H16C17.103 10 18 9.103 18 8V7C18.551 7 19 7.448 19 8V19ZM8 4L16 4.003V5V8H8V5V4ZM18 5V4C18 2.897 17.103 2 16 2H8C6.897 2 6 2.897 6 4V5C4.346 5 3 6.346 3 8V19C3 20.654 4.346 22 6 22H18C19.654 22 21 20.654 21 19V8C21 6.346 19.654 5 18 5Z"
            fill="#757D8A"
          />
        </svg>
      ),
    },
    {
      label: "NFT Generator",
      value: "nft-generator",
      icon: (
        <svg
          className="ml-2 mr-4 h-6 w-6"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.6243 3.06901C9.26861 1.32777 11.7314 1.32777 12.3757 3.06901L13.557 6.26138C13.7596 6.80882 14.1912 7.24044 14.7386 7.44301L17.931 8.6243C19.6722 9.26861 19.6722 11.7314 17.931 12.3757L14.7386 13.557C14.1912 13.7596 13.7596 14.1912 13.557 14.7386L12.3757 17.931C11.7314 19.6722 9.26861 19.6722 8.6243 17.931L7.44301 14.7386C7.24044 14.1912 6.80882 13.7596 6.26138 13.557L3.06901 12.3757C1.32777 11.7314 1.32777 9.26861 3.06901 8.6243L6.26138 7.44301C6.80882 7.24044 7.24044 6.80882 7.44301 6.26138L8.6243 3.06901Z"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      label: "Project Builder",
      value: "project-builder",
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
            d="M18.9902 20H16.0002V13C16.0002 12.447 15.5522 12 15.0002 12H9.0002C8.4472 12 8.0002 12.447 8.0002 13V20H5.0002L5.0062 11.583L11.9982 4.43199L19.0002 11.624L18.9902 20ZM10.0002 20H14.0002V14H10.0002V20ZM20.4242 10.185L12.7152 2.30099C12.3382 1.91599 11.6622 1.91599 11.2852 2.30099L3.5752 10.186C3.2102 10.561 3.0002 11.085 3.0002 11.624V20C3.0002 21.103 3.8472 22 4.8882 22H9.0002H15.0002H19.1112C20.1522 22 21.0002 21.103 21.0002 20V11.624C21.0002 11.085 20.7902 10.561 20.4242 10.185Z"
            fill="#757D8A"
          />
        </svg>
      ),
    },
    {
      label: "Whitelist",
      value: "whitelist",
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
            d="M20.8213 14.0576C20.2983 13.8716 19.7283 14.1446 19.5453 14.6666C18.4173 17.8566 15.3843 19.9996 12.0003 19.9996C7.58931 19.9996 4.00031 16.4116 4.00031 11.9996C4.00031 8.6156 6.14331 5.5826 9.33331 4.4546C9.85431 4.2716 10.1273 3.7006 9.94331 3.1796C9.75931 2.6596 9.1883 2.3856 8.6673 2.5706C4.67931 3.9796 2.00031 7.7686 2.00031 11.9996C2.00031 17.5136 6.48631 21.9996 12.0003 21.9996C16.2313 21.9996 20.0203 19.3216 21.4303 15.3326C21.6143 14.8126 21.3423 14.2416 20.8213 14.0576ZM14 10V4.071C17.061 4.511 19.489 6.938 19.929 10H14ZM13 2C12.448 2 12 2.447 12 3V11C12 11.553 12.448 12 13 12H21C21.552 12 22 11.553 22 11C22 6.037 17.962 2 13 2Z"
            fill="#757D8A"
          />
        </svg>
      ),
    },
    {
      label: "Registrations",
      value: "registrations",
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

  return (
    <div className="mt-0 flex h-screen w-72 flex-col justify-between bg-gray-100 px-5 font-dmsans opacity-100">
      <div className="flex flex-col pt-5">
        <div className="box-border flex h-16 flex-row items-center pt-6">
          <div className="h-20 w-20 rounded-full bg-indigo-800">
            <ButtonLink
              href="#"
              className="m-0 flex h-20 w-20 items-center justify-center border-0 bg-transparent p-0 shadow-none"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1243 2.06901C10.7686 0.327778 13.2314 0.327776 13.8757 2.06901L15.7322 7.08616C15.9348 7.63359 16.3664 8.06522 16.9138 8.26779L21.931 10.1243C23.6722 10.7686 23.6722 13.2314 21.931 13.8757L16.9138 15.7322C16.3664 15.9348 15.9348 16.3664 15.7322 16.9138L13.8757 21.931C13.2314 23.6722 10.7686 23.6722 10.1243 21.931L8.26779 16.9138C8.06522 16.3664 7.63359 15.9348 7.08616 15.7322L2.06901 13.8757C0.327778 13.2314 0.327776 10.7686 2.06901 10.1243L7.08616 8.26779C7.63359 8.06522 8.06522 7.63359 8.26779 7.08616L10.1243 2.06901Z"
                  fill="white"
                />
              </svg>
            </ButtonLink>
          </div>

          <div className="flex w-56 flex-col pt-1 pl-4 pr-7 font-dmsans">
            <div className="text-base font-normal text-gray-500">
              Welcome back,
            </div>
            <div className="text-xl font-bold text-gray-600">{user}</div>
          </div>

          {/* <div className='w-6 h-6 bg-red-700 '>
            {numNotifications}
          </div> */}

          {/* <ButtonLink
            href="/settings"
            className="box-border flex h-12 w-16 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300"
          >
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.3745 20H12.6255V19.233C12.6255 18.298 13.2005 17.458 14.0895 17.091C15.0095 16.708 16.0145 16.896 16.6765 17.562L17.2155 18.103L18.1035 17.215L17.5585 16.671C16.8955 16.009 16.7085 15.005 17.0815 14.114C17.0815 14.114 17.0825 14.113 17.0825 14.112L17.0935 14.084C17.4575 13.201 18.2985 12.625 19.2335 12.625H19.9995V11.375H19.2335C18.2985 11.375 17.4575 10.8 17.0915 9.911C16.7065 8.991 16.8955 7.986 17.5615 7.323L18.1025 6.784L17.2155 5.897L16.6705 6.442C16.0085 7.104 15.0055 7.291 14.1145 6.919C13.2015 6.542 12.6255 5.702 12.6255 4.767V4H11.3745V4.767C11.3745 5.702 10.7995 6.542 9.9105 6.909C8.9915 7.294 7.9865 7.105 7.3235 6.438L6.7845 5.897L5.8965 6.785L6.4415 7.329C7.1035 7.991 7.2915 8.995 6.9185 9.886C6.5425 10.799 5.7015 11.375 4.7665 11.375H3.9995V12.625H4.7665C5.7015 12.625 6.5425 13.2 6.9085 14.089C7.2935 15.009 7.1045 16.014 6.4385 16.677L5.8975 17.216L6.7845 18.103L7.3295 17.558C7.9915 16.896 8.9945 16.709 9.8855 17.081C10.7985 17.458 11.3745 18.298 11.3745 19.233V20ZM12.9425 22H11.0505C10.1265 22 9.3745 21.248 9.3745 20.324V19.233C9.3745 19.086 9.2575 18.985 9.1475 18.94C9.0035 18.881 8.8495 18.869 8.7435 18.972L7.9735 19.743C7.3175 20.397 6.2515 20.399 5.5965 19.743L4.2565 18.403C3.9385 18.085 3.7645 17.663 3.7645 17.213C3.7655 16.764 3.9405 16.342 4.2595 16.024L5.0275 15.259C5.1325 15.154 5.1215 15 5.0745 14.889C5.0145 14.742 4.9145 14.625 4.7665 14.625H3.6825C2.7545 14.625 1.9995 13.871 1.9995 12.943V11.051C1.9995 10.126 2.7515 9.375 3.6765 9.375H4.7665C4.9135 9.375 5.0145 9.257 5.0595 9.147C5.1195 9.003 5.1315 8.848 5.0275 8.744L4.2565 7.974C3.6025 7.317 3.6025 6.251 4.2565 5.597L5.5965 4.257C5.9145 3.939 6.3355 3.765 6.7845 3.765H6.7865C7.2355 3.765 7.6585 3.94 7.9755 4.259L8.7405 5.028C8.8455 5.134 9.0005 5.122 9.1115 5.075C9.2575 5.014 9.3745 4.914 9.3745 4.767V3.683C9.3745 2.755 10.1295 2 11.0575 2H12.9495C13.8735 2 14.6255 2.752 14.6255 3.676V4.767C14.6255 4.914 14.7425 5.015 14.8525 5.06C14.9975 5.12 15.1515 5.133 15.2565 5.028L16.0265 4.257C16.6825 3.603 17.7485 3.601 18.4035 4.257L19.7445 5.598C20.0625 5.915 20.2365 6.337 20.2355 6.787C20.2355 7.235 20.0605 7.658 19.7415 7.975L18.9725 8.741C18.8675 8.846 18.8785 9 18.9255 9.111C18.9855 9.258 19.0855 9.375 19.2335 9.375H20.3175C21.2455 9.375 21.9995 10.129 21.9995 11.057V12.949C21.9995 13.874 21.2485 14.625 20.3235 14.625H19.2335C19.0865 14.625 18.9855 14.743 18.9405 14.853C18.9395 14.854 18.9275 14.884 18.9265 14.886C18.8805 14.997 18.8685 15.152 18.9725 15.256L19.7435 16.026C20.3975 16.683 20.3975 17.749 19.7435 18.403L18.4035 19.743C18.0855 20.061 17.6645 20.235 17.2155 20.235H17.2135C16.7645 20.235 16.3415 20.06 16.0245 19.741L15.2595 18.972C15.1545 18.867 14.9985 18.879 14.8885 18.925C14.7425 18.986 14.6255 19.086 14.6255 19.233V20.317C14.6255 21.245 13.8705 22 12.9425 22ZM12 10.5C11.173 10.5 10.5 11.173 10.5 12C10.5 12.827 11.173 13.5 12 13.5C12.827 13.5 13.5 12.827 13.5 12C13.5 11.173 12.827 10.5 12 10.5ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"
                  fill="#757D8A"
                />
              </svg>
            </div>
          </ButtonLink> */}
        </div>

        <div className="mt-12 flex flex-col gap-5">
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

      <div>
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
      </div>
    </div>
  );
}
