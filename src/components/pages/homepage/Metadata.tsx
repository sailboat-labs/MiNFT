import Markplace from "./Markplace";

export default function Metadata() {
  return (
    <div className=" mx-auto flex-row items-center rounded-2xl text-white 2xl:h-[25rem]">
      <div className="px-10 pb-5 font-dmsans text-6xl font-extrabold text-[#675C4C] md:px-20">
        Metadata Handled
      </div>
      <div className="px-10 font-dmsans text-xl font-extrabold text-[#675C4C] md:px-20 lg:text-lg">
        Magic Mynt automatically exports metadata compatible with leading
        marketplaces for Ethereum,
      </div>
      <div className="px-10 font-dmsans text-xl font-extrabold text-[#675C4C] md:px-20 lg:text-lg">
        Polygon and Solana, including rich attributes and custom names.
      </div>
      <div className="mt-10 flex flex-wrap px-10 md:px-20">
        <Markplace />
      </div>
    </div>
  );
}
