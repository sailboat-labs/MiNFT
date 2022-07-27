import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";

import { firebaseApp } from "@/lib/firebase";

const storage = getStorage(firebaseApp);

export async function handleUpload(file: File, toastId?: any) {
  return new Promise(function (resolve, reject) {
    if (!file) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(percent);

        if (toastId) {
          if (toastId.current === null) {
            toastId.current = toast.loading("Upload in Progress");
          } else {
            toast.update(toastId.current, {
              render: `Uploading ${file.name} (${percent}%)`,
            });
          }
        }

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
