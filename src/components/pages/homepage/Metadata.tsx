import Markplace from "./Markplace";

export default function Metadata() {
  return (
    <div className="mx-auto mb-20 w-4/5 items-center rounded-2xl font-montserrat text-white lg:w-3/4">
      <div className="flex flex-col sm:items-center lg:flex-row lg:justify-evenly">
        <div className="lg:min-w-[35rem]">
          <h1 className="text-5xl font-medium lg:text-6xl ">
            Metadata, handled.
          </h1>
          <p className="mt-4 text-xl text-indigo-100">
            MiNFT automatically exports metadata compatible with leading
            markplaces for Ethereum, Polygon and Solana, including rich
            attributes and custom names.
          </p>
        </div>
        <div className="mt-10 lg:m-auto">
          <Markplace />
        </div>
      </div>
    </div>
  );
}
