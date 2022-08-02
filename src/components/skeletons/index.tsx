import React, { FC } from "react";

interface AppProps {
  type?: "heading" | "text" | "circle" | "image" | "rect";
  className?: string;
  textConfig?: {
    display?: "block" | "inline";
  };
}

const SHARED_CLASSES = "animate-pulse rounded-full bg-gray-200";

const Skeleton: FC<AppProps> = ({
  type = "text",
  className = "",
  textConfig = { display: "block" },
}) => {
  if (type === "heading") {
    return (
      <div
        className={`min-w-12 h-7 w-full ${SHARED_CLASSES}   ${className}`}
      ></div>
    );
  }

  if (type === "circle") {
    return <div className={`h-20 w-20  ${SHARED_CLASSES} ${className}`}></div>;
  }

  if (type === "rect") {
    return (
      <div
        className={`h-10 w-full  ${SHARED_CLASSES} !rounded-md ${className}`}
      ></div>
    );
  }

  return textConfig.display === "block" ? (
    <>
      <div className={`h-4 w-full ${SHARED_CLASSES}   ${className}`}></div>
      <div className="flex items-center gap-3">
        <div className={`h-4 w-2/3 ${SHARED_CLASSES}  ${className}`}></div>
        <div className={`h-4 w-1/3 ${SHARED_CLASSES}   ${className}`}></div>
      </div>
      <div className={`h-4 w-1/2 ${SHARED_CLASSES}   ${className}`}></div>
    </>
  ) : (
    <>
      <div className={`h-4 w-20 ${SHARED_CLASSES}   ${className}`}></div>
    </>
  );
};

export default Skeleton;
