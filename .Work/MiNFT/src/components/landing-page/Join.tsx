/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import BatSVG from "~/svg/landing/cricket-bat.svg";
import MicrophoneSVG from "~/svg/landing/microphone.svg";
import MovieSVG from "~/svg/landing/movie.svg";

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
      <div className="mx-10 rounded-2xl bg-[#006C35] py-32 text-white sm:py-20 lg:mx-40 lg:py-32">
        <div className="mx-auto flex w-4/5 flex-col items-center justify-center">
          <div className="flex w-full justify-center lg:w-4/5">
            <textarea
              disabled
              id="join-heading"
              value={heading}
              onChange={changeHeading}
              onBlur={changeHeading}
              className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent text-center font-serif text-3xl italic md:text-6xl lg:text-8xl"
            />
          </div>
          <div className="mt-8 flex h-44 w-full flex-col justify-between sm:flex-row md:h-auto md:justify-evenly lg:w-1/2"></div>
        </div>
      </div>
      <div className="mx-10 -mt-24 flex flex-row justify-center md:mx-14 md:-mt-20 md:justify-end lg:mx-40 lg:-mt-24">
        {/* <img
          src={images.sandImgSrc}
          alt="Sand.png"
          className="h-32 w-[15rem] md:h-44 md:w-[25rem] lg:h-64 lg:w-[38rem]"
        /> */}
        {/* <img src="/images/landing/cricket-bat.png" alt="" className="" />
        <img src="/images/landing/movie-reel.png" alt="" className="w-16" />
        <img src="/images/landing/microphone.png" alt="" className="w-16" /> */}
        <BatSVG className="h-20 w-20" />
        <MovieSVG className="h-20 w-20" />
        <MicrophoneSVG className="h-20 w-20" />
      </div>
    </div>
  );
}
