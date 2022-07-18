/* eslint-disable @next/next/no-img-element */
import images from "./Images";
import UnstyledLink from "../links/UnstyledLink";

export default function Footer() {
  const year = new Date().getUTCFullYear();

  return (
    <div className="mx-auto w-10/12 font-dmsans text-white">
      <div className=" flex flex-col items-center justify-between px-2 py-3 lg:flex-row ">
        <div className="mb-10 flex justify-center lg:mb-0 lg:justify-start">
          <UnstyledLink
            href=""
            className="text-4xl font-extrabold md:text-5xl lg:text-2xl"
          >
            THE SAUDIS
          </UnstyledLink>
        </div>
        <div className="mt-7 flex w-full flex-col items-center md:mt-10 lg:mt-0 lg:w-auto lg:flex-row lg:space-x-20">
          <UnstyledLink
            href=""
            className="mb-6 text-2xl font-extrabold uppercase md:text-3xl lg:mb-0"
          >
            Become a Sheik
          </UnstyledLink>
          <UnstyledLink
            href=""
            className="mb-6 text-2xl font-extrabold uppercase md:text-3xl lg:mb-0"
          >
            About
          </UnstyledLink>
          <UnstyledLink
            href=""
            className="mb-6 text-2xl font-extrabold uppercase md:text-3xl lg:mb-0"
          >
            Collection
          </UnstyledLink>
        </div>
        <div className="mr-1 mt-7 flex flex-col items-center justify-center md:mt-10 lg:mt-0 lg:flex-row lg:justify-end lg:space-x-3">
          <UnstyledLink href="" className="mb-10 lg:mb-0">
            <img
              src={images.discordSrc}
              alt="Discord"
              className="h-20 w-20 md:h-24 md:w-24 lg:h-auto lg:w-auto"
            />
          </UnstyledLink>
          <UnstyledLink href="">
            <img
              src={images.twitterSrc}
              alt="Twitter"
              className="h-24 w-24 md:h-28 md:w-28 lg:h-auto lg:w-auto"
            />
          </UnstyledLink>
        </div>
      </div>
      <div className="mt-10 pb-5 pl-2 text-center text-base lg:text-start lg:mt-14">
        &copy; {year} Kingdom&apos;s Lab. All rights reserved.
      </div>
    </div>
  );
}
