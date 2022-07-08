import FolderSVG from "~/svg/homepage/folder.svg";
import ImageSVG from "~/svg/homepage/image.svg";
import RootfolderSVG from "~/svg/homepage/root-folder.svg";

export default function FolderStructure() {
  return (
    <div className="">
      <div className="flex flex-col items-center rounded-lg bg-slate-800 py-14 px-10 sm:py-28 sm:px-20">
        <div className="flex w-64 flex-col items-center justify-center rounded-lg bg-slate-700 py-5 text-xs">
          <RootfolderSVG className="h-6 w-6" />
          <span className="pt-2 pb-1">ROOT FOLDER</span>
          <span className="text-slate-300">
            import <strong>this</strong> folder
          </span>
        </div>
        <div className="my-3 mx-auto w-64">
          <div className="mx-auto h-7 w-1 rounded-full bg-slate-700"></div>
          <div className="mx-auto h-1 w-40 rounded-full bg-slate-700"> </div>
          <div className="mx-auto -mt-1 flex w-40 flex-row justify-between">
            <div className="h-7 w-1 rounded-full bg-slate-700"></div>
            <div className="h-7 w-1 rounded-full bg-slate-700"></div>
          </div>
        </div>
        <div className="w-80">
          <div className="flex flex-row justify-between">
            <div className="w-32 rounded-lg bg-slate-700 p-3 text-sm font-medium text-slate-300">
              <FolderSVG className="mr-2 inline h-5 w-5" />
              CLOTHES
            </div>
            <div className="w-32 rounded-lg bg-slate-700 p-3 text-sm font-medium text-slate-300">
              <FolderSVG className="mr-2 inline h-5 w-5" />
              BODY
            </div>
          </div>
        </div>
        <div className="mx-auto my-3 flex w-40 flex-row justify-between">
          <div className="h-4 w-1 rounded-full bg-slate-700"></div>
          <div className="h-4 w-1 rounded-full bg-slate-700"></div>
        </div>
        <div className="w-80">
          <div className="flex flex-row justify-between">
            <div className="w-32 rounded-lg bg-slate-700 p-2 text-xs font-medium text-slate-300">
              <ImageSVG className="mr-2 inline h-4 w-4" />
              jeans.png
            </div>
            <div className="w-32 rounded-lg bg-slate-700 p-2 text-xs font-medium text-slate-300">
              <ImageSVG className="mr-2 inline h-4 w-4" />
              male-6.png
            </div>
          </div>
          <div className="flex flex-row justify-between py-3">
            <div className="w-32 rounded-lg bg-slate-700 p-2 text-xs font-medium text-slate-300">
              <ImageSVG className="mr-2 inline h-4 w-4" />
              dress.png
            </div>
            <div className="w-32 rounded-lg bg-slate-700 p-2 text-xs font-medium text-slate-300">
              <ImageSVG className="mr-2 inline h-4 w-4" />
              female-1.png
            </div>
          </div>
          <div className="mx-auto flex w-48 flex-row justify-between text-xs">
            <span>...</span>
            <span>...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
