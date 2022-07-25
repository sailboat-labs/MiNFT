/* eslint-disable no-console */
import {
  collectionGroup,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

import { firebaseApp } from "@/lib/firebase";

const firestore = getFirestore(firebaseApp);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const { account } = req.body;

      if (!account)
        return res
          .status(403)
          .send(responder(false, "Authentication required"));

      const result = await getAllProjects(account);

      return res.send(result);
    }
    return res.status(404).json({ success: false, message: "Not Found" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error, message: "Unable to process request" });
  }
};

export default handler;

async function getAllProjects(account: string) {
  //

  const delegateAccessCollection = collectionGroup(firestore, `Delegates`);
  try {
    const _query = query(
      delegateAccessCollection,

      where("delegate", "==", account)
    );

    const delegatedAccess = (await getDocs(_query)).docs;

    responder(true, delegatedAccess);
  } catch (error) {
    console.log(error);

    return responder(false, error);
  }
}

function responder(success: boolean, message: any) {
  return {
    success,
    message,
  };
}
