/* eslint-disable @next/next/no-img-element */
import Marquee from "react-fast-marquee";

export default function ImageMarquee() {
  return (
    <div className=" mt-8 lg:mt-20">
      <div className="mx-auto w-4/5 pt-14 pb-10  font-montserrat text-3xl font-bold text-black dark:text-white lg:w-3/5">
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
              className="group relative block h-[20vw] w-[20vw] bg-black sm:h-[15vw] sm:w-[15vw]"
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
              className="group relative block h-[16vw] w-[16vw] bg-black sm:h-[11vw] sm:w-[11vw]"
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
    </div>
  );
}
