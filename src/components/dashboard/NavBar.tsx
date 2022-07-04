/* eslint-disable @next/next/no-img-element */
import React from "react";

import { PROFILE_IMAGE } from "@/data/DemoProject";

import ProfileIcon from "../shared/ProfileIcon";

type NavBarProps = {
  title?: string;
  endChildren?: any;
};

export default function Navbar({ title, endChildren }: NavBarProps) {
  return (
    // <div className="fixed ml-96 mt-12 w-full bg-white opacity-100">
    <div className="w-full bg-white opacity-100">
      {/* Top Navigation Bar */}
      <div className="flex w-full flex-row items-center border-b border-gray-300 py-4">
        <div className="flex w-full items-center justify-between pr-10 font-dmsans">
          <span className="pl-6 text-xl font-bold text-gray-700">{title}</span>
          <div className="flex items-center gap-5">
            {endChildren}
            <div className="flex h-10 items-center gap-3 border-l-2 pl-5">
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
