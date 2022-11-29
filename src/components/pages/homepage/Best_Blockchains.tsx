import React from "react";

import EthereumSVG from "~/svg/homepage/ethereum.svg";
import PolygonSVG from "~/svg/homepage/polygon.svg";
import SolanaSVG from "~/svg/homepage/solana.svg";

export default function Best_Blockchains() {
  return (
    <div className="bg-transparent py-3 text-center font-montserrat sm:py-7">
      <div className="font-dmsans uppercase text-white">
        Magic Mynt WORKS BEST WITH
      </div>
      <div className="grid grid-cols-2  justify-center md:mx-auto md:w-fit md:grid-cols-3 md:gap-24">
        <EthereumSVG className="m-auto h-28 w-40 sm:m-0 sm:h-28" />
        <PolygonSVG className="m-auto h-28 w-40 sm:m-0 sm:h-28" />
        <SolanaSVG className="m-auto h-28 w-40 sm:m-0 sm:h-28" />
      </div>
    </div>
  );
}
