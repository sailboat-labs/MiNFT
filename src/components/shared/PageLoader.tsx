import Image from "next/image";
import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-[rgba(255, 255, 255, 0.2)] flex items-center justify-center bg-white  bg-opacity-60 ">
      <div className="py-4 px-8 rounded-lg flex gap-4 items-center">
        <div className="relative w-[50px] h-[50px] flex items-center justify-center p-3">
          <span className="mt-2">
            <Image src="/images/logo.webp" height={35} width={35} alt="" />
          </span>
          <div className="absolute rounded-full h-full w-full border-[5px] border-green-transparent border-l-green-800 flex items-center justify-center animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
