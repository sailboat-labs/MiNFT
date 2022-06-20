//Property Group

import { getFirestore } from "firebase/firestore";
import React, { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getPreviewLayers } from "redux/reducers/selectors/layers";

import { firebaseApp } from "@/lib/firebase";

import TraitPreview from "./TraitPreview";

interface AppProps {
  name: string;
  elements: any[];
  onChange: ({
    groupName,
    traitIndex,
  }: {
    groupName: string;
    traitIndex: number;
  }) => void;
}
const firestore = getFirestore(firebaseApp);

const PropertyGroup: FC<AppProps> = ({ name, onChange, elements }) => {
  // const { account, logout, isAuthenticated } = useMoralis();
  const accordionContent = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const previewLayers = useSelector(getPreviewLayers);

  return (
    <div id={`trait-group-${name}`}>
      {/* header */}
      <div
        className="flex items-center justify-between bg-white"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex w-full items-center gap-4 border-y bg-gray-100 py-2">
          <div className=" flex items-center gap-2 rounded-md   pl-4 text-base ">
            {name}
          </div>
          <span className="text-sm text-gray-700">
            {elements?.length} variation{elements?.length == 1 ? "" : "s"}
          </span>
        </div>
        {/* <button className="rounded-md border border-indigo-600 px-4 py-2 font-medium text-indigo-600">
          Change rarity
        </button> */}
      </div>

      {/* preview content */}
      <div
        style={{
          maxHeight: collapsed
            ? 0
            : accordionContent.current?.scrollHeight + "px",
        }}
        className="overflow-y-hidden transition-all  duration-200"
        ref={accordionContent}
      >
        <div className={`mt-5 flex flex-wrap gap-6 rounded-md p-6 `}>
          {elements.map((element: any, index: number) => (
            <TraitPreview
              key={index}
              file={element}
              traitIndex={index}
              // onSelect={(traitIndex) => onChange({ traitIndex, groupName: name })}
              active={
                previewLayers.find(
                  (layer: { layer: string; element: string }) =>
                    layer.layer == name
                )?.element == element.path
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGroup;
