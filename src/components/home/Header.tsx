import { useRouter } from "next/router";
import React from "react";

import UnstyledLink from "../links/UnstyledLink";

import StarSVG from "~/svg/homepage/header_star.svg";
import ContactLink from "../buttons/ContactLink";

export default function Header( { viewContactForm } ) {
  const router = useRouter();

  return (
    <div className="fixed z-40 flex h-12 w-full flex-row items-center border border-[#1F1A17] bg-white font-montserrat font-extrabold text-[#1F1A17]">
      <StarSVG className="mx-3 h-6 w-6 sm:ml-20 lg:ml-40" />
      <UnstyledLink href="/" className="w-fit text-xl ">
        Magic Mynt
      </UnstyledLink>
      <span className="w-6 sm:w-1/5 md:inline md:w-2/5 lg:w-1/2 xl:w-3/5"></span>
      <div className="hidden flex-row text-base md:flex lg:ml-0">
        <span
          className=" cursor-pointer sm:mr-10 lg:mr-14"
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
        <ContactLink className='cursor-pointer' />
      </div>
    </div>
  );
}
