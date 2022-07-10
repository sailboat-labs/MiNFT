import Markplace from "./Markplace";

export default function Metadata() {
  return (
    <div className="mx-auto h-[25rem] flex-row items-center rounded-2xl text-white">
      <div className="px-20 pb-5 font-dmsans text-6xl font-extrabold text-[#675C4C]">
        Metadata Handled
      </div>
      <div className="px-20 font-dmsans text-lg font-extrabold text-[#675C4C]">
        MiNFT automatically exports metadata compatible with leading markplaces
        for Ethereum,
      </div>
      <div className="px-20 font-dmsans text-lg font-extrabold text-[#675C4C]">
        Polygon and Solana, including rich attributes and custom names.
      </div>
      <div className="mt-10 flex flex-wrap px-20">
        <Markplace />
      </div>
    </div>
  );
}
