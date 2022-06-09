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

  const project = router.query?.name?.toString().toLowerCase();

  const _query = query(
    collection(firestore, `art-engine/users/${account}/${project}/elements/`),
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
            <strong>Total</strong>: {elements.length}
          </span>
        </div>
        <button className="rounded-md border border-indigo-600 px-4 py-2 font-medium text-indigo-600">
          Change rarity
        </button>
      </div>

      {/* preview content */}
      <div className="mt-5 flex flex-wrap gap-6 rounded-md bg-[color:var(--bg-indigo)] p-6">
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
