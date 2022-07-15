/* eslint-disable @next/next/no-img-element */
import images from "./Images";
import ButtonLink from "../links/ButtonLink";
import UnstyledLink from "../links/UnstyledLink";

export default function Footer() {

  const year = new Date().getUTCFullYear();

  return (
    <div className="mx-auto w-10/12 font-dmsans text-white">
      <div className=" flex flex-row items-center justify-between px-2 py-3 ">
        <div className="flex justify-start">
          <UnstyledLink href="" className="text-2xl font-extrabold">
            THE SAUDIS
          </UnstyledLink>
        </div>
        <div className=" space-x-20">
          <UnstyledLink href="" className="text-2xl font-extrabold uppercase">
            Become a Sheik
          </UnstyledLink>
          <UnstyledLink href="" className="text-2xl font-extrabold uppercase">
            About
          </UnstyledLink>
          <UnstyledLink href="" className="text-2xl font-extrabold uppercase">
            Collection
          </UnstyledLink>
        </div>
        <div className="mr-1 flex flex-row items-center justify-end space-x-3">
          <UnstyledLink href="">
            <img src={images.discordSrc} alt="Discord" />
          </UnstyledLink>
          <UnstyledLink href="">
            <img src={images.twitterSrc} alt="Twitter" />
          </UnstyledLink>
        </div>
      </div>
      <div className="mt-14 pb-5 pl-2 text-base">
        &copy; {year} Kingdom&apos;s Lab. All rights reserved.
      </div>
    </div>
  );
}
