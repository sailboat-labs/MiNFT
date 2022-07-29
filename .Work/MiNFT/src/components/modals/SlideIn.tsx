import React from "react";

interface AppProps {
  show: boolean;
  onClose: () => void;
  slideFrom?: "left" | "right";
  children: React.ReactNode;
}

export default function SlideInModal({
  show,
  onClose,
  slideFrom = "left",
  children,
}: AppProps) {
  return (
    <div
      className={`fixed right-0 top-0 z-[10000] h-screen w-screen overflow-x-hidden transition-all duration-300  ${
        show ? "pointer-events-auto " : "pointer-events-none"
      }`}
    >
      <div
        onClick={() => onClose()}
        className={`absolute ${
          slideFrom === "right" ? "right-0" : "left-0"
        } h-screen w-[length:calc(100vw-0rem)] overflow-x-hidden transition-all duration-300  ${
          show
            ? "pointer-events-auto bg-black bg-opacity-50"
            : "pointer-events-none bg-transparent bg-opacity-0"
        }`}
      ></div>
      <div
        className={`container absolute z-[10001] mx-auto h-screen max-w-2xl divide-gray-200 overflow-auto bg-white py-10 px-10 transition-all duration-300 ${
          slideFrom === "right"
            ? show
              ? "right-0"
              : "-right-full"
            : show
            ? "left-0"
            : "-left-full"
        } `}
      >
        {children}
      </div>
    </div>
  );
}
