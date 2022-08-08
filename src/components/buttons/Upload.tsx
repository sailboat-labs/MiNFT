import React, { ChangeEvent, FC, useRef } from "react";

interface AppProps {
  desc?: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  togglerClass?: string;
  wrapperClass?: string;
  type?: "inline" | "block";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: FC<AppProps> = ({
  desc,
  onChange,
  accept = "*",
  type = "inline",
  multiple = false,
  label = "Upload",
  togglerClass = "",
  wrapperClass = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={`relative  ${
        type === "inline"
          ? " flex items-center gap-2"
          : "flex  flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-200 px-10 hover:border-gray-300"
      } ${wrapperClass}`}
    >
      <button
        className={`flex cursor-pointer items-center gap-2 rounded-md bg-indigo-500 py-2 pr-4 pl-2 text-white hover:shadow-md ${togglerClass}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 stroke-white"
          fill="none"
          viewBox="0 0 24 24"
          // stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        <span>{label}</span>
      </button>
      <input
        ref={fileInputRef}
        className="pointer-events-none absolute -z-10 opacity-0"
        onChange={onChange}
        multiple={multiple}
        type="file"
        accept={accept}
      />
      {desc && <p className="text-gray-500">{desc}</p>}
    </div>
  );
};

export default UploadButton;
