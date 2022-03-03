/* eslint-disable no-console */
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

import { firebaseApp } from "@/lib/firebase";

const firestore = getFirestore(firebaseApp);
const usersCollections = collection(firestore, "users");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address } = req.body;

    const checkExistsQuery = query(
      usersCollections,
      where("id", "==", address)
    );

    const exists = (await getDocs(checkExistsQuery)).docs.length > 0;

    if (!exists) {
      const _doc = doc(firestore, `users/${address}`);
      await setDoc(_doc, {
        walletId: address,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
};

export default handler;
