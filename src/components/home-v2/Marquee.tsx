/* eslint-disable @next/next/no-img-element */
import React from "react";
import Marquee from "react-fast-marquee";

import LiveAuctions from "./Live_Auctions";

export default function MarqueeSection() {
  return (
    <div className=" lg:h-[55rem] xl:h-[47rem] 2xl:h-[75rem]">
      <div className="sm:float-left sm:w-3/5">
        <div className="xl:mx-auto xl:w-1/2 pt-20 pb-10 text-center font-montserrat text-4xl font-bold text-black lg:w-3/5 2xl:text-6xl">
          Mix your traits
        </div>
        <Marquee
          className="pb-5"
          gradient={false}
          gradientColor={[255, 255, 255]}
        >
          <div className="flex w-fit gap-5 pl-5">
            {[...Array(15)].map((_, index) => (
              <div
                key={index}
                className="group relative block h-[20vw] w-[20vw] bg-black lg:h-[18vh] lg:w-[18vh] xl:h-[15vw] xl:w-[15vw] "
              >
                <img
                  className="absolute inset-0  h-full w-full border-2  object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  src={`/images/trait_remix/${index}.png`}
                  alt=""
                />

                <div className="relative hidden p-6 xl:block">
                  <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
                    Nozomix
                  </p>

                  <div className="">
                    <div className="translate-y-8 transform opacity-0 transition-all  group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-lg font-semibold text-white">
                        Nozomix #{index}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
        <Marquee
          direction="right"
          className="pb-5"
          gradient={false}
          gradientColor={[255, 255, 255]}
        >
          <div className="flex w-fit gap-5 pl-5">
            {[...Array(15)].map((_, index) => (
              <div
                key={index}
                className="group relative block h-[16vw] w-[16vw] bg-black lg:h-[14vh] lg:w-[14vh] xl:h-[11vw] xl:w-[11vw]"
              >
                <img
                  className="absolute inset-0  h-full w-full border-2  object-cover opacity-75 transition-opacity  group-hover:opacity-50"
                  src={`/images/trait_remix/${index + 15}.png`}
                  alt=""
                />

                <div className="relative hidden p-6 xl:block">
                  <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
                    Nozomix
                  </p>

                  <div className="">
                    <div className="translate-y-8 transform opacity-0 transition-all  group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-lg font-semibold text-white">
                        Nozomix #{index + 15}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
        <div className="mx-auto w-3/5 flex justify-end mt-10 2xl:w-1/4">
          <div className="w-96">
            <p className="text-lg font-bold pb-3 2xl:text-3xl">The future of art collecting</p>
            <p className="font-montserrat 2xl:text-2xl">
              Browse and build your collection of the world&apos;s most
              cutting-edge digital art
            </p>
          </div>
        </div>
      </div>
      <div className="h-full">
        <LiveAuctions />
      </div>
    </div>
  );
}
