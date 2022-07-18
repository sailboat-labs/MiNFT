import { useRouter } from "next/router";
import React from "react";

import UnstyledLink from "../links/UnstyledLink";

import StarSVG from "~/svg/homepage/header_star.svg";

export default function Header() {
  const router = useRouter();

  return (
    <div className="fixed z-40 flex h-12 w-full flex-row items-center border border-[#1F1A17] bg-white font-montserrat font-extrabold text-[#1F1A17]">
      <StarSVG className="ml-10 mr-3 h-6 w-6 sm:ml-20 lg:ml-40" />
      <UnstyledLink href="/" className="w-24 text-xl lg:mr-14">
        MiNFT
      </UnstyledLink>
      <span className="hidden sm:w-1/5 md:inline md:w-2/5 lg:w-3/5"></span>
      <div className="flex flex-row text-base lg:ml-0">
        <span
          className=" mr-10 w-24 cursor-pointer lg:mr-14"
          onClick={() => {
            process.env.NEXT_PUBLIC_ENVIRONMENT == "development"
              ? router.push("/dashboard")
              : window.open("https://r3c9oapreew.typeform.com/to/RDOUdJXk");
          }}
        >
          {process.env.NEXT_PUBLIC_ENVIRONMENT == "development"
            ? "Get Started"
            : "Join Waitlist"}
        </span>
        <UnstyledLink href="" className="w-24">
          Contact us
        </UnstyledLink>
      </div>
    </div>
  );
}
