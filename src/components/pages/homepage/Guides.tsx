import Image from "next/image";

import ButtonLink from "@/components/links/ButtonLink";

export default function Guides() {
  const guides: {
    title: string;
    description: string;
    button: string;
    image: string;
  }[] = [
    {
      title: "How it works?",
      description:
        "Follow the steps, hit generate, then watch your NFT collection come to life in seconds. Layers not quite right? Change the order and preview it again. You, the creator, have total control in one easy-to-use tool.",
      button: "Start now",
      image: "/images/homepage/guide_1.png",
    },
    {
      title: "MiNFT Contract",
      description:
        "We've made it so easy to deploy your smart contract, you'll want to put our wallet address in your royalty box just to thank us! Follow our seamless process, test and adjust your parameters as many times as you need, then deploy when ready.",
      button: "Start now",
      image: "/images/homepage/guide_2.png",
    },
    {
      title: "MiNFT List",
      description:
        "An NFT launch needs two things to succeed: hype and community. Lucky for you, our Discord and Twitter verification make it super easy to let the humans in and keep the bots out of your pre-sale list.",
      button: "Start now",
      image: "/images/homepage/guide_3.png",
    },
  ];

  return (
    <div>
      {/* <div className="m-auto flex w-4/5 flex-col font-montserrat "> xl:w-3/5 */}
      <div className="m-auto flex w-4/5 flex-col font-montserrat lg:w-3/4">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="mb-12 flex flex-row items-center justify-between rounded-2xl bg-indigo-800 px-10 py-8 text-white lg:h-96 lg:px-16 lg:py-10  "
          >
            <div className="flex flex-col justify-center lg:w-[30rem]">
              <div className="text-2xl font-bold">{guide.title}</div>
              <div className="mt-5 text-base font-normal">
                {guide.description}
              </div>
              <div className="">
                <ButtonLink
                  className="mt-7 flex h-10 w-48 items-center justify-center rounded-lg border-0 bg-white text-base font-bold text-indigo-800 hover:bg-indigo-500"
                  href="https://r3c9oapreew.typeform.com/to/RDOUdJXk"
                  target='_blank'
                >
                  {guide.button}
                </ButtonLink>
              </div>
            </div>
            <div className="hidden h-80 w-80 items-center justify-center rounded-xl lg:flex">
              <Image src={guide.image} alt="Preview" width={320} height={320} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
