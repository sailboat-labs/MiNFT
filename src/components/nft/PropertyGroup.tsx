import React, { FC } from "react";

import { IElement } from "@/interfaces/get-started";

import TraitPreview from "./TraitPreview";

interface AppProps {
  name: string;
  onChange: ({
    groupName,
    traitIndex,
  }: {
    groupName: string;
    traitIndex: number;
  }) => void;
}

const PropertyGroup: FC<AppProps> = ({ name, onChange }) => {
  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <button className="mr-4 flex items-center gap-2 rounded-md bg-[color:var(--blue)] py-2 px-4 text-white">
            {name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <span>
            <strong>Total</strong>: 14 traits
          </span>
        </div>
        <button className="rounded-md border border-indigo-600 px-4 py-2 font-medium text-indigo-600">
          Change rarity
        </button>
      </div>

      {/* preview content */}
      <div className="mt-5 flex flex-wrap gap-6 rounded-md bg-[color:var(--bg-indigo)] p-6">
        {/* {elements.map((element, index) => (
          <TraitPreview
            key={index}
            file={element.path}
            traitIndex={index}
            onSelect={(traitIndex) => onChange({ traitIndex, groupName: name })}
            active={false}
          />
        ))} */}
        <div className="flex h-[76px] items-center gap-3">
          <button className="grid h-12 w-12 place-content-center rounded-full bg-white shadow-md">
            <svg
              xmlns="http://www.w3.org/1200/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <button className="grid h-12 w-12 place-content-center rounded-full bg-white shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyGroup;
