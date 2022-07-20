/* eslint-disable @next/next/no-img-element */
import images from "./Images";
import ButtonLink from "../links/ButtonLink";
import UnstyledLink from "../links/UnstyledLink";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between py-5 px-20 text-white md:py-4 lg:py-3">
        <div className="mx-auto flex justify-center lg:mx-0 lg:justify-start">
          <UnstyledLink
            href=""
            className="text-3xl font-extrabold uppercase md:text-4xl lg:text-2xl"
          >
            THE INDIANS
          </UnstyledLink>
        </div>
        <div className="hidden space-x-20 lg:block">
          <UnstyledLink href="/whitelist">Join Whitelist</UnstyledLink>
          <UnstyledLink href="">Become a Bhenchod</UnstyledLink>
          <UnstyledLink href="">About</UnstyledLink>
          <UnstyledLink href="">Collection</UnstyledLink>
        </div>
        <div className="mr-1 hidden flex-row items-center justify-end space-x-3 lg:flex">
          <UnstyledLink
            href="https://discord.gg/xdtvt9g6"
            target="_blank"
          >
            <img src={images.discordSrc} alt="Discord" />
          </UnstyledLink>
          <UnstyledLink
            href="https://twitter.com/TheIndianNFTs"
            target="_blank"
          >
            <img src={images.twitterSrc} alt="Twitter" />
          </UnstyledLink>
          <ButtonLink
            href=""
            className="rounded-2xl border-black bg-black py-3 px-12 uppercase hover:bg-black"
          >
            MINT NOW
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
