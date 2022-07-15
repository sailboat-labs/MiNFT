/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import images from "./Images";
import ButtonLink from "../links/ButtonLink";
export default function SectionTwo() {
  const [heading, setHeading] = useState("Inshallah we will take over");

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
    "The Saudi Delegation welcomes you to the Royal Kingdom! We have consulted the finest Kings, Princes, and Sheikhs among the ranks of Crypto Twitter, and decided to act with haste! Now is the time to move. Our Treasuries are filled to the brim with Oil Royalties, and we must save the Crypto Market. Saddle your camels and gird your loins. If you decide to embark upon this adventure with us as we triumphantly chant, “We are buying here”. ALHAMDULILLAH!!!"
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
    <div>
      <div className="pt-20 md:pt-32 lg:pt-40 text-white">
        <div className="mx-auto w-4/5 text-center md:w-4/5 lg:w-2/3">
          <div className="">
            <textarea
              id="sectiontwo-heading"
              className="h-[18rem] w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 text-center font-serif text-6xl font-bold italic leading-tight md:h-80 md:text-8xl lg:h-auto lg:text-9xl"
              value={heading}
              onChange={changeHeading}
              onKeyDown={handleKeyDown}
              onBlur={changeHeading}
            />
            <img src={images.scimitar} alt="Scimitar" className="m-auto" />
          </div>
          <div>
            <textarea
              id="sectiontwo-paragraph"
              className="md:h-96 lg:h-[15rem] h-[30rem] w-full lg:w-2/3 resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-10 text-center font-dmsans text-xl lg:text-base leading-relaxed"
              value={aboutText}
              onChange={changeAboutText}
              onKeyDown={handleKeyDownOnAbout}
              onBlur={changeAboutText}
            />
          </div>
          <div className="pt-10 flex justify-center md:pt-3 pb-5">
            <ButtonLink
              href=""
              className="rounded-xl border-0 bg-[#006C35] py-6 px-20 hover:bg-black text-xl"
            >
              Say Inshallah
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
