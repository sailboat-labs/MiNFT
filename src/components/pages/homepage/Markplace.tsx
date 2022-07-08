import Image from "next/image";

export default function Markplace() {
  const markplaces: {
    title: string;
    image: string;
  }[] = [
    {
      title: "Opensea",
      image: "/images/homepage/opensea.png",
    },
    {
      title: "Rarible",
      image: "/images/homepage/rarible.png",
    },
    {
      title: "Foundation",
      image: "/images/homepage/foundation.png",
    },
    {
      title: "Alpha",
      image: "/images/homepage/alpha.png",
    },
    {
      title: "Solsea",
      image: "/images/homepage/solsea.png",
    },
    {
      title: "Magic Eden",
      image: "/images/homepage/magic-eden.png",
    },
  ];
  return (
    <div className="flex flex-row flex-wrap">
      {markplaces.map((markplace, index) => (
        // <div key={index} className="bg-[#2e0b41]">
        <div
          key={index}
          className="m-0.5 flex h-28 w-72 max-w-lg items-center justify-center bg-slate-800"
        >
          <Image
            src={markplace.image}
            alt={markplace.title}
            width={220}
            height={50}
          />
        </div>
      ))}
    </div>
  );
}
