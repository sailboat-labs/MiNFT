import { collection, DocumentData, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useMoralis } from "react-moralis";

import { IElement } from "@/interfaces/get-started";

import { firestore } from "./NewProperty";
import TraitPreview from "./TraitPreview";
import UploadElement from "./UploadElement";

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
  const router = useRouter();

  const [elements, setElements] = useState<IElement[]>([]);

  const { account, logout, isAuthenticated } = useMoralis();

  const _query = query(
    collection(
      firestore,
      `art-engine/users/${account}/${router.query?.name
        ?.toString()
        .toLowerCase()}/elements/`
    ),
    where("trait", "==", name)
  );

  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: IElement[], curr: DocumentData) => {
      acc.push(curr as IElement);
      return acc;
    }, []);

    setElements(data);
  }, [loading, snapshots]);

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between bg-white">
        <div className="flex w-full items-center gap-4 border-y bg-gray-100 py-2">
          <div className=" flex items-center gap-2 rounded-md   pl-4 text-lg ">
            {name}
          </div>
          <span className="text-sm text-gray-700">
            {elements.length} variation{elements.length == 1 ? "" : "s"}
          </span>
        </div>
        {/* <button className="rounded-md border border-indigo-600 px-4 py-2 font-medium text-indigo-600">
          Change rarity
        </button> */}
      </div>

      {/* preview content */}
      <div className="mt-5 flex flex-wrap gap-6 rounded-md  p-6">
        {elements.map((element, index) => (
          <TraitPreview
            key={index}
            file={element.path}
            traitIndex={index}
            // onSelect={(traitIndex) => onChange({ traitIndex, groupName: name })}
            active={false}
          />
        ))}
        <div className="flex h-[76px] items-center gap-3">
          <UploadElement layerName={name} />
        </div>
      </div>
    </div>
  );
};

export default PropertyGroup;
