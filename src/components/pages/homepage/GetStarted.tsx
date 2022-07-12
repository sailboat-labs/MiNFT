/* eslint-disable @next/next/no-img-element */
import ButtonLink from "@/components/links/ButtonLink";

export default function GetStarted() {
  return (
    <div className="flex w-full flex-col items-center justify-center pb-36">
      {/* <img
        className=" h-[20vw] w-full opacity-50"
        src="images/hyper-gradient.jpeg"
        alt=""
      /> */}
      <div className="mb-10 h-2 w-screen bg-[#675C4C] opacity-25"></div>
      <div className="relative z-[2] flex flex-col items-center ">
        <div className="w-fit px-20 pb-5 font-dmsans text-4xl font-extrabold text-[#675C4C]">
          Register Interest With MiNFT
        </div>

        <ButtonLink
          href="https://r3c9oapreew.typeform.com/to/RDOUdJXk"
          className="flex w-fit items-center gap-2
        "
        >
          {/* <JoinSVG className='h-6 w-6' /> */}
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Join Waitlist
        </ButtonLink>
      </div>
    </div>
  );
}
