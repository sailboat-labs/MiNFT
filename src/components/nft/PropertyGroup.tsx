import {
  collection,
  DocumentData,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import TraitPreview from "./TraitPreview";
import UploadElement from "../pages/nft/token_generator/upload_element";
import { IElement } from "@/types";

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
const firestore = getFirestore(firebaseApp);

const PropertyGroup: FC<AppProps> = ({ name, onChange }) => {
  const address = "francis";
  const collectionName = "nozo";

  const [elements, setElements] = useState<IElement[]>([]);

  const _query = query(
    collection(firestore, "art-engine/francis/nozo/input/elements"),
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
      <div className="flex items-center justify-between">
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
            <strong>Total</strong>: {elements.length} trait
            {elements.length == 1 ? "" : "s"}
          </span>
        </div>
        <button className="rounded-md border border-indigo-600 px-4 py-2 font-medium text-indigo-600">
          Change rarity
        </button>
      </div>

      {/* preview content */}
      <div className="mt-5 flex flex-wrap gap-6 rounded-md bg-[color:var(--bg-indigo)] p-6">
        {elements.map((element, index) => (
          <div key={index}>
            <TraitPreview
              key={index}
              file={element.path}
              traitIndex={index}
              onSelect={(traitIndex) =>
                onChange({ traitIndex, groupName: name })
              }
              active={false}
            />
          </div>
        ))}
        <div className="flex h-[76px] items-center gap-3">
          <UploadElement
            layerName={name}
            address={address}
            collection={collectionName}
          />

          {/* <button className="grid h-12 w-12 place-content-center rounded-full bg-white shadow-md">
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
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PropertyGroup;
