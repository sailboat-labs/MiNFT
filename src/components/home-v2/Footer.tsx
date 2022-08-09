import React from "react";

import RequestDemoLink from "../buttons/RequestDemoLink";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-auto w-full border-t border-black bg-white pb-20 font-montserrat font-medium text-[#1F1A17]">
      <div className="m-auto flex flex-col items-center pt-10 lg:w-4/5 2xl:w-1/2">
        <div className=" h-10 w-4/5 text-lg opacity-100 lg:w-3/4 2xl:w-full 2xl:text-2xl">
          <div>&copy; {currentYear} Magic Mynt. All rights reserved.</div>
        </div>

        <div className="mx-auto my-6 h-10 w-4/5 text-lg opacity-100 lg:w-3/4 2xl:w-full">
          <RequestDemoLink className="my-2 w-fit cursor-pointer rounded-xl border border-black px-5 py-2 hover:bg-black hover:text-white 2xl:text-2xl 2xl:px-10 2xl:py-5" />
        </div>

      </div>
    </div>
  );
}
