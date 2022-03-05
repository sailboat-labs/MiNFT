/* eslint-disable no-console */
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

import { firebaseApp } from "@/lib/firebase";

const firestore = getFirestore(firebaseApp);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionId } = req.body;
  const _collection = collection(
    firestore,
    `collections/${collectionId}/comments`
  );

  try {
    if (req.method == "POST") {
      const { comment } = req.body;

      const _doc = doc(
        firestore,
        `collections/${collectionId}/comments/${comment.id}`
      );
      await setDoc(_doc, comment);

      return res.status(200).json({ success: true });
    } else if (req.method == "PUT") {
      const { comment } = req.body;

      const _doc = doc(
        firestore,
        `collections/${collectionId}/comments/${comment.id}`
      );
      await updateDoc(_doc, comment);

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
