/* eslint-disable no-console */
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

import { firebaseApp } from "@/lib/firebase";

const firestore = getFirestore(firebaseApp);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const { account, address, slug } = req.body;
      const role = req.body?.role ?? "viewer";
      if (!slug)
        return res.status(403).send(responder(false, "No project provided"));
      if (!address)
        return res.status(403).send(responder(false, "No address provided"));
      if (!account)
        return res
          .status(403)
          .send(responder(false, "Authentication required"));

      console.log({ account, address, slug, role });

      const result = await delegateAccess(account, address, slug, role);

      return res.send(responder(true, result));
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

async function delegateAccess(
  account: string,
  addressToDelegate: string,
  slug: string,
  role: string
) {
  const projectsCollection = collection(firestore, `Projects`);

  const _projectQuery = query(projectsCollection, where("slug", "==", slug));

  const projectExists = (await getDocs(_projectQuery)).docs.length > 0;

  if (projectExists) {
    console.log(
      "Project owner",
      (await getDocs(_projectQuery)).docs[0].data().owner,
      "Incoming account",
      account
    );

    if ((await getDocs(_projectQuery)).docs[0].data().owner != account) {
      console.log("Not allowed to delegate");

      return responder(false, "Not allowed");
    }
  }

  console.log(projectExists, (await getDocs(_projectQuery)).docs);

  const delegateAccessCollection = collection(
    firestore,
    `Projects/${slug}/Delegates`
  );

  const _query = query(
    delegateAccessCollection,
    where("slug", "==", slug),
    where("owner", "==", account),
    where("delegate", "==", addressToDelegate)
  );

  const exists = (await getDocs(_query)).docs.length > 0;

  if (exists) {
    const _doc = doc(
      firestore,
      `Projects/${slug}/Delegates/${addressToDelegate}`
    );
    const data = {
      delegates: addressToDelegate,
      dateDelegated: new Date().toISOString(),
      role: role,
    };
    await updateDoc(_doc, data);

    return { success: true };
  } else {
    const _doc = doc(
      firestore,
      `Projects/${slug}/Delegates/${addressToDelegate}`
    );
    const data = {
      delegate: addressToDelegate,
      dateDelegated: new Date().toISOString(),
      slug: slug,
      owner: account,
      role: role,
    };
    await setDoc(_doc, data);
  }
}

function responder(success: boolean, message: any) {
  return {
    success,
    message,
  };
}
