/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from "react";

interface AppProps {
  active?: boolean;
  traitIndex: number;
  file: string | File;
  onRemove?: (traitIndex: number) => void;
  onSelect?: (traitIndex: number) => void;
}

const TraitPreview: FC<AppProps> = ({
  file,
  traitIndex,
  active = false,
  onSelect,
  onRemove: removeTrait,
}) => {
  const url = typeof file === "string" ? file : URL.createObjectURL(file);

  return (
    <div
      onClick={() => onSelect && onSelect(traitIndex)}
      className={`${
        active && "border-[#30489C]"
      } relative rounded-lg border-2 transition-all duration-150 hover:cursor-pointer hover:border-[#30489C]`}
    >
      {removeTrait && (
        <svg
          xmlns="http://www.w3.org/1200/svg"
          className="absolute -left-2 -top-2 h-6 w-6 rotate-45 transform rounded-full bg-white p-1 shadow-md transition duration-150 hover:rotate-[135deg] hover:cursor-pointer hover:border hover:border-gray-200 hover:shadow-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => removeTrait(traitIndex)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      )}
      <div className="h-[76px] w-[76px] overflow-hidden rounded-md">
        <img
          src={url}
          // alt="file preview"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default TraitPreview;
