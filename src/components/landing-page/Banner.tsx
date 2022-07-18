/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import images from "./Images";
import ButtonLink from "../links/ButtonLink";

export default function Banner() {
  const [heading, setHeading] = useState(
    "We're here to Puja the Crypto Winter away and save the day….you better mint Bloody Bastards"
  );

  const changeHeading = (e: any) => {
    e.preventDefault();
    const value = e.target.value;
    setHeading(value);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      changeHeading(e);
    }
  };

  return (
    <div>
      <div className="text-white">
        <div className="mx-auto mt-28 w-2/3 text-center sm:w-4/5 sm:mt-32 lg:mt-48 lg:w-3/4">
          <textarea
            id="banner-heading"
            className="w-full h-[37rem] resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 text-center font-serif text-5xl italic leading-tight text-black hover:resize focus:resize sm:h-auto md:h-[28rem] md:text-7xl lg:h-[18rem] lg:text-7xl"
            value={heading}
            onChange={changeHeading}
            onKeyDown={handleKeyDown}
            onBlur={changeHeading}
          />
        </div>
        <div className="mt-8 mb-8 flex justify-center">
          <ButtonLink
            href=""
            className="rounded-xl border-0 bg-black py-6 px-16 uppercase hover:bg-black"
          >
            MINT NOW
          </ButtonLink>
        </div>
        <div className="box-border flex w-full flex-row justify-center lg:hidden ">
          <img
            src={images.elements[0].src}
            alt={images.elements[0].alt}
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src={images.elements[1].src}
            alt={images.elements[1].alt}
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src={images.elements[2].src}
            alt={images.elements[2].alt}
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src={images.elements[3].src}
            alt={images.elements[3].alt}
            className="hidden object-cover md:inline-block md:h-36 md:w-36"
          />
          <img
            src={images.elements[4].src}
            alt={images.elements[4].alt}
            className="hidden object-cover md:inline-block md:h-36 md:w-36"
          />
        </div>
        <div className="hidden flex-row justify-center overflow-hidden lg:flex">
          {images.elements.map((image, index) => (
            <div key={index} className="box-border ">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover lg:h-52 lg:w-52"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
