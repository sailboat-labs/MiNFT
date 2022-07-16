/* eslint-disable @next/next/no-img-element */
import images from "./Images";
import ButtonLink from "../links/ButtonLink";
import UnstyledLink from "../links/UnstyledLink";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center py-5 px-2 text-white md:py-4 lg:py-3">
        <div className="mx-auto flex w-1/2 justify-center lg:w-1/3 lg:justify-start">
          <UnstyledLink
            href=""
            className="text-3xl font-extrabold uppercase md:text-4xl lg:text-2xl"
          >
            THE SAUDIS
          </UnstyledLink>
        </div>
        <div className="hidden w-1/3 space-x-20 lg:block">
          <UnstyledLink href="">Become a Sheik</UnstyledLink>
          <UnstyledLink href="">About</UnstyledLink>
          <UnstyledLink href="">Collection</UnstyledLink>
        </div>
        <div className="mr-1 hidden w-1/3 flex-row items-center justify-end space-x-3 lg:flex">
          <UnstyledLink href="">
            <img src={images.discordSrc} alt="Discord" />
          </UnstyledLink>
          <UnstyledLink href="">
            <img src={images.twitterSrc} alt="Twitter" />
          </UnstyledLink>
          <ButtonLink
            href=""
            className="rounded-2xl border-black bg-black py-3 px-12 uppercase hover:bg-black"
          >
            Sold out
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
