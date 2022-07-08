import Markplace from "./Markplace";

export default function Metadata() {
  return (
    <div className="mx-auto h-[25rem] w-4/5 flex-row items-center rounded-2xl text-white dark:text-gray-200">
      <div className="flex flex-row items-center justify-between">
        <div className=" flex w-550 flex-col">
          <span className="text-6xl font-normal">Metadata, handled.</span>
          <p className="mt-4 text-xl text-indigo-100">
            MiNFT automatically exports metadata compatible with leading
            markplaces for Ethereum, Polygon and Solana, including rich
            attributes and custom names.
          </p>
        </div>
        <div className="">
          <div className="flex flex-wrap">
            <Markplace />
          </div>
        </div>
      </div>
    </div>
  );
}
