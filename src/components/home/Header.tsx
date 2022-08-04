import ContactUs from "features/launch/launch/components/contact-us";
import { useRouter } from "next/router";
import React from "react";

import DarkModeMenu from "../layout/DarkmodeToggle";
import UnstyledLink from "../links/UnstyledLink";

import StarSVG from "~/svg/homepage/header_star.svg";

export default function Header() {
  const router = useRouter();

  return (
    <div className="fixed z-40 flex h-12 w-full flex-row items-center border-b border-[#1F1A17] bg-white font-montserrat text-[#1F1A17] dark:border-gray-500  dark:bg-[color:var(--dark)]">
      <StarSVG className="mx-3 h-6 w-6 filter dark:brightness-0 dark:invert sm:ml-20 lg:ml-40" />
      <UnstyledLink
        href="/"
        className="w-fit text-xl font-semibold dark:text-white"
      >
        Magic Mynt
      </UnstyledLink>
      <span className="w-6 sm:w-1/5 md:inline md:w-2/5 lg:w-1/2 xl:w-3/5"></span>
      <div className="hidden flex-row text-base md:flex lg:ml-0">
        <span
          className="cursor-pointer font-semibold dark:font-medium dark:text-gray-400 sm:mr-10 lg:mr-14"
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
        <ContactUs />
        <DarkModeMenu />
      </div>
    </div>
  );
}
