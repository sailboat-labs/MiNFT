import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

import { firebaseApp } from "@/lib/firebase";

import { IProject } from "@/interfaces";
import { isProjectOwner } from "@/utils/authentication";

const firestore = getFirestore(firebaseApp);

export default async function saveLaunchPadDraft(
  project: IProject,
  field: string,
  value: string | boolean | { title: string; description: string }[]
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

export async function saveContractMaker(
  contractType: string,
  project: IProject,
  field: string,
  value: string | boolean | { title: string; description: string }[]
) {
  try {
    const data = {
      [field]: value,
    };

    const _doc = doc(
      firestore,
      `Projects/${project.slug}/Contract-Maker/draft/${contractType}/draft`
    );

    await setDoc(_doc, data, { merge: true });
    return true;
  } catch (error) {
    console.log("Error ocurred in save contract maker");

    console.log(error);
    return false;
  }
}

export async function publishLaunchpad(slug: string, address: string) {
  toast.dismiss();
  const isOwner = await isProjectOwner(slug, address);
  if (isOwner != true)
    return { success: false, message: "Only owner can publish the launchpad" };

  const _draftDoc = doc(firestore, `Projects/${slug}/Launchpad/draft`);
  const _savedDraft = await getDoc(_draftDoc);

  if (_savedDraft.exists() == false)
    return { success: false, message: "Review your draft settings" };

  const _doc = doc(firestore, `Projects/${slug}/Launchpad/published`);

  await setDoc(
    _doc,
    { ..._savedDraft.data(), publishTimeStamp: new Date().toISOString() },
    { merge: true }
  );
  return { success: true, message: "Launchpad published" };
}
