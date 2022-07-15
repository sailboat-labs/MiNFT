/* eslint-disable @next/next/no-img-element */
import images from "./Images";
import ButtonLink from "../links/ButtonLink";
import UnstyledLink from "../links/UnstyledLink";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center px-2 py-3 text-white">
        <div className="flex w-1/3 justify-start">
          <UnstyledLink href="" className="text-2xl font-extrabold uppercase">
            THE SAUDIS
          </UnstyledLink>
        </div>
        <div className="w-1/3 space-x-20">
          <UnstyledLink href="">Become a Sheik</UnstyledLink>
          <UnstyledLink href="">About</UnstyledLink>
          <UnstyledLink href="">Collection</UnstyledLink>
        </div>
        <div className="mr-1 flex w-1/3 flex-row items-center justify-end space-x-3">
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
