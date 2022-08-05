import { useRouter } from "next/router";

import Featured from "./Featured";

export default function Banner() {
  const router = useRouter();

  return (
    <div className="mx-auto flex w-full flex-col items-center pb-16 pt-40 sm:pt-28 lg:w-3/4 lg:flex-row xl:w-3/5 2xl:justify-center 2xl:pt-60 2xl:pb-28">
      <div className="mx-auto w-4/5">
        <h1 className=" text-6xl font-bold sm:text-6xl 2xl:text-9xl ">
          Join <br /> Waitlist
        </h1>
        <p className="w-full sm:w-3/5 pt-7 pb-16 font-montserrat text-xl font-medium text-[#222020] 2xl:pt-12 2xl:text-4xl">
          Buy and sell NFTs from the world&apos;s top artists
        </p>
        <div
          className="w-fit rounded-xl bg-[#222020] px-10 py-5 text-xl sm:px-7 sm:py-4 font-bold text-white transition-all hover:scale-105 hover:cursor-pointer md:mr-10 md:px-10 lg:mr-6 2xl:px-20 2xl:py-7 2xl:text-3xl"
          onClick={() => {
            process.env.NEXT_PUBLIC_ENVIRONMENT == "development"
              ? router.push("/dashboard")
              : window.open("https://r3c9oapreew.typeform.com/to/RDOUdJXk");
          }}
        >
          Start collecting
        </div>
      </div>
      <div className="pt-20 lg:pt-0">
        <Featured username="lorrainemakuyana" createdOn="Aug 31, 2022, 6 pm" />
      </div>
    </div>
  );
}
