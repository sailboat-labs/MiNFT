import Demo from "features/homepage/components/Demo";
import { useRouter } from "next/router";

import Vector1SVG from "~/svg/homepage/vector_1.svg";

export default function Banner() {
  const router = useRouter();

  return (
    <div>
      <div className="relative font-montserrat text-black">
        <div className="relative z-0 mx-auto flex w-4/5 justify-end md:w-full lg:w-full ">
          <Vector1SVG className="absolute z-0 -mt-10 h-[40rem] w-[40rem]" />
        </div>
        <div className="z-30 m-auto w-4/5 pt-40 lg:w-3/5 lg:pt-44">
          <h1 className="relative text-8xl font-bold">Magic Mynt.</h1>
          <p className="relative border-b border-black py-10 text-2xl font-medium">
            No-code tool for creating, launching and managing your NFT
            collection
          </p>
          <div className="flex gap-5">
            <div
              className="relative mt-12 w-fit rounded-xl border border-black bg-transparent px-10 py-4 font-bold text-black transition-all hover:scale-105 hover:cursor-pointer"
              onClick={() => {
                process.env.NEXT_PUBLIC_ENVIRONMENT == "development"
                  ? router.push("/dashboard")
                  : window.open("https://r3c9oapreew.typeform.com/to/RDOUdJXk");
              }}
            >
              {process.env.NEXT_PUBLIC_ENVIRONMENT == "development"
                ? "Start Now"
                : "Join Waitlist"}
            </div>

            <Demo />

            {/* {process.env.NEXT_PUBLIC_ENVIRONMENT == "production" && (
              <div
                className="relative z-30 mt-12 w-fit rounded-xl border border-black bg-transparent px-10 py-4 font-bold text-black transition-all hover:scale-105 hover:cursor-pointer"
                onClick={() => {
                  window.open("https://staging.magicmynt.com/dashboard");
                }}
              >
                Try Demo
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
