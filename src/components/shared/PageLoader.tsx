import Image from "next/image";
import React from "react";

const PageLoader = () => {
  return (
    <div className="bg-[rgba(255, 255, 255, 0.2)] fixed inset-0 z-[1000] bg-white dark:bg-black dark:opacity-80 flex items-center justify-center   bg-opacity-60 ">
      <div className="flex items-center gap-4 rounded-lg py-4 px-8">
        <div className="relative flex h-[50px] w-[50px] items-center justify-center p-3">
          <span className="mt-2">
            <Image src="/images/logo.webp" height={35} width={35} alt="" />
          </span>
          <div className="border-green-transparent absolute flex h-full w-full animate-spin items-center justify-center rounded-full border-[5px] border-l-green-800"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
