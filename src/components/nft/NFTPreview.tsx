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
  layers: ILayer[];
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

  const project = router.query?.name?.toString().toLowerCase();

  const _query = query(
    collection(firestore, `art-engine/users/${account}/${project}/elements/`)
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

    console.log({ previewlist });
  }

  return (
    <>
      <div
        className={`h-fit w-72 rounded-t-lg bg-[#E7ECF3] ${className} relative`}
      >
        <div className="flex justify-center">
          <div className="inline-block -translate-y-4 transform rounded-md border border-[#E7ECF3] bg-[#F3F7FA] px-6 py-2 font-semibold text-indigo-700">
            Preview
          </div>
        </div>
        <div className="w-72">
          {preview.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt=""
                className="absolute w-72 rounded-b-lg object-cover"
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
