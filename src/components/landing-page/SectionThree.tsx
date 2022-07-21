/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import ButtonLink from "../links/ButtonLink";
export default function SectionThree() {
  const [heading, setHeading] = useState("5,555 Indian Doctors");

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      changeHeading(e);
    }
  };

  const [paragraphText, setParagraphText] = useState(
    "The Indians is a collection of 5,555 NFTs, and is an exclusive club - MAX Chutiyas to the core. Each Indian has a dream to become a Doctor or an Engineer in life, nothing else. All collectibles are on the Ethereum blockchain where they can do the needful and save crypto. Your Indian will grant you Supreme Chutiya status and you will have access to all our upcoming events at your local Mandir."
  );

  const changeParagraphText = (e: any) => {
    e.preventDefault();
    setParagraphText(e.target.value);
  };

  const handleParagraphKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      setParagraphText(e.target.value);
    }
  };

  const [highlight, setHighlight] = useState("Jai Mata Di");

  const changeHighlight = (e: any) => {
    e.preventDefault();
    setHighlight(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col justify-between pt-14 text-white lg:flex-row lg:px-10 lg:pt-28">
        <div className="w-full pl-10 md:pl-20 lg:w-2/5">
          <div className="pt-10 font-dmsans text-lg font-bold">
            <input
              disabled
              type="text"
              id="sectionthree-highlight"
              value={highlight}
              onChange={changeHighlight}
              onBlur={changeHighlight}
              className="w-full border-0 bg-transparent text-xl md:text-2xl lg:text-lg"
            />
          </div>
          <div className="">
            <textarea
              disabled
              rows={3}
              id="sectionthree-heading"
              className="h-80 w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 pb-8 font-serif text-8xl italic md:h-auto md:text-9xl lg:text-8xl "
              value={heading}
              onChange={changeHeading}
              onKeyDown={handleKeyDown}
              onBlur={changeHeading}
            />
          </div>
          <div className=" w-4/5">
            <textarea
              disabled
              id="sectionthree-paragraph"
              className="h-80 w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent font-dmsans text-base leading-relaxed md:h-44 lg:h-64"
              value={paragraphText}
              onChange={changeParagraphText}
              onKeyDown={handleParagraphKeyDown}
              onBlur={changeParagraphText}
            />
          </div>
          <div className="flex justify-start pt-3 pb-5">
            <ButtonLink
              href="#join-whitelist"
              className="rounded-xl border-0 bg-[#006C35] py-6 px-20 text-xl hover:bg-black"
            >
              Say Jai Mata Di
            </ButtonLink>
          </div>
        </div>
        <div className="mt-20 flex w-full flex-row justify-evenly px-5 lg:mt-0 lg:w-7/12 lg:px-0">
          <div className="mt-14 md:mt-20 lg:mt-28">
            <div className="m-2 bg-[#7f9dc3] md:m-4 lg:m-2">
              <img
                src="/images/landing/indiansnfts/1.png"
                alt="Indian NFT Example"
              />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4 lg:m-2">
              <img
                src="/images/landing/indiansnfts/2.png"
                alt="Indian NFT Example"
              />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4 lg:m-2">
              <img
                src="/images/landing/indiansnfts/3.png"
                alt="Indian NFT Example"
              />
            </div>
          </div>
          <div>
            <div className="m-2 bg-[#7f9dc3] md:m-4 lg:m-2">
              <img
                src="/images/landing/indiansnfts/4.png"
                alt="Indian NFT Example"
              />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4 lg:m-2">
              <img
                src="/images/landing/indiansnfts/5.png"
                alt="Indian NFT Example"
              />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4 lg:m-2">
              <img
                src="/images/landing/indiansnfts/6.png"
                alt="Indian NFT Example"
              />
            </div>
            <div className="hidden h-24 items-center justify-center font-serif font-bold italic md:flex md:text-2xl lg:text-3xl">
              <span>&apos;&apos;Max Chutiya&apos;&apos;</span>
            </div>
          </div>
          <div className="mt-14 md:mt-20 lg:mt-28">
            <div className="m-2 bg-[#7f9dc3] md:m-4 lg:m-2">
              <img
                src="/images/landing/indiansnfts/7.png"
                alt="Indian NFT Example"
              />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4 lg:m-2">
              <img
                src="/images/landing/indiansnfts/8.png"
                alt="Indian NFT Example"
              />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4 lg:m-2">
              <img
                src="/images/landing/indiansnfts/9.png"
                alt="Indian NFT Example"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
