/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import images from "./Images";
import ButtonLink from "../links/ButtonLink";

export default function Banner() {
  const [heading, setHeading] = useState(
    "We're here to puja the Crypto Winter away. You better mint Bloody Bastards"
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

//   style attribute {
//     font-family: wfont_531ace_58938f917a1b4e66a2181c66dc63faa1,wf_58938f917a1b4e66a2181c66d,orig_century_schoolbook_std;
// }


  return (
    <div>
      <div className="text-white">
        <div className="mx-auto mt-28 w-2/3 text-center sm:mt-32 sm:w-4/5 lg:mt-36 lg:w-3/4">
          <textarea
            disabled
            id="banner-heading"
            className="h-[26rem] w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 text-center font-heading text-5xl italic leading-tight text-white hover:resize focus:resize sm:h-auto md:h-[24rem] md:text-7xl lg:h-[18rem] lg:text-8xl"
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
            src="/images/landing/indiansnfts/1.png"
            alt="Indian Nft Example"
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src="/images/landing/indiansnfts/2.png"
            alt="Indian Nft Example"
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src="/images/landing/indiansnfts/3.png"
            alt="Indian Nft Example"
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src="/images/landing/indiansnfts/4.png"
            alt="Indian Nft Example"
            className="hidden object-cover md:inline-block md:h-36 md:w-36"
          />
          <img
            src="/images/landing/indiansnfts/5.png"
            alt="Indian Nft Example"
            className="hidden object-cover md:inline-block md:h-36 md:w-36"
          />
        </div>
        <div className="hidden flex-row justify-center overflow-hidden lg:flex">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="box-border ">
              <img
                src={`/images/landing/indiansnfts/${index+1}.png`}
                alt="Indian NFT Example"
                className="object-cover lg:h-52 lg:w-52"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
