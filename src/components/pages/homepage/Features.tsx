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
        "Use our templates to create your very own smart contract without code.",
      icon: <Item_2 className="h-16 w-16 md:h-24 md:w-24" />,
    },
    {
      title: "Export To Images or GIFs",
      description:
        "You can import images, gifs and videos and we will generate your collection in the format you decide.",
      icon: <Item_3 className="h-14 w-14" />,
    },
    {
      title: "Layer Rarity",
      description:
        "In a large collection, you may not want to apply a layer on every NFT. ",
      icon: (
        <div className="m-auto pr-3 lg:pr-3">
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
    <div className="container mx-auto flex justify-center py-20 font-dmsans">
      <div className="grid w-fit grid-cols-1 gap-10 px-10 md:grid-cols-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-5">
            <span className="w-5 text-5xl text-white dark:text-gray-200">
              {index + 1}
            </span>
            <div className="flex max-w-lg gap-5 rounded-lg border bg-gray-100 px-5 py-3 lg:px-10 lg:py-5 lg:pr-20">
              <div className="flex items-center ">{feature.icon}</div>
              <div>
                <div className="text-xl font-semibold text-indigo-800">
                  {feature.title}
                </div>
                <div className="mt-2 ">{feature.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
