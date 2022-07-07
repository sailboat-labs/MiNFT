/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import ButtonLink from "@/components/links/ButtonLink";

export default function Banner() {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <div className="flex h-[40rem] flex-col items-center justify-center font-dmsans  text-white xl:h-[70vh]">
        <div className="absolute top-12 hidden w-3/5 justify-between lg:flex">
          <img
            className="ml-5 h-[6vw] w-[10vw] rounded-b-lg"
            alt=""
            src="/images/left_top_top.png"
          />
          <img
            className="mr-5 h-[6vw] w-[10vw] rounded-b-lg"
            alt=""
            src="/images/right_top_top.png"
          />
        </div>
        <div className="absolute left-0 top-20 hidden h-[40rem] lg:flex ">
          <img
            className="left-[5rem] z-[1] h-[12vw] w-[6vw] translate-y-[9rem] rounded-r-lg bg-green-400"
            alt=""
            src="/images/left_left.png"
          />
          <div className="-ml-10">
            <img
              className="h-[15vw] w-[15vw] rounded-lg "
              alt=""
              src="/images/left_top.png"
            />

            <img
              className="relative z-[2] mt-10 h-[12vw] w-[12vw] rounded-lg  "
              alt=""
              src="/images/left_bottom.png"
            />
          </div>
          <img
            className="mt-72 h-[10vw] w-[10vw] rounded-lg "
            alt=""
            src="/images/left_bottom_right.png"
          />
        </div>

        <div className="absolute right-0 top-20 hidden h-[40rem] lg:flex ">
          <img
            className="mt-72 h-[10vw] w-[10vw] rounded-lg "
            alt=""
            src="/images/right_bottom_left.png"
          />
          <div className="-mr-20 flex flex-col items-end">
            <img
              className="h-[15vw] w-[15vw] rounded-lg"
              alt=""
              src="/images/right_top.png"
            />

            <img
              className=" relative z-[2] mt-10 h-[12vw] w-[12vw] rounded-lg"
              alt=""
              src="/images/right_bottom.png"
            />
          </div>
          <img
            className="-left-[5rem] z-[1] h-[18vw] w-[8vw] translate-y-[9rem] rounded-l-lg "
            alt=""
            src="/images/right_right.png"
          />
        </div>
        {/* <div className=" h-72 w-96 -translate-y-32 "></div> */}
        <div className=" text-center text-4xl">
          Become an <strong>NFT creator</strong> without code
        </div>
        <div className="mt-3 text-2xl">
          You do the art, we&apos;ll do the rest
        </div>
        <div className="mt-5">
          <ButtonLink
            href="/dashboard"
            onMouseEnter={() => {
              setHovered(true);
            }}
            onMouseLeave={() => {
              setHovered(false);
            }}
            className={`relative z-[2] mt-16 cursor-pointer rounded-xl border bg-white px-10 py-4 text-xl font-bold text-indigo-800 shadow-3xl transition-all hover:scale-110 hover:bg-white hover:text-indigo-800 active:bg-white active:text-indigo-800 ${
              hovered ? "bg-opacity-90" : "bg-opacity-100"
            }`}
          >
            Start Creating
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
