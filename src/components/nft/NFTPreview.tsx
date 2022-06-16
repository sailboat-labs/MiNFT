/* eslint-disable @next/next/no-img-element */
import { collection, DocumentData, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useMoralis } from "react-moralis";

import { IElement, ILayer } from "@/interfaces/get-started";

import { firestore } from "./NewProperty";

interface AppProps {
  className?: string;
  layers?: ILayer[];
}

const NFTPreview: FC<AppProps> = ({ className, layers }) => {
  const [elements, setElements] = useState<IElement[]>([]);
  const router = useRouter();
  const { account, logout, isAuthenticated } = useMoralis();
  const [preview, setPreview] = useState<string[]>([]);

  const layersOrder = [
    { name: "Background" },
    { name: "Skin" },
    { name: "Outfits" },
    { name: "Eyes" },
    { name: "Mouths" },
    { name: "Beard" },
  ];

  const _layersOrder = [
    { name: "Background" },
    { name: "Skin" },
    { name: "Clothes" },
    { name: "Eyes" },
    { name: "Bling" },
    { name: "Head Accessory" },
  ];

  const _query = query(
    collection(
      firestore,
      `art-engine/users/${account}/${router.query?.name
        ?.toString()
        .toLowerCase()}/elements/`
    )
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

    const previewlist = layersOrder.map((layer) => {
      return data.filter((element) => element.trait == layer.name)[0]?.path;
    });

    setPreview(previewlist);
  }, [loading, snapshots]);

  function getPreview() {
    //Preview previews
    const preview: string[] = [];

    const previewlist = layersOrder.map((layer) => {
      return elements.find((element) => element.trait == layer.name)?.path[0];
    });
  }

  return (
    <>
      <div
        className={`h-[60vh] w-full max-w-lg rounded-lg bg-gray-100 ${className} relative`}
      >
        <div className="w-96">
          {preview.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt=""
                className="absolute w-96 rounded-b-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* <EditTemplate isOpen={isOpen} closeModal={() => setIsOpen(false)} /> */}
    </>
  );
};

export default NFTPreview;
