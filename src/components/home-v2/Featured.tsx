import React from "react";

import FeaturedSVG from "~/svg/homeV2/featured.svg";

type FeaturedProps = {
  username?: string;
  createdOn?: string;
};

export default function Featured({ username, createdOn }: FeaturedProps) {
  return (
    <div className="w-full">
      <p className="font-montserrat text-xl font-medium text-[#222020] 2xl:text-4xl">
        Featured waitlist
      </p>
      <div className="">
        <div className="-ml-5">
          <FeaturedSVG className="h-full w-full lg:h-[25rem] lg:w-[25rem] 2xl:h-[40rem] 2xl:w-[40rem]" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div className="h-10 w-10 rounded-full border border-black bg-black 2xl:h-16 2xl:w-16"></div>
            <div className="mx-3 font-montserrat text-sm font-medium text-[#222020] 2xl:text-2xl">
              @{username}
            </div>
          </div>
          <div className="font-montserrat text-sm font-bold text-[#222020] 2xl:text-2xl">
            {createdOn}
          </div>
        </div>
      </div>
    </div>
  );
}
