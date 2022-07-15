import ButtonLink from "../links/ButtonLink";

import Vector1SVG from "~/svg/homepage/vector_1.svg";

export default function Banner() {
  return (
    <div>
      <div className="relative font-montserrat text-black">
        <div className="relative z-0 mx-auto flex w-4/5 justify-end md:w-full lg:w-full ">
          <Vector1SVG className="absolute z-0 -mt-10 h-[40rem] w-[40rem]" />
        </div>
        <div className="z-30 m-auto mt-44 w-4/5 lg:w-3/5">
          <h1 className="relative z-30 text-8xl font-bold">MiNFT.</h1>
          <p className="relative z-30 border-b border-black py-10 text-2xl font-medium">
            No-code tool for creating, launching and managing your NFT
            collection
          </p>
          <ButtonLink
            href=""
            className="z-30 mt-12 rounded-xl border-black bg-transparent px-10 py-4 font-bold text-black"
          >
            Start creating
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
