import { doc, setDoc } from "firebase/firestore";

import { IProject } from "@/interfaces";
import { firestore } from "@/pages/dashboard";

export default async function saveInformationToFirebase(
  project: IProject,
  field: string,
  value: string | boolean | { title: string; description: string }[] | string[]
) {
  try {
    const data = {
      [field]: value,
    };

    const _doc = doc(firestore, `Projects/${project.slug}`);
    await setDoc(_doc, data, { merge: true });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
