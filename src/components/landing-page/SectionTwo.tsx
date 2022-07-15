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
      <div className=" pt-40 text-white">
        <div className="mx-auto w-2/3 text-center">
          <div className="">
            <textarea
              id="sectiontwo-heading"
              className="font-bold h-auto w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 text-center font-serif text-9xl italic leading-tight"
              value={heading}
              onChange={changeHeading}
              onKeyDown={handleKeyDown}
              onBlur={changeHeading}
            />
            <img src={images.scimitar} alt="Scimitar" className="m-auto" />
          </div>
          <div>
            <textarea
              rows={5}
              id="sectiontwo-paragraph"
              className="h-auto resize-x w-2/3 overflow-hidden whitespace-normal border-0 bg-transparent p-10 text-center font-dmsans text-base leading-relaxed"
              value={aboutText}
              onChange={changeAboutText}
              onKeyDown={handleKeyDownOnAbout}
              onBlur={changeAboutText}
            />
          </div>
          <div className="pt-3 pb-5 flex justify-center">
            <ButtonLink
              href=""
              className="rounded-xl border-0 bg-[#006C35] py-6 px-20 hover:bg-black"
            >
              Say Inshallah
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
