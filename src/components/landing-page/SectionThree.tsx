/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import images from "./Images";
import ButtonLink from "../links/ButtonLink";
export default function SectionThree() {
  const [heading, setHeading] = useState("5,555 Saudis strong");

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
    "The Saudis is a collection of 5,555 NFTs, and is an exclusive club—MAX BIDDING to the top. Each Saudi is unique and programmatically generated from over 80 possible traits. All collectibles are living on the Ethereum blockchain. Your Saudi will grant you Sheikh status in our Kingdom and will grant you access to all our upcoming venues."
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

  const [highlight, setHighlight] = useState("Alhamdulillah");
  
  const changeHighlight = (e: any) => {
    e.preventDefault(); 
    setHighlight(e.target.value)
  }

  return (
    <div>
      <div className="flex flex-row justify-between px-20 pt-28 text-white">
        <div className="w-1/3">
          <div className="pt-10 font-dmsans text-lg font-bold">
            <input
              type="text"
              id="sectionthree-highlight"
              value={highlight}
              onChange={changeHighlight}
              onBlur={changeHighlight}
              className="w-full border-0 bg-transparent text-lg"
            />
          </div>
          <div className="">
            <textarea
              rows={3}
              id="sectionthree-heading"
              className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 pb-8 font-serif text-9xl italic "
              value={heading}
              onChange={changeHeading}
              onKeyDown={handleKeyDown}
              onBlur={changeHeading}
            />
          </div>
          <div className=" w-4/5">
            <textarea
              rows={10}
              id="sectionthree-paragraph"
              className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent font-dmsans text-base leading-relaxed"
              value={paragraphText}
              onChange={changeParagraphText}
              onKeyDown={handleParagraphKeyDown}
              onBlur={changeParagraphText}
            /> 
          </div>
          <div className="flex justify-start pt-3 pb-5">
            <ButtonLink
              href=""
              className="rounded-xl border-0 bg-[#006C35] py-6 px-20 hover:bg-black"
            >
              Say Alhamdulillah
            </ButtonLink>
          </div>
        </div>
        <div className="flex w-7/12 flex-row justify-evenly">
          <div className="mt-28">
            <div className="m-4 bg-[#7f9dc3]">
              <img src={images.elements[3].src} alt={images.elements[3].alt} />
            </div>
            <div className="m-4 bg-[#7f9dc3]">
              <img src={images.elements[4].src} alt={images.elements[4].alt} />
            </div>
            <div className="m-4 bg-[#7f9dc3]">
              <img src={images.elements[5].src} alt={images.elements[5].alt} />
            </div>
          </div>
          <div>
            <div className="m-4 bg-[#7f9dc3]">
              <img src={images.elements[2].src} alt={images.elements[2].alt} />
            </div>
            <div className="m-4 bg-[#7f9dc3]">
              <img src={images.elements[1].src} alt={images.elements[1].alt} />
            </div>
            <div className="m-4 bg-[#7f9dc3]">
              <img src={images.elements[7].src} alt={images.elements[7].alt} />
            </div>
            <div className="flex h-24 items-center justify-center font-serif text-3xl font-bold italic">
              <span>&apos;&apos;Max Bidding&apos;&apos;</span>
            </div>
          </div>
          <div className="mt-28">
            <div className="m-4 bg-[#7f9dc3]">
              <img src={images.elements[6].src} alt={images.elements[6].alt} />
            </div>
            <div className="m-4 bg-[#7f9dc3]">
              <img src={images.elements[0].src} alt={images.elements[0].alt} />
            </div>
            <div className="m-4 bg-[#7f9dc3]">
              <img src={images.elements[8].src} alt={images.elements[8].alt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
