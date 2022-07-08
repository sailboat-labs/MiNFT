// ! Change the links in the footer to point to the correct page when flows are done.
// ! Also update the links to social media pages

import UnstyledLink from "../../links/UnstyledLink";

import FacebookSVG from "~/svg/socials/facebook.svg";
import InstagramSVG from "~/svg/socials/instagram.svg";
import LinkedinSVG from "~/svg/socials/linkedin.svg";
import PinterestSVG from "~/svg/socials/pinterest.svg";
import TwitterSVG from "~/svg/socials/twitter.svg";
import YoutubeSVG from "~/svg/socials/youtube.svg";

export default function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div className="h-auto w-full bg-indigo-800 pb-10 font-montserrat text-white">
      <div className="m-auto flex w-10/12 flex-col justify-between pt-10 sm:flex-row">
        <div className="h-10 w-96 text-base text-white opacity-100">
          <div>Copyright &copy; {currentYear}</div>
          <div>NFT Trait Combo. All rights reserved.</div>
        </div>

        <div>
          <div className="mt-5 flex w-96 flex-col justify-between text-base sm:mt-0 sm:flex-row">
            <UnstyledLink href="https://r3c9oapreew.typeform.com/to/RDOUdJXk" target='_blank'>
              Register interest
            </UnstyledLink>
            <UnstyledLink href="#contact">Contact us</UnstyledLink>
            <UnstyledLink href="/about-us">About us</UnstyledLink>
          </div>

          <div className="m-auto mt-10 -mr-2 flex flex-row items-center justify-between lg:float-right">
            <UnstyledLink href="#" target="_blank">
              <FacebookSVG className="h-12 w-12 bg-transparent" />
            </UnstyledLink>

            <UnstyledLink href="#" target="_blank">
              <TwitterSVG className="h-14 w-14" />
            </UnstyledLink>

            <UnstyledLink href="#" target="_blank">
              <PinterestSVG className="h-12 w-12" />
            </UnstyledLink>

            <UnstyledLink href="#" target="_blank">
              <LinkedinSVG className="h-12 w-12" />
            </UnstyledLink>

            <UnstyledLink href="#" target="_blank">
              <YoutubeSVG className="h-14 w-14" />
            </UnstyledLink>

            <UnstyledLink href="#" target="_blank">
              <InstagramSVG className="h-14 w-14" />
            </UnstyledLink>
          </div>
        </div>
      </div>
    </div>
  );
}
