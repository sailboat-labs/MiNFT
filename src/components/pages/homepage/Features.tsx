export default function Features() {
  const features: { title: string; description: string; icon?: any }[] = [
    {
      title: "Easy To Use",
      description:
        "No coding required, at all. Create your layers, import your assets, click “Generate” and you are done!",
    },
    {
      title: "No Account Needed",
      description:
        "No account creation needed to start creating your collection.",
    },
    {
      title: "Export To Images or GIFs",
      description:
        "You can import images, gifs and videos and we will generate your collection in the format your decide.",
    },
    {
      title: "Layer Rarity",
      description:
        "In a large collection, you may not want to apply a layer on every NFT. ",
    },
  ];

  return (
    <div>
      {features.map((feature, index) => (
        <div key={index} className="rounded-lg border bg-gray-100 px-10 py-5">
          <div>{feature.title}</div>
          <div>{feature.description}</div>
        </div>
      ))}
    </div>
  );
}
