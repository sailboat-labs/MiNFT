import Live1SVG from "~/svg/homeV2/live1.svg";
import Live2SVG from "~/svg/homeV2/live2.svg";
import Live3SVG from "~/svg/homeV2/live3.svg";

export default function LiveAuctions() {
  return (
    <div className="flex h-full items-center py-20 shadow-2xl lg:py-0">
      <div className=" ml-6 flex flex-col 2xl:ml-10">
        <div className="ml-5 flex flex-row items-center justify-center pb-2 lg:justify-start">
          <span className="relative flex h-3 w-3 2xl:h-5 2xl:w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-600 2xl:h-5 2xl:w-5"></span>
          </span>
          <h1 className="ml-2 text-xl font-bold 2xl:text-4xl">Live auctions</h1>
        </div>
        <div>
          <div className="flex flex-col">
            <Live1SVG className="h-52 w-52 2xl:h-72 2xl:w-72" />
            <Live2SVG className="h-52 w-52 2xl:h-72 2xl:w-72" />
            <Live3SVG className="h-52 w-52 2xl:h-72 2xl:w-72" />
          </div>
        </div>
      </div>
    </div>
  );
}
