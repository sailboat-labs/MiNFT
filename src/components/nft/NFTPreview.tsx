/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";

import { ILayer } from "@/interfaces";

interface AppProps {
  className?: string;
  layers: ILayer[];
}

const NFTPreview: FC<AppProps> = ({ className, layers }) => {
  return (
    <div className={` h-fit rounded-lg bg-[#E7ECF3] ${className}`}>
      <div className="flex justify-center">
        <div className="inline-block -translate-y-4 transform rounded-md border border-[#E7ECF3] bg-[#F3F7FA] px-6 py-2 font-semibold text-indigo-700">
          Preview
        </div>
      </div>
      <div className="">
        {layers.map((layer, index) => (
          <div key={index}>
            <img
              // src={layer.elements[0].path}
              alt=""
              className="absolute h-52 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTPreview;
