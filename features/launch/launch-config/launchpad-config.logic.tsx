import { doc, getFirestore, setDoc } from "firebase/firestore";

import { firebaseApp } from "@/lib/firebase";

import { IProject } from "@/interfaces";

const firestore = getFirestore(firebaseApp);

export default async function saveLaunchPadDraft(
  project: IProject,
  field: string,
  value: string
) {
  try {
    const data = {
      [field]: value,
    };

    const _doc = doc(firestore, `Projects/${project.slug}/Launchpad/draft`);
    await setDoc(_doc, data, { merge: true });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
