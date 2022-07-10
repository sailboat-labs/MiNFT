/* eslint-disable @next/next/no-img-element */
import Marquee from "react-fast-marquee";

export default function ImageMarquee() {
  return (
    <div className="pb-20">
      <div className="px-20 font-dmsans text-6xl font-extrabold text-[#675C4C]">
        Mix your traits
      </div>

      <div className="flex w-full items-center justify-end gap-3 px-20 pb-5 font-dmsans text-lg font-extrabold text-[#675C4C]">
        Nozomix Extreme
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
          />
        </svg>
      </div>

      <Marquee className="pb-5" gradientColor={[21, 21, 21]}>
        <div className="flex w-fit gap-5 pl-5">
          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              className="group relative block h-[10vw] w-[10vw] bg-black"
            >
              <img
                className="absolute inset-0  h-full w-full border-2  object-cover opacity-75 transition-opacity  group-hover:opacity-50"
                src={`/images/trait_remix/${index}.png`}
                alt=""
              />
              {/* <img
                key={index}
                className="h-[10vw] w-[10vw] border-2 object-cover "
                alt=""
                src={`/images/trait_remix/${index}.png`}
              /> */}

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
      <Marquee direction="right" className="pb-5" gradientColor={[21, 21, 21]}>
        <div className="flex w-fit gap-5 pl-5">
          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              className="group relative block h-[10vw] w-[10vw] bg-black"
            >
              <img
                className="absolute inset-0  h-full w-full border-2  object-cover opacity-75 transition-opacity  group-hover:opacity-50"
                src={`/images/trait_remix/${index + 15}.png`}
                alt=""
              />
              {/* <img
                key={index}
                className="h-[10vw] w-[10vw] border-2 object-cover "
                alt=""
                src={`/images/trait_remix/${index}.png`}
              /> */}

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
    </div>
  );
}
