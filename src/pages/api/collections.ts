/* eslint-disable no-console */
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

import { firebaseApp } from "@/lib/firebase";

const firestore = getFirestore(firebaseApp);
const collectionsCollection = collection(firestore, "collections");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const { collection } = req.body;

      const _doc = doc(firestore, `collections/${collection.id}`);
      await setDoc(_doc, collection);

      return res.status(200).json({ success: true });
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
