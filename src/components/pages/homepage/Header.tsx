import React from "react";

import UnstyledLink from "../../links/UnstyledLink";

export default function Header() {
  return (
    <div className="flex h-12 w-full flex-row items-center bg-indigo-800 font-montserrat font-bold text-white">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-10 sm:ml-20 lg:ml-40 mr-3"
      >
        <path
          d="M10.1243 2.06901C10.7686 0.327778 13.2314 0.327776 13.8757 2.06901L15.7322 7.08616C15.9348 7.63359 16.3664 8.06522 16.9138 8.26779L21.931 10.1243C23.6722 10.7686 23.6722 13.2314 21.931 13.8757L16.9138 15.7322C16.3664 15.9348 15.9348 16.3664 15.7322 16.9138L13.8757 21.931C13.2314 23.6722 10.7686 23.6722 10.1243 21.931L8.26779 16.9138C8.06522 16.3664 7.63359 15.9348 7.08616 15.7322L2.06901 13.8757C0.327778 13.2314 0.327776 10.7686 2.06901 10.1243L7.08616 8.26779C7.63359 8.06522 8.06522 7.63359 8.26779 7.08616L10.1243 2.06901Z"
          fill="white"
        />
      </svg>
      <UnstyledLink href="/" className="lg:mr-14 w-24 text-xl">
        MiNFT
      </UnstyledLink>
      <span className="hidden sm:w-2/5 md:inline md:w-1/2"></span>
      <div className="text-base lg:ml-0">
        <UnstyledLink href="/get-started" className=" w-24 mr-10 lg:mr-14">
          Get started
        </UnstyledLink>
        <UnstyledLink href="/contact-us" className="w-24">
          Contact us
        </UnstyledLink>
      </div>
    </div>
  );
}
