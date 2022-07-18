import { useState } from "react";

import Item_1 from "~/svg/homepage/feature_1.svg";
import Item_2 from "~/svg/homepage/feature_2.svg";
import Item_3 from "~/svg/homepage/feature_3.svg";
import Item_4_1 from "~/svg/homepage/feature_4.1.svg";
import Item_4_2 from "~/svg/homepage/feature_4.2.svg";
import Item_4_3 from "~/svg/homepage/feature_4.3.svg";

export default function Features() {
  const [selectedId, setSelectedId] = useState(null);

  const features: { title: string; description: string; icon?: any }[] = [
    {
      title: "Easy To Use",
      description:
        "No coding required, at all. Create your layers, import your assets, click “Generate” and you are done!",
      icon: <Item_1 className="h-14 w-14" />,
    },
    {
      title: "Deploy Contract Easily",
      description:
        "Use our templates to create your very own smart contract without code. Lorem ipsum dolor sit amet.",
      icon: <Item_2 className="h-14 w-14 " />,
    },
    // {
    //   title: "No Account Needed",
    //   description:
    //     "No account creation needed to start creating your collection. Lorem ipsum dolor sit amet.",
    //   icon: "<Item_2 className="h-14 w-14  />,
    // },
    {
      title: "Export To Images or GIFs",
      description:
        "You can import images, gifs and videos and we will generate your collection in the format you decide.",
      icon: <Item_3 className="h-14 w-14" />,
    },
    {
      title: "Layer Rarity",
      description:
        "In a large collection, you may not want to apply a layer on every NFT. Lorem ipsum dolor sit amet. ",
      icon: (
        <div className="pr-3 lg:pr-3">
          <Item_4_1 className="mx-auto mt-3 h-10 w-10 lg:mt-5" />
          <div className="flex justify-between">
            <Item_4_2 className="h-6 w-6" />
            <Item_4_3 className="h-5 w-5" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto flex justify-center pt-20 pb-16 font-montserrat ">
      <div className="grid w-fit grid-cols-1 gap-10 px-10 md:grid-cols-2">
        {features.map((feature, index) => (
          <div key={index} className="z-30 flex items-center gap-5">
            <span className="z-30 flex h-14 w-16 items-center justify-center rounded-full border-2 border-[#1F1A17] p-1 text-3xl font-bold text-[#1F1A17] lg:h-20 lg:w-20 lg:p-0 ">
              0{index + 1}
            </span>
            <div className="z-30 flex max-w-lg gap-5 rounded-lg border border-black bg-transparent px-5 py-3 lg:px-10 lg:py-5 lg:pr-20">
              <div className="flex items-center ">{feature.icon}</div>
              <div>
                <div className="text-xl font-semibold text-[#1F1A17]">
                  {feature.title}
                </div>
                <div className="relative z-30 mt-2 font-medium text-[#232830]">
                  {feature.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
