import React from "react";

import UnstyledLink from "../links/UnstyledLink";

type NavBarProps = {
  title?: string;
};

export default function Navbar( { title }: NavBarProps) {

  return (
    // <div className="fixed ml-96 mt-12 w-full bg-white opacity-100">
    <div className="mt-12 w-full bg-white opacity-100">
      {/* Top Navigation Bar */}
      <div className="flex h-24 w-full flex-row items-center border-b border-gray-300">
        <div>
          <UnstyledLink
            href="/dashboard"
            className="ml-9 flex h-12 w-14 items-center justify-center rounded-full border-0 bg-gray-100 text-gray-500 hover:bg-gray-300 hover:text-gray-600"
          >
            <div>
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 5.99997H3.135L6.768 1.63997C7.122 1.21597 7.064 0.58497 6.64 0.23197C6.215 -0.12203 5.585 -0.0640299 5.232 0.35997L0.232 6.35997C0.193 6.40697 0.173 6.46197 0.144 6.51397C0.12 6.55597 0.091 6.59197 0.073 6.63797C0.028 6.75297 0.001 6.87397 0.001 6.99597C0.001 6.99697 0 6.99897 0 6.99997C0 7.00097 0.001 7.00297 0.001 7.00397C0.001 7.12597 0.028 7.24697 0.073 7.36197C0.091 7.40797 0.12 7.44397 0.144 7.48597C0.173 7.53797 0.193 7.59297 0.232 7.63997L5.232 13.64C5.43 13.877 5.714 14 6 14C6.226 14 6.453 13.924 6.64 13.768C7.064 13.415 7.122 12.784 6.768 12.36L3.135 7.99997H15C15.552 7.99997 16 7.55197 16 6.99997C16 6.44797 15.552 5.99997 15 5.99997Z"
                  fill="#757D8A"
                />
              </svg>
            </div>
          </UnstyledLink>
        </div>

        <div className="w-96 font-dmsans">
          <span className="pl-6 text-3xl font-bold text-gray-700">
            {title}
          </span>
        </div>

        <span id="spacer" className='w-52'></span>

        <div className="ml-96 rounded-lg border border-gray-300 shadow">
          <UnstyledLink
            href="/dashboard"
            className="flex h-12 w-16 items-center justify-center"
          >
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
                d="M5.5146 16L6.6946 14.818C7.0726 14.44 7.2806 13.938 7.2806 13.404V8.727C7.2806 7.37 7.8706 6.073 8.9006 5.171C9.9386 4.261 11.2606 3.861 12.6376 4.042C14.9646 4.351 16.7196 6.455 16.7196 8.937V13.404C16.7196 13.938 16.9276 14.44 17.3046 14.817L18.4856 16H5.5146ZM13.9996 18.341C13.9996 19.24 13.0836 20 11.9996 20C10.9156 20 9.9996 19.24 9.9996 18.341V18H13.9996V18.341ZM20.5206 15.208L18.7196 13.404V8.937C18.7196 5.456 16.2176 2.499 12.8996 2.06C10.9776 1.804 9.0376 2.391 7.5826 3.667C6.1186 4.949 5.2806 6.793 5.2806 8.727L5.2796 13.404L3.4786 15.208C3.0096 15.678 2.8706 16.377 3.1246 16.99C3.3796 17.604 3.9726 18 4.6366 18H7.9996V18.341C7.9996 20.359 9.7936 22 11.9996 22C14.2056 22 15.9996 20.359 15.9996 18.341V18H19.3626C20.0266 18 20.6186 17.604 20.8726 16.991C21.1276 16.377 20.9896 15.677 20.5206 15.208Z"
                fill="#757D8A"
              />
            </svg>
          </UnstyledLink>
        </div>
      </div>
    </div>
  );
}
