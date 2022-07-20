/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import ButtonLink from "../links/ButtonLink";

import DiyaSVG from "~/svg/landing/diya.svg";

export default function SectionTwo() {
  const [heading, setHeading] = useState(
    "Rajeev the dev is here to make the price go up"
  );

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      changeHeading(e);
    }
  };

  const [aboutText, setAboutText] = useState(
    "The BJP and Rajasthan Royals welcomes you to the Taj Mahal! We have worked with the finest Indians, Legends, Pujaris to replace the Rupee with Bitcoin and ETH. This is the only way to save Crypto. Put on your kala chasma and strap in your dhotis to embark on this journey with us. You may get lucky like Lalit Modi and find your Sushmita Sen. Scream the magic mantra and mint you Bhenchod Jai Mata Di Let's Rock"
  );

  const changeAboutText = (e: any) => {
    e.preventDefault();
    setAboutText(e.target.value);
  };

  const handleKeyDownOnAbout = (e: any) => {
    if (e.keyCode == 13) {
      changeAboutText(e);
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 md:pt-32 lg:flex-row lg:pt-36">
      <div className="w-full text-white lg:w-1/2">
        <div className="text-center">
          <div className="mx-auto w-4/5">
            <textarea
              disabled
              id="sectiontwo-heading"
              className="h-[20rem] w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 text-center font-serif text-6xl italic leading-tight hover:resize focus:resize md:h-[25rem] md:text-8xl lg:h-60 lg:text-7xl"
              value={heading}
              onChange={changeHeading}
              onKeyDown={handleKeyDown}
              onBlur={changeHeading}
            />
            {/* <img src={images.scimitar} alt="Scimitar" className="m-auto" /> */}
            <DiyaSVG className='m-auto h-72 w-72 p-0 -mt-20 -mb-20' />
          </div>
          <div>
            <textarea
              disabled
              id="sectiontwo-paragraph"
              className="h-[28rem] w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-10 text-center font-dmsans text-xl leading-relaxed md:h-60 lg:h-[15rem] lg:w-2/3 lg:text-base"
              value={aboutText}
              onChange={changeAboutText}
              onKeyDown={handleKeyDownOnAbout}
              onBlur={changeAboutText}
            />
          </div>
          <div className="flex justify-center pt-10 pb-5 md:pt-3">
            <ButtonLink
              href=""
              className="rounded-xl border-0 bg-[#006C35] py-6 px-20 text-xl hover:bg-black"
            >
              Say Jai Ho
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="h-[35rem] p-10 sm:p-20 lg:p-10">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/XQGec9ntkfs"
            title="OK OK I need the price to go up indian version"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
