import { useRouter } from "next/router";

import ContactLink from "../buttons/ContactLink";

import VectorSVG3 from "~/svg/homepage/vector_3.svg";

export default function Join_Community() {
  const router = useRouter();

  return (
    <div className="w-full">
      {/* <div className={contact ? "hidden" : "block"}> */}
      <div>
        <div className="relative z-0 flex justify-end">
          <VectorSVG3 className="absolute z-0 -mt-96 h-[40rem] w-[40rem]" />
        </div>
        <div className="z-30 m-auto pt-10 pb-2 lg:w-4/5">
          <div className="z-30 m-auto mb-12 mt-5 flex w-4/5 flex-col justify-between font-montserrat md:flex-row lg:w-3/4 lg:items-center">
            <div className="z-30 text-black">
              <div className="z-30 text-2xl font-bold ">
                From generation to mint
              </div>
              <div className="z-30 mt-3 mb-5 text-xl font-medium">
                Let us guide you
              </div>
            </div>
            <div className="flex flex-row justify-between sm:justify-start">
              <ContactLink className="z-30 flex h-14 w-32 cursor-pointer items-center justify-center rounded-xl border border-black bg-transparent text-base font-bold text-black hover:bg-indigo-300 hover:border-indigo-300 hover:text-white sm:mr-10 lg:w-56" />
              <div
                className="z-30 flex h-14 w-32 cursor-pointer items-center justify-center rounded-xl border border-black bg-transparent text-base font-bold text-[#1F1A17] hover:bg-[#1c1815] hover:text-white lg:w-56"
                onClick={() => {
                  process.env.NEXT_PUBLIC_ENVIRONMENT == "development"
                    ? router.push("/dashboard")
                    : window.open(
                        "https://r3c9oapreew.typeform.com/to/RDOUdJXk"
                      );
                }}
              >
                Join Waitlist
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
