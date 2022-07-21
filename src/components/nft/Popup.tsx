import { useState } from "react";

import ButtonLink from "../links/ButtonLink";

import ExclamationSVG from "~/svg/exclamation.svg";
import RightArrowSVG from "~/svg/rightarrow.svg";

export default function Popup() {
  const [browser, setBrowser] = useState(true);
  const showPopup = () => {
    setBrowser(!browser);
  };

  return (
    <div className="flex items-center justify-center h-full w-full ">
      <div className="flex h-auto w-11/12 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-10 xl:w-1/2">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
          <ExclamationSVG className="h-8 w-8 text-white" />
        </span>
        <div className="pt-8 text-xl font-bold text-black sm:text-2xl">
          Sorry, browser not supported
        </div>
        <p className="px-10 py-5 text-center text-lg font-medium text-gray-600">
          Magic Mynt uses features which are not supported by your browser.
          Please try again using Chrome, Edge or Opera.
        </p>
        <div className="mx-5 flex justify-center">
          <ButtonLink
            href="https://www.google.com/chrome/"
            target="_blank"
            className="flex h-full w-full flex-row items-center justify-center rounded-xl border-2 border-blue-200 bg-blue-200 px-6 py-4 text-lg font-bold text-blue-700 hover:border-blue-700 sm:px-24 sm:text-base md:text-lg"
          >
            Download Google Chrome
            <RightArrowSVG className="ml-2 h-6 w-6 text-blue-700" />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
