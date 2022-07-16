import React from "react";

import UnstyledLink from "../links/UnstyledLink";

import StarSVG from "~/svg/homepage/header_star.svg";

export default function Header() {
  return (
    <div className="fixed z-40 flex h-12 w-full flex-row items-center border border-[#1F1A17] bg-white font-montserrat font-extrabold text-[#1F1A17]">
      <StarSVG className="ml-10 mr-3 h-6 w-6 sm:ml-20 lg:ml-40" />
      <UnstyledLink href="/" className="w-24 text-xl lg:mr-14">
        MiNFT
      </UnstyledLink>
      <span className="hidden sm:w-1/5 md:inline md:w-2/5 lg:w-3/5"></span>
      <div className="text-base lg:ml-0">
        <UnstyledLink href="/get-started" className=" mr-10 w-24 lg:mr-14">
          Get started
        </UnstyledLink>
        <UnstyledLink href="/contact-us" className="w-24">
          Contact us
        </UnstyledLink>
      </div>
    </div>
  );
}
