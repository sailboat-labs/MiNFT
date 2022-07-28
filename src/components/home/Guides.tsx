/* eslint-disable @next/next/no-img-element */

import { isMobile } from "react-device-detect";

import ButtonLink from "@/components/links/ButtonLink";

import GuideSVG1 from "~/svg/homepage/guide_1.svg";
import GuideSVG2 from "~/svg/homepage/guide_2.svg";
import GuideSVG3 from "~/svg/homepage/guide_3.svg";
import VectorSVG2 from "~/svg/homepage/vector_2.svg";

export default function Guides() {
  const guides: {
    title: string;
    description: string;
    button: string;
    image: string;
  }[] = [
    {
      title: "How it works?",
      description:
        "Follow the steps, hit generate, then watch your NFT collection come to life in seconds. Layers not quite right? Change the order and preview it again. You, the creator, have total control in one easy-to-use tool.",
      button: "Start now",
      image: "/images/homepage/guide_1.png",
    },
    {
      title: "Magic Mynt Contract",
      description:
        "We've made it so easy to deploy your smart contract, you'll want to put our wallet address in your royalty box just to thank us! Follow our seamless process, test and adjust your parameters as many times as you need, then deploy when ready.",
      button: "Start now",
      image: "/images/homepage/guide_2.png",
    },
    {
      title: "Magic Mynt List",
      description:
        "An NFT launch needs two things to succeed: hype and community. Lucky for you, our Discord and Twitter verification make it super easy to let the humans in and keep the bots out of your pre-sale list.",
      button: "Start now",
      image: "/images/homepage/guide_3.png",
    },
  ];

  return (
    <div className="relative">
      <div className="relative z-0 flex justify-start ">
        <VectorSVG2 className="absolute z-0 -ml-20 -mt-60 h-[30rem] w-[25rem] sm:h-[50rem] sm:w-[50rem]" />
      </div>
      <div className="relative z-30 mx-auto w-10/12 border-b border-t border-black">
        <div className="m-auto flex flex-col px-5 pt-20 pb-6 font-montserrat sm:w-4/5 lg:w-3/4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="z-30 mb-12 flex flex-row items-center justify-center rounded-2xl border border-black bg-transparent px-10 py-8 text-[#1F1A17] lg:h-96 lg:justify-between lg:px-16 lg:py-10  "
            >
              <div className="flex flex-col justify-center lg:w-[30rem]">
                <div className="text-2xl font-bold">{guide.title}</div>
                <div className="relative z-30 mt-5 text-base font-normal">
                  {guide.description}
                </div>
                <div
                  className={
                    process.env.NEXT_PUBLIC_ENVIRONMENT == "development"
                      ? "block"
                      : "hidden"
                  }
                >
                  <ButtonLink
                    className="mt-7 flex h-10 w-48 items-center justify-center rounded-lg border border-black bg-transparent text-base font-bold text-[#1F1A17] shadow-none hover:bg-[#202020] hover:text-white"
                    href={isMobile ? "/" : "/dashboard"}
                    onClick={() => {
                      if (isMobile) {
                        alert(
                          "This software does not work on a mobile device. Please switch to another device and try again."
                        );
                      }
                    }}
                  >
                    {guide.button}
                  </ButtonLink>
                </div>
              </div>
              <div className="hidden h-96 w-80 items-center justify-center  lg:flex">
                {/* <img src={guide.image} alt="Preview" className="" /> */}
                {index + 1 == 1 ? (
                  <GuideSVG1 className="h-full w-full" />
                ) : index + 1 == 2 ? (
                  <GuideSVG2 className="h-full w-full" />
                ) : (
                  <GuideSVG3 className="h-full w-full" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
