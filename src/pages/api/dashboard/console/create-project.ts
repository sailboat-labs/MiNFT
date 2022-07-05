/* eslint-disable no-console */
import dashify from "dashify";
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

import { IProject } from "@/interfaces";

const firestore = getFirestore(firebaseApp);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const project = req.body?.project as IProject;
      const { account } = req.body;
      if (!project)
        return res.status(403).send(responder(false, "No project provided"));
      if (!account)
        return res
          .status(403)
          .send(responder(false, "Authentication required"));

      const result = await createNewProject(account, project);

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

async function createNewProject(account: string, project: IProject) {
  const dashboardCollection = collection(firestore, `Projects`);

  const _query = query(
    dashboardCollection,
    where("slug", "==", dashify(project.projectName.toLowerCase()))
  );

  const exists = (await getDocs(_query)).docs.length > 0;

  if (!exists) {
    const _doc = doc(
      firestore,
      `Projects/${dashify(project.projectName.toLowerCase())}`
    );
    const data = {
      ...project,
      slug: dashify(project.projectName),
      owner: account,
    };
    await setDoc(_doc, data);

    return { success: true };
  } else {
    return { success: false, message: "Project already exists" };
  }
}

function responder(success: boolean, message: any) {
  return {
    success,
    message,
  };
}
