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
const collectionsCollection = collection(firestore, "collections");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const { collection } = req.body;

      const _query = query(
        collectionsCollection,
        where("slug", "==", collection.slug)
      );

      const exists = (await getDocs(_query)).docs.length > 0;

      if (!exists) {
        const _doc = doc(firestore, `collections/${collection.id}`);
        await setDoc(_doc, collection);

        return res.status(200).json({ success: true });
      } else {
        return res
          .status(200)
          .json({ success: false, message: "Name already exists" });
      }
    }
    return res.status(500).json({ success: false, message: "Wrong method" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error, message: "Unable to process request" });
  }
};

export default handler;
