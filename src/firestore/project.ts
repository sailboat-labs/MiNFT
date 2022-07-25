import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { firestore } from "@/lib/firebase";

export const checkTwitterExists = async (
  projectSlug: string,
  twitter: string
) => {
  const _collection = collection(
    firestore,
    `Projects/${projectSlug}/Whitelist`
  );
  const _query = query(_collection, where("twitterUsername", "==", twitter));
  const _docs = (await getDocs(_query)).docs;

  return _docs.length > 0;
};

export const updateAccounts = async (projectSlug: string, twitter: string) => {
  const _doc = doc(firestore, `Projects/${projectSlug}`);
  const project = (await getDoc(_doc)).data();

  const twitterAccounts = project?.accounts ?? [];

  return await updateDoc(_doc, {
    accounts: [...twitterAccounts, ...[twitter]],
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProject = async (data: any) => {
  const _doc = doc(firestore, `Projects/${data.projectSlug}`);

  return await updateDoc(_doc, data);
};
