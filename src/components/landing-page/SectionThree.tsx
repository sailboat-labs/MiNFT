/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import images from "./Images";
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
    "The Indians is a collection of 5,555 NFTs, and is an exclusive club-MAX Chutiyas to the core. Each Indian has a dream to become a Doctor, Engineer or nothing in life. All collectibles are on the Ethereum blockchain where they can do the needful and save crypto. Your India will grant you Supreme Chutiya status and you will have access to all our upcoming events at your local Mandir."
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
      <div className="flex flex-col justify-between px-10 pt-14 text-white md:px-20 md:pt-20 lg:flex-row lg:pt-28">
        <div className="w-full lg:w-1/3">
          <div className="pt-10 font-dmsans text-lg font-bold">
            <input
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
              rows={3}
              id="sectionthree-heading"
              className="h-80 w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 pb-8 font-serif text-8xl italic md:h-auto md:text-9xl "
              value={heading}
              onChange={changeHeading}
              onKeyDown={handleKeyDown}
              onBlur={changeHeading}
            />
          </div>
          <div className=" w-4/5">
            <textarea
              id="sectionthree-paragraph"
              className="h-80 w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent font-dmsans text-base leading-relaxed hover:resize focus:resize md:h-44 lg:h-64"
              value={paragraphText}
              onChange={changeParagraphText}
              onKeyDown={handleParagraphKeyDown}
              onBlur={changeParagraphText}
            />
          </div>
          <div className="flex justify-start pt-3 pb-5">
            <ButtonLink
              href=""
              className="rounded-xl border-0 bg-[#006C35] py-6 px-20 text-xl hover:bg-black"
            >
              Say Jai Mata Di
            </ButtonLink>
          </div>
        </div>
        <div className="mt-20 flex w-full flex-row justify-evenly lg:mt-0 lg:w-7/12">
          <div className="mt-14 md:mt-20 lg:mt-28">
            <div className="m-2 bg-[#7f9dc3] md:m-4">
              <img src={images.elements[3].src} alt={images.elements[3].alt} />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4">
              <img src={images.elements[4].src} alt={images.elements[4].alt} />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4">
              <img src={images.elements[5].src} alt={images.elements[5].alt} />
            </div>
          </div>
          <div>
            <div className="m-2 bg-[#7f9dc3] md:m-4">
              <img src={images.elements[2].src} alt={images.elements[2].alt} />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4">
              <img src={images.elements[1].src} alt={images.elements[1].alt} />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4">
              <img src={images.elements[7].src} alt={images.elements[7].alt} />
            </div>
            <div className="hidden h-24 items-center justify-center font-serif font-bold italic md:flex md:text-2xl lg:text-3xl">
              <span>&apos;&apos;Max Chutiya&apos;&apos;</span>
            </div>
          </div>
          <div className="mt-14 md:mt-20 lg:mt-28">
            <div className="m-2 bg-[#7f9dc3] md:m-4">
              <img src={images.elements[6].src} alt={images.elements[6].alt} />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4">
              <img src={images.elements[0].src} alt={images.elements[0].alt} />
            </div>
            <div className="m-2 bg-[#7f9dc3] md:m-4">
              <img src={images.elements[8].src} alt={images.elements[8].alt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
