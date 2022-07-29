import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";

import { firebaseApp } from "@/lib/firebase";

type IImageUploadProps = {
  className?: string;
  layerName: string;
};
export const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function UploadElement({
  className,
  layerName,
}: // setImageUrl,
IImageUploadProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [percentageComplete, setPercentageComplete] = useState(0);

  return <></>;
}
