import ButtonLink from "../links/ButtonLink";

import ExclamationSVG from "~/svg/exclamation.svg";
import RightArrowSVG from "~/svg/rightarrow.svg";

export default function Popup() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-400">
      <div className="flex h-auto w-11/12 flex-col items-center justify-center rounded-xl border-0 bg-white py-10 xl:w-2/5 2xl:w-1/3">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
          <ExclamationSVG className="h-8 w-8 text-white" />
        </span>
        <div className="pt-8 text-xl font-bold text-black sm:text-2xl">
          Sorry, browser not supported
        </div>
        <p className="px-10 py-5 text-center text-lg font-medium text-gray-500">
          Magic Mynt uses features which are not supported by your browser.
          Please try again using Chrome, Edge or Opera.
        </p>
        <div className="flex justify-center mx-5">
          <ButtonLink
            href="https://www.google.com/chrome/"
            target="_blank"
            className="flex h-full w-full flex-row items-center justify-center rounded-xl border-blue-200 bg-blue-200 px-6 py-4 text-lg font-bold text-blue-700 sm:px-24 sm:text-base md:text-lg"
          >
            Download Google Chrome
            <RightArrowSVG className="ml-2 text-blue-700 w-6 h-6" />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
