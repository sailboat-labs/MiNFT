/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import ButtonLink from "@/components/links/ButtonLink";

import slides from "./Carousel_Items";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const next = () => {
    currentSlide == slides.length ? setCurrentSlide(1) : setCurrentSlide(currentSlide + 1);
  };

  const previous = () => {
    currentSlide == 1 ? setCurrentSlide(slides.length) : setCurrentSlide(currentSlide - 1);
  };

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (!isPaused) {
        next()
      }
    }, 3000);
  
    return () => clearInterval(intervalID)
  });

  return (
    <div>
      <div className="mb-8 h-[55vh]">
        <div className="flex items-center justify-end gap-5 p-5">
          <ButtonLink href="">Contact Us</ButtonLink>
        </div>
        <div className="flex items-center justify-center text-white">
          <div className="relative flex h-80 w-3/5 overflow-hidden ">
            <button
              className="absolute inset-y-1/2 left-0 cursor-default text-3xl text-white"
              onClick={previous}
            >
              <span
                className="carousel-control-prev-icon inline-block bg-no-repeat"
                aria-hidden="true"
              ></span>
            </button>

            {slides.map((slide, index) => (
              <div
                key={index}
                className={
                  index + 1 == currentSlide
                    ? "mx-auto block h-auto w-4/5 font-montserrat"
                    : "hidden"
                }
                onMouseEnter={() => {
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  setIsPaused(false);
                }}
              >
                <h1 className="py-10 text-7xl">{slide.heading}</h1>
                <p className="text-xl ">{slide.description}</p>
                <div className="mt-4 md:mt-8">
                  <div className="group relative inline-block cursor-pointer focus:outline-none">
                    <span className="relative z-10 block rounded border px-12 py-3 font-dmsans  text-sm font-extrabold uppercase  text-white transition group-hover:scale-105">
                      {slide.action}
                    </span>
                    <span className="absolute inset-0 -rotate-3 scale-105 rounded bg-[#675C4C] transition group-hover:rotate-0"></span>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-0 flex w-full justify-center">
              {slides.map((slide, index) => (
                <div
                  className={
                    index + 1 == currentSlide
                      ? "mx-2 mb-2 h-2 w-2 cursor-pointer rounded-full bg-white"
                      : "mx-2 mb-2 h-2 w-2 cursor-pointer rounded-full bg-gray-500"
                  }
                  key={index}
                  onClick={() => setCurrentSlide(index + 1)}
                ></div>
              ))}
            </div>

            <button
              className="absolute inset-y-1/2 right-0 cursor-pointer text-3xl text-white"
              onClick={next}
            >
              <span
                className="carousel-control-next-icon inline-block bg-no-repeat"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
