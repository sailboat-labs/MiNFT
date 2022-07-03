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
      image: "Image still cookin'",
    },
    {
      title: "MiNFT Contract",
      description:
        "We've made it so easy to deploy your smart contract, you'll want to put our wallet address in your royalty box just to thank us! Follow our seamless process, test and adjust your parameters as many times as you need, then deploy when ready.",
      button: "Start now",
      image: "Image still cookin'",
    },
    {
      title: "MiNFT List",
      description:
        "An NFT launch needs two things to succeed: hype and community. Lucky for you, our Discord and Twitter verification make it super easy to let the humans in and keep the bots out of your pre-sale list.",
      button: "Start now",
      image: "Image still cookin'",
    },
  ];

  return (
    <div>
      <div className="m-auto flex w-3/5 flex-col font-montserrat">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="mb-12 flex h-96 flex-row items-center justify-between rounded-2xl bg-indigo-800 px-16 py-10 text-white"
          >
            <div className="flex w-96 flex-col justify-center">
              <div className="text-2xl font-bold">{guide.title}</div>
              <div className="mt-5 text-base font-normal">
                {guide.description}
              </div>
              <div className="">
                <ButtonLink
                  className="mt-7 flex h-10 w-48 items-center justify-center rounded-lg border-0 bg-white text-base font-bold text-indigo-800 hover:bg-indigo-500"
                  href="#"
                >
                  {guide.button}
                </ButtonLink>
              </div>
            </div>
            <div className="flex h-72 w-72 items-center justify-center rounded-xl bg-gray-200 font-bold text-indigo-800">
              {guide.image}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
