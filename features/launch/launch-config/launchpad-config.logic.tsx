import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import toast from "react-hot-toast";

import { firebaseApp } from "@/lib/firebase";

import { storage } from "@/components/nft/UploadElement";

import { IProject } from "@/interfaces";
import { isProjectOwner } from "@/utils/authentication";

const firestore = getFirestore(firebaseApp);

export default async function saveLaunchPadDraft(
  project: IProject,
  field: string,
  value: string | boolean | { title: string; description: string }[] | string[]
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
      `Projects/${project.slug}/Contract-Maker/draft`
    );
    await setDoc(_doc, data, { merge: true });
    return true;
  } catch (error) {
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

export async function handleLaunchImageUpload(
  project: IProject,
  file: File,
  session: "draft" | "published",
  fileName: string
) {
  deleteFile(project, session, fileName);

  return new Promise(function (resolve, reject) {
    if (!file) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(
      storage,
      `/projects/${project.slug}/Launchpad/${session}/${fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(percent);

        // update progress
        // setPercent(percent);
      },
      (err) => console.log(err),
      async () => {
        // download url
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          resolve(url);
          return url;
        });
      }
    );

    // const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref).then(
    //   (url) => {
    //     console.log(url);
    //     return url;
    //   }
    // );
  });
}

async function deleteFile(
  project: IProject,
  session: "draft" | "published",
  fileName: string
) {
  try {
    // Create a reference to the file to delete
    const fileRef = ref(
      storage,
      `/projects/${project.slug}/Launchpad/${session}/${fileName}`
    );

    // Delete the file
    deleteObject(fileRef)
      .then(() => {
        // File deleted successfully
        return;
      })
      .catch((error) => {
        return error;
        // Uh-oh, an error occurred!
      });
  } catch (error) {
    console.log(error);
  }
}
