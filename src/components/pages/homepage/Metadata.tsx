import Markplace from "./Markplace";

export default function Metadata() {
  return (
    <div className=" mx-auto flex-row items-center rounded-2xl text-white 2xl:h-[25rem]">
      <div className="px-20 pb-5 font-dmsans text-6xl font-extrabold text-[#675C4C]">
        Metadata Handled
      </div>
      <div className="px-20 font-dmsans text-xl font-extrabold text-[#675C4C] lg:text-lg">
        MiNFT automatically exports metadata compatible with leading markplaces
        for Ethereum,
      </div>
      <div className="px-20 font-dmsans text-xl font-extrabold text-[#675C4C] lg:text-lg">
        Polygon and Solana, including rich attributes and custom names.
      </div>
      <div className="mt-10 flex flex-wrap px-20">
        <Markplace />
      </div>
    </div>
  );
}
