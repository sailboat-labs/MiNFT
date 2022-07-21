/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, setDoc } from "firebase/firestore";

import { firestore } from "@/lib/firebase";

export const addWhitelist = async (data: any) => {
  const _doc = doc(
    firestore,
    `Projects/${data.projectSlug}/Whitelist/${data.id}`
  );

  return await setDoc(_doc, data);
};
