/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import images from "./Images";
import ButtonLink from "../links/ButtonLink";

export default function Banner() {
  const [heading, setHeading] = useState(
    "We're not just buying Bitcoin... the Punks too."
  );

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
    console.log(heading);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      changeHeading(e);
    }
  };

  return (
    <div>
      <div className=" text-white">
        <div className="mx-auto mt-48 w-2/3 text-center">
          <textarea
            id="banner-heading"
            className="h-auto w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 text-center font-serif text-8xl italic leading-tight"
            value={heading}
            onChange={changeHeading}
            onKeyDown={handleKeyDown}
            onBlur={changeHeading}
          />
        </div>
        <div className="mt-2 mb-3 flex justify-center">
          <ButtonLink
            href=""
            className="rounded-xl border-0 bg-black py-6 px-16 uppercase hover:bg-black"
          >
            Sold out
          </ButtonLink>
        </div>
        <div className="flex flex-row overflow-hidden">
          {images.elements.map((image, index) => (
            <div key={index} className='box-border '>
              <img src={image.src} alt={image.alt} className='object-cover h-52 w-52'/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
