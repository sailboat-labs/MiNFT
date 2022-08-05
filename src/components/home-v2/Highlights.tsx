import { useState } from "react";

import LineSVG from "~/svg/homeV2/line.svg";
import NextSVG from "~/svg/homeV2/next.svg";

export default function Highlights() {
  const [active, setActive] = useState<number>(0);

  const nextHighlight = (step = 1) => {
    if (step == 1 && active < notes.length - 2) {
      setActive(active + step);
    }

    if (step === -1 && active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <div className="bg-[#222020] py-5 2xl:py-16">
      <div className="mx-auto text-[#FEFBF5] lg:w-4/5 xl:w-3/5">
        <div className="flex w-full flex-row items-center justify-center">
          <button
            onClick={() => nextHighlight(-1)}
            disabled={active === 0}
            className="disabled:hidden"
          >
            <NextSVG className="ml-5 h-5 w-5 rotate-180 sm:ml-0 2xl:h-12 2xl:w-12" />
          </button>

          <div className="flex flex-row items-center justify-between pt-3 pb-5">
            <div className="block pl-8 pr-8 font-montserrat sm:pr-0">
              <h2 className="pb-3 text-lg 2xl:text-4xl">
                {notes[active].title}
              </h2>
              <p className="text-md 2xl:text-3xl">
                {notes[active].description}
              </p>
            </div>
            <LineSVG className="hidden h-24 sm:inline 2xl:h-32" />
            <div className="hidden pr-5 pl-8 font-montserrat sm:block">
              <h2 className="pb-3 text-lg 2xl:text-4xl">
                {notes[active + 1].title}
              </h2>
              <p className="text-md 2xl:text-3xl">
                {notes[active + 1].description}
              </p>
            </div>
          </div>

          <button
            onClick={() => nextHighlight(1)}
            disabled={active === notes.length - 2}
            // className="group absolute right-0 top-1/2 flex h-[40px] w-[40px]  -translate-y-1/2  transform items-center justify-center rounded-full border border-gray-100 bg-red-500 shadow-lg disabled:cursor-not-allowed"
            className="disabled:hidden"
          >
            <NextSVG className="mr-5 h-5 w-5 sm:mr-0 2xl:h-12 2xl:w-12" />
          </button>
        </div>
      </div>
    </div>
  );
}

const notes: { title: string; description: string }[] = [
  {
    title: "The future of art collecting",
    description:
      "Browse and build your collection of the world's most cutting-edge digital art",
  },
  {
    title: "The future of art collecting",
    description:
      "Browse and build your collection of the world's most cutting-edge digital art",
  },
  {
    title: "The future of art collecting",
    description:
      "Browse and build your collection of the world's most cutting-edge digital art",
  },
  {
    title: "The future of art collecting",
    description:
      "Browse and build your collection of the world's most cutting-edge digital art",
  },
  {
    title: "The future of art collecting",
    description:
      "Browse and build your collection of the world's most cutting-edge digital art",
  },
  {
    title: "The future of art collecting",
    description:
      "Browse and build your collection of the world's most cutting-edge digital art",
  },
];
