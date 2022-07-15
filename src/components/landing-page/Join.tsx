/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import images from "./Images";
import ButtonLink from "../links/ButtonLink";
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
          <div className="flex w-4/5 justify-center">
            <textarea
              id="join-heading"
              value={heading}
              onChange={changeHeading}
              onBlur={changeHeading}
              className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent text-center font-serif text-8xl font-bold italic"
            />
          </div>
          <div className="mt-8 flex w-1/2 justify-evenly">
            <ButtonLink
              href=""
              className="rounded-2xl border-0 bg-black px-10 py-3"
            >
              <input
                type="text"
                id="label1"
                value={buttonOne}
                onChange={changeButtonOne}
                onBlur={changeButtonOne}
                className="w-40 border-0 bg-transparent text-center text-2xl font-extrabold uppercase text-white"
              />
            </ButtonLink>
            <ButtonLink
              href=""
              className="rounded-2xl border-0 bg-black px-10 py-3"
            >
              <input
                type="text"
                id="label1"
                value={buttonTwo}
                onChange={changeButtonTwo}
                onBlur={changeButtonTwo}
                className="w-40 border-0 bg-transparent text-center text-2xl font-extrabold uppercase text-white"
              />
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="-mt-36 flex justify-end mx-20">
        <img
          src={images.sandImgSrc}
          alt="Sand.png"
          className="h-64 w-[38rem]"
        />
      </div>
    </div>
  );
}
