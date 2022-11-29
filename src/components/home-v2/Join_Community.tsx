import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";

import ContactLink from "../buttons/ContactLink";

export default function Join_Community() {
  const router = useRouter();

  return (
    <div className="w-full">
      <div>
        <div className="z-30 m-auto w-4/5 pt-12 lg:w-3/5 2xl:w-3/5 2xl:py-20">
          <div className="z-30 m-auto mb-12 mt-5 flex flex-col justify-between font-montserrat xl:flex-row xl:items-center">
            <div className="z-30 text-[#1F1A17]">
              <div className="z-30 font-montserrat text-2xl font-bold 2xl:text-4xl">
                From generation to mint
              </div>
              <div className="z-30 mt-3 mb-5 font-montserrat text-xl font-medium 2xl:text-3xl">
                Let us guide you
              </div>
            </div>
            <div className="flex flex-row justify-between sm:justify-start">
              <ContactLink className="z-30 flex h-14 w-32 cursor-pointer items-center justify-center rounded-xl border border-[#1F1A17] bg-transparent font-montserrat text-base font-bold text-[#1F1A17] hover:bg-[#1c1815] hover:text-white sm:mr-10 lg:w-56 2xl:w-72 2xl:border-2 2xl:py-10 2xl:text-2xl" />
              <div
                className="z-30 flex h-14 w-32 cursor-pointer items-center justify-center rounded-xl font-montserrat border border-[#1F1A17] bg-transparent text-base font-bold text-[#1F1A17] hover:bg-[#1c1815] hover:text-white lg:w-56 2xl:w-72 2xl:border-2 2xl:py-10 2xl:text-2xl"
                onClick={() => {
                  if (process.env.NEXT_PUBLIC_ENVIRONMENT == "development") {
                    if (isMobile) {
                      alert("This software does not work on a mobile device");
                    } else {
                      router.push("/dashboard");
                    }
                  } else {
                    window.open("https://r3c9oapreew.typeform.com/to/RDOUdJXk");
                  }
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
