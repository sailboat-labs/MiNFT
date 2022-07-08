import React from "react";

import EthereumSVG from "~/svg/homepage/ethereum.svg";
import PolygonSVG from "~/svg/homepage/polygon.svg";
import SolanaSVG from "~/svg/homepage/solana.svg";

export default function Best_Works() {
  return (
    <div className="bg-transparent py-3 text-center font-montserrat sm:py-7">
      <div className="text-indigo-200 text-lg">MiNFT WORKS BEST WITH</div>
      <div className="flex flex-col justify-center sm:h-28 sm:flex-row sm:space-x-24">
        <EthereumSVG className="m-auto h-28 w-40 sm:m-0 sm:h-28" />
        <PolygonSVG className="m-auto h-28 w-40 sm:m-0 sm:h-28" />
        <SolanaSVG className="m-auto h-28 w-40 sm:m-0 sm:h-28" />
      </div>
    </div>
  );
}
