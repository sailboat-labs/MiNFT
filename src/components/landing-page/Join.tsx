/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import ButtonLink from "../links/ButtonLink";

import icons from "./IconLinks";

export default function Join() {
  const [heading, setHeading] = useState("Join the Royal Kingdom");

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const [buttonOne, setButtonOne] = useState("Discord");

  const changeButtonOne = (e: any) => {
    e.preventDefault();
    setButtonOne(e.target.value);
  };

  const [buttonTwo, setButtonTwo] = useState("Twitter");

  const changeButtonTwo = (e: any) => {
    e.preventDefault();
    setButtonTwo(e.target.value);
  };

  return (
    <div>
      <div className="mx-10 rounded-2xl bg-[#006C35] py-32 text-white">
        <div className="mx-auto flex w-4/5 flex-col items-center justify-center">
          <div className="flex w-full justify-center lg:w-4/5">
            <textarea
              id="join-heading"
              value={heading}
              onChange={changeHeading}
              onBlur={changeHeading}
              className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent text-center font-serif text-3xl font-bold italic md:text-6xl lg:text-8xl"
            />
          </div>
          <div className="mt-8 flex h-44 w-full flex-col justify-between sm:flex-row md:h-auto md:justify-evenly lg:w-1/2">
            <ButtonLink
              href=""
              className="rounded-2xl border-0 bg-black px-10 py-3 uppercase hover:bg-[#161616]"
            >
              <span className="w-40 border-0 bg-transparent text-center text-2xl font-extrabold uppercase text-white">
                Mint
              </span>
              {/* <input
                type="text"
                id="label1"
                value={buttonOne}
                onChange={changeButtonOne}
                onBlur={changeButtonOne}
                className="w-40 border-0 bg-transparent text-center text-2xl font-extrabold uppercase text-white"
              /> */}
            </ButtonLink>
            {/* <ButtonLink
              href=""
              className="rounded-2xl border-0 bg-black px-10 py-3 hover:bg-[#161616]"
            >
              <input
                type="text"
                id="label1"
                value={buttonTwo}
                onChange={changeButtonTwo}
                onBlur={changeButtonTwo}
                className="w-40 border-0 bg-transparent text-center text-2xl font-extrabold uppercase text-white"
              />
            </ButtonLink> */}
          </div>
        </div>
      </div>
      <div className="mx-10 -mt-14 flex flex-row justify-end md:mx-14 md:-mt-20 lg:mx-20 lg:-mt-20">
        {/* <img
          src={images.sandImgSrc}
          alt="Sand.png"
          className="h-32 w-[15rem] md:h-44 md:w-[25rem] lg:h-64 lg:w-[38rem]"
        /> */}
        <img
          src="/images/landing/cricket-bat.png"
          alt=""
          className=""
        />
        <img src="/images/landing/movie-reel.png" alt="" className="w-16" />
        <img src="/images/landing/microphone.png" alt="" className="w-16" />
      </div>
    </div>
  );
}
