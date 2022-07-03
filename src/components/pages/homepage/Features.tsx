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
      title: "Layer Rarity",
      description:
        "In a large collection, you may not want to apply a layer on every NFT. ",
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
  ];

  return (
    <div className="container mx-auto flex justify-center py-20 font-dmsans">
      <div className="grid w-fit grid-cols-1 gap-10 px-10 md:grid-cols-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-5">
            <span className="w-5 text-5xl text-white">{index + 1}</span>
            <div className="flex max-w-lg gap-5 rounded-lg border bg-gray-100 px-10 py-5 pr-20">
              {feature.icon}
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
