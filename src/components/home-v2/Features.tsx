import { useState } from "react";

import Item_1 from "~/svg/homeV2/feature_1.svg";
import Item_2 from "~/svg/homeV2/feature_2.svg";
import Item_3 from "~/svg/homeV2/feature_3.svg";
import Item_4_1 from "~/svg/homeV2/feature_4.1.svg";
import Item_4_2 from "~/svg/homeV2/feature_4.2.svg";
import Item_4_3 from "~/svg/homeV2/feature_4.3.svg";

export default function Features() {

  const features: { title: string; description: string; icon?: any }[] = [
    {
      title: "Easy To Use",
      description:
        "No coding required, at all. Create your layers, import your assets, click “Generate” and you are done!",
      icon: <Item_1 className="h-14 w-14 2xl:h-20 2xl:w-20" />,
    },
    {
      title: "Deploy Contract Easily",
      description:
        "Use our templates to create your very own smart contract without code.",
      icon: <Item_2 className="h-14 w-14 2xl:h-20 2xl:w-20 " />,
    },
    {
      title: "Export To Images or GIFs",
      description:
        "You can import images, gifs and videos and we will generate your collection in the format you decide.",
      icon: <Item_3 className="h-14 w-14 2xl:h-20 2xl:w-20" />,
    },
    {
      title: "Layer Rarity",
      description:
        "In a large collection, you may not want to apply a layer on every NFT.",
      icon: (
        <div className="pr-3 lg:pr-3">
          <Item_4_1 className="mx-auto mt-3 h-10 w-10 lg:mt-5 2xl:h-12 2xl:w-12" />
          <div className="flex justify-between">
            <Item_4_2 className="h-6 w-6 2xl:h-8 2xl:w-8" />
            <Item_4_3 className="h-5 w-5 2xl:h-6 2xl:w-6" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#222020] py-16 font-montserrat lg:py-24 2xl:py-28">
      <div className="mx-auto  lg:w-4/5 2xl:w-3/5">
        <div className="grid w-fit grid-cols-1 gap-10 px-5 md:grid-cols-2 lg:px-10 2xl:gap-20 ">
          {features.map((feature, index) => (
            <div key={index} className="z-30 flex items-center gap-5">
              <span className="z-30 flex w-16 items-center justify-center rounded-full border-2 border-white p-1 text-lg font-bold text-white lg:h-20 lg:w-36 lg:p-0 lg:text-3xl 2xl:mr-5">
                0{index + 1}
              </span>
              <div className="z-30 flex max-w-lg flex-col gap-5 rounded-lg border border-white bg-transparent px-5 py-3 sm:flex-row lg:px-10 lg:py-5 lg:pr-20 2xl:max-w-5xl 2xl:py-10">
                <div className="flex items-center ">{feature.icon}</div>
                <div>
                  <div className="text-xl font-semibold text-white 2xl:text-3xl">
                    {feature.title}
                  </div>
                  <div className="relative z-30 mt-2 font-medium text-white 2xl:text-3xl 2xl:mt-5">
                    {feature.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
