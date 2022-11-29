/* eslint-disable @next/next/no-img-element */
import React from "react";

import { PROFILE_IMAGE } from "@/data/DemoProject";

import ProfileIcon from "@/components/shared/ProfileIcon";

export default function LaunchHeader() {
  return (
    // <div className="fixed ml-96 mt-12 w-full bg-white opacity-100">
    <div className="h-fit w-full bg-white opacity-100 dark:bg-[color:var(--dark)]">
      {/* Top Navigation Bar */}
      <div className="flex w-full flex-row items-center border-b border-gray-300 py-2">
        <div className="flex w-full items-center justify-between pr-10 font-dmsans">
          <span className="pl-6 text-xl font-bold text-gray-700">
            Magic Mynt
          </span>
          <div className="flex items-center gap-5">
            <div className="hidden h-10 items-center gap-3 border-l-2 pl-5 xl:flex">
              <img
                className="h-full w-fit rounded-full"
                src={PROFILE_IMAGE}
                alt=""
              />
              <div className="flex flex-col">
                <div>
                  <ProfileIcon />
                </div>
                <span className="-mt-1 text-xs text-gray-500">Free Plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
