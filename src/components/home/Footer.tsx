// ! Change the links in the footer to point to the correct page when flows are done.
// ! Also update the links to social media pages

// import UnstyledLink from "../links/UnstyledLink";

// import FacebookSVG from "~/svg/socials/facebook.svg";
// import InstagramSVG from "~/svg/socials/instagram.svg";
// import LinkedinSVG from "~/svg/socials/linkedin.svg";
// import PinterestSVG from "~/svg/socials/pinterest.svg";
// import TwitterSVG from "~/svg/socials/twitter.svg";
// import YoutubeSVG from "~/svg/socials/youtube.svg";

import RequestDemoLink from "../buttons/RequestDemoLink";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-auto w-full border-t border-black bg-white pb-20 font-montserrat font-medium text-[#1F1A17]">
      <div className="m-auto flex flex-col items-center pt-10 lg:w-4/5">
        <div className="m-auto h-10 w-4/5 text-lg opacity-100 lg:w-3/4">
          <div>&copy; {currentYear} Magic Mynt. All rights reserved.</div>
        </div>

        <div className="mx-auto my-6 h-10 w-4/5 text-lg opacity-100 lg:w-3/4">
          <RequestDemoLink className="my-2 w-fit cursor-pointer rounded-xl border border-black px-5 py-2 hover:bg-black hover:text-white" />
        </div>

        {/* <div>
          <div className="mt-5 flex w-96 flex-col justify-between text-base sm:mt-0 sm:flex-row">
            <UnstyledLink href="/get-started">Get Started</UnstyledLink>
            <UnstyledLink href="/contact-us">Contact us</UnstyledLink>
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
        </div> */}
      </div>
    </div>
  );
}
