/* eslint-disable no-console */
import { getFirestore } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

import { firebaseApp } from "@/lib/firebase";

const firestore = getFirestore(firebaseApp);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "GET") {
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
}

function responder(success: boolean, message: any) {
  return {
    success,
    message,
  };
}