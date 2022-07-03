import { useState } from "react";

export default function Features() {
  const [selectedId, setSelectedId] = useState(null);

  const features: { title: string; description: string; icon?: any }[] = [
    {
      title: "Easy To Use",
      description:
        "No coding required, at all. Create your layers, import your assets, click “Generate” and you are done!",
      icon: (
        <svg
          width="60"
          height="47"
          viewBox="0 0 60 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M53.3334 6.25H30L24.1667 0.5H6.66671C3.42921 0.5 0.862541 3.05875 0.862541 6.25L0.833374 40.75C0.833374 43.9413 3.42921 46.5 6.66671 46.5H53.3334C56.5709 46.5 59.1667 43.9413 59.1667 40.75V12C59.1667 8.80875 56.5709 6.25 53.3334 6.25ZM50.4167 29.25H41.6667V37.875H35.8334V29.25H27.0834V23.5H35.8334V14.875H41.6667V23.5H50.4167V29.25Z"
            fill="#30489C"
          />
        </svg>
      ),
    },
    {
      title: "Deploy Contract Easily",
      description:
        "Use our templates to create your very own smart contract without code.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Export To Images or GIFs",
      description:
        "You can import images, gifs and videos and we will generate your collection in the format your decide.",
      icon: (
        <svg
          width="59"
          height="59"
          viewBox="0 0 59 59"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M58.375 51.9583V7.04167C58.375 3.5125 55.4875 0.625 51.9583 0.625H7.04167C3.5125 0.625 0.625 3.5125 0.625 7.04167V51.9583C0.625 55.4875 3.5125 58.375 7.04167 58.375H51.9583C55.4875 58.375 58.375 55.4875 58.375 51.9583ZM18.2708 34.3125L26.2917 43.9696L37.5208 29.5L51.9583 48.75H7.04167L18.2708 34.3125Z"
            fill="#30489C"
          />
        </svg>
      ),
    },
    {
      title: "Layer Rarity",
      description:
        "In a large collection, you may not want to apply a layer on every NFT. ",
      icon: (
        <svg
          width="45"
          height="46"
          viewBox="0 0 45 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.6841 2.24912C21.3176 0.482702 23.8158 0.482699 24.4493 2.24912L29.1836 15.4495C29.3806 15.9988 29.8076 16.4346 30.3528 16.6427L43.3204 21.5935C45.0359 22.2485 45.0359 24.6755 43.3204 25.3304L30.3528 30.2812C29.8076 30.4893 29.3806 30.9252 29.1836 31.4745L24.4493 44.6748C23.8158 46.4412 21.3176 46.4412 20.6841 44.6748L15.9498 31.4745C15.7528 30.9252 15.3258 30.4893 14.7806 30.2812L1.81302 25.3304C0.0974724 24.6755 0.09747 22.2485 1.81301 21.5935L14.7806 16.6427C15.3258 16.4346 15.7528 15.9988 15.9498 15.4495L20.6841 2.24912Z"
            fill="#30489C"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="container mx-auto flex justify-center py-20 font-dmsans">
      <div className="grid w-fit grid-cols-1 gap-10 px-10 md:grid-cols-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-5">
            <span className="w-5 text-5xl text-white">{index + 1}</span>
            <div className="flex max-w-lg gap-5 rounded-lg border bg-gray-100 px-10 py-5 pr-20">
              <div className="flex items-center ">
              {feature.icon}
              </div>
              <div>
                <div className="text-xl font-semibold text-indigo-600">
                  {feature.title}
                </div>
                <div className="mt-2">{feature.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
