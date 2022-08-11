import { useRouter } from "next/router";
import React from "react";

import ContactLink from "../buttons/ContactLink";
import UnstyledLink from "../links/UnstyledLink";

import StarSVG from "~/svg/homepage/header_star.svg";

export default function Header() {
  const router = useRouter();

  return (
    <div className="fixed z-40 flex h-12 w-full flex-row items-center border border-[#1F1A17] bg-white font-montserrat font-extrabold text-[#1F1A17] 2xl:h-20">
      <StarSVG className="mx-3 h-6 w-6 sm:ml-20 lg:ml-40 2xl:h-8 2xl:w-8" />
      <UnstyledLink href="/" className="w-fit text-xl 2xl:text-2xl">
        Magic Mynt
      </UnstyledLink>
      <span className="flex justify-end w-6 sm:w-1/5 md:inline md:w-1/3 lg:w-1/3 xl:w-1/2 2xl:w-3/5"></span>
      <div className="hidden flex-row mr-8 justify-end text-base md:flex md:ml-12 lg:ml-0 2xl:text-xl">
        <span
          className=" cursor-pointer w-fit sm:mr-10 lg:mr-14"
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
        <ContactLink className="cursor-pointer w-fit" />
      </div>
    </div>
  );
}
