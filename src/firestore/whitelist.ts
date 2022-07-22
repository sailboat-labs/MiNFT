/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { firestore } from "@/lib/firebase";

export const addWhitelist = async (data: any) => {
  const _doc = doc(
    firestore,
    `Projects/${data.projectSlug}/Whitelist/${data.id}`
  );

  return await setDoc(_doc, data);
};

export const checkWhitelisted = async (
  projectSlug: string,
  address: string
) => {
  const _collection = collection(
    firestore,
    `Projects/${projectSlug}/Whitelist`
  );
  const _query = query(_collection, where("wallet", "==", address));
  const _docs = (await getDocs(_query)).docs;

  return _docs.length > 0;
};
