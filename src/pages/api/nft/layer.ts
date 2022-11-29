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

/* eslint-disable no-console */
import { ILayer } from "@/interfaces";

import { IProject } from "./../../../interfaces/index";
const firestore = getFirestore(firebaseApp);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const { layer, project, account } = req.body;
      if (layer == null || layer == undefined)
        return res.status(403).send("No layer given");
      if (project?.owner == null)
        return res.status(403).send("No Project given");

      const result = await addNewLayer(layer, project, account);
      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(403).json(result);
      }
    }

    return res.status(404).json({ success: false, message: "Not Found" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error, message: "Unable to process request" });
  }
};

async function addNewLayer(layer: ILayer, project: IProject, account: string) {
  try {
    //Confirm that project is for the user
    const dashboardCollection = collection(firestore, `Projects`);

    const _query = query(
      dashboardCollection,
      where("slug", "==", project.slug)
    );

    const projectInDatabase = (await getDocs(_query)).docs;
    if (projectInDatabase[0].data().owner != account)
      return { success: false, message: "Invalid user" };

    const _doc = doc(firestore, `Projects/${project.slug}/Layers/${layer.id}`);

    await setDoc(_doc, layer);

    return { success: true, message: "Layer updated" };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}

export default handler;
