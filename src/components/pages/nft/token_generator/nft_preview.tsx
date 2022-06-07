/* eslint-disable @next/next/no-img-element */
import {
  collection,
  DocumentData,
  getFirestore,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import { ILayer } from "@/interfaces";

const firestore = getFirestore(firebaseApp);

type props = {
  address: string;
  collectionName: string;
};

export default function PreviewNFT({ address, collectionName }: props) {
  const [outputImages, setOutputImages] = useState<any[]>([]);

  const _query = query(
    collection(
      firestore,
      `art-engine/${address}/${collectionName}/output/images`
    )
  );
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: ILayer[], curr: DocumentData) => {
      acc.push(curr as ILayer);
      return acc;
    }, []);

    setOutputImages(data);
  }, [loading, snapshots]);

  return (
    <div>
      {outputImages.length} images
      <div className="grid w-fit grid-flow-row grid-cols-6">
        {outputImages.map((item, index) => (
          <div className="w-fit" key={index}>
            <img className="w-36" alt="" src={item.url} />
          </div>
        ))}
      </div>
    </div>
  );
}
