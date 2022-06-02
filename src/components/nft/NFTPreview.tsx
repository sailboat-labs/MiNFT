import React, { FC } from "react";

import NFTPreviewInterface from "@/interfaces/get-started";

interface AppProps {
  className?: string;
  nft: NFTPreviewInterface;
}

const NFTPreview: FC<AppProps> = ({ className, nft }) => {
  return (
    <div className={` h-[308px] rounded-lg bg-[#E7ECF3] ${className}`}>
      <div className="flex justify-center">
        <div className="inline-block -translate-y-4 transform rounded-md border border-[#E7ECF3] bg-[#F3F7FA] px-6 py-2 font-semibold text-indigo-700">
          Preview
        </div>
        <div>nft</div>
      </div>
    </div>
  );
};

export default NFTPreview;
