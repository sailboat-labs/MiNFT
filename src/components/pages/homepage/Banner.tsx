/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";

import ButtonLink from "@/components/links/ButtonLink";

export default function Banner() {
  const router = useRouter();

  return (
    <>
      <div className="flex h-[60vh] flex-col font-dmsans  text-white">
        <div className="flex items-center justify-end  gap-5 p-5">
          <ButtonLink href="">Contact Us</ButtonLink>
        </div>
        <div className=" bottom-0 px-20 py-36">
          <div className=" font-dmsans text-9xl font-extrabold text-[#675C4C]">
            MINFT.
          </div>
          <div className="mt-3 font-dmsans text-2xl uppercase">
            No code tool for creating, launching,
          </div>
          <div className="mt-3 font-dmsans text-2xl uppercase">
            and managing your NFT collection
          </div>
          <div className="mt-5">
            <div className="mt-4 md:mt-8">
              <div
                onClick={() => {
                  if (process.env.NEXT_PUBLIC_ENVIRONMENT == "development") {
                    router.push("/dashboard");
                  } else {
                    //Link to typeform
                  }
                }}
                className="group relative inline-block cursor-pointer focus:outline-none"
              >
                <span className="relative z-10 block rounded border px-12 py-3 font-dmsans  text-sm font-extrabold uppercase  text-white transition group-hover:scale-105">
                  {process.env.NEXT_PUBLIC_ENVIRONMENT == "development"
                    ? "Start Now"
                    : "Join Waitlist"}
                </span>

                <span className="absolute inset-0 -rotate-3 scale-105 rounded bg-[#675C4C] transition group-hover:rotate-0"></span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-flow-row grid-cols-12 gap-5 px-20">
          {[...Array(100)].map((item, index) => (
            <div key={index} className="h-5 w-5 rounded-full bg-gray-200"></div>
          ))}
        </div> */}
      </div>
    </>
  );
}
