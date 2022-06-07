import { Transition } from "@headlessui/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { v4 } from "uuid";

import { firebaseApp } from "@/lib/firebase";

type IImageUploadProps = {
  className?: string;
  layerName: string;
  address: string;
  collection: string;
  // setImageUrl: Dispatch<SetStateAction<string | undefined>>;
};
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function UploadElement({
  className,
  layerName,
  address,
  collection,
}: // setImageUrl,
IImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [percentageComplete, setPercentageComplete] = useState(0);

  async function uploadFile(acceptedFiles: File[]) {
    try {
      toast("Uploading element");
      const file = acceptedFiles[0];
      const _name = v4() + "." + file.type.split("/").pop();

      setUploading(true);
      setPercentageComplete(0);

      const storageRef = ref(
        storage,
        `art-engine/${address}/${collection}/input/layers/${layerName}/${_name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentageComplete(progress);
        },
        (error) => {
          toast.error(error.code);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          // setImageUrl(downloadUrl);
          console.log(downloadUrl);

          //Upload image to firebase

          console.log(
            `art-engine/${address}/${collection}/input/elements/${_name}`
          );

          const _element = {
            sublayer: false,
            weight: 1,
            blendmode: "source-over",
            opacity: 1,
            id: 0,
            name: layerName,
            filename: _name,
            path: downloadUrl,
            zindex: "",
            trait: layerName,
            traitValue: layerName,
          };

          const _doc = doc(
            firestore,
            `art-engine/${address}/${collection}/input/elements/${_name}`
          );
          await setDoc(_doc, _element);
          toast.dismiss();
          toast.success("Element uploaded");
        }
      );
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setPercentageComplete(0);

      toast.error("Upload failed");
    }
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    uploadFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`relative ${className}`}>
      <div className="flex cursor-pointer justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
        <input {...getInputProps()} name="file" />
        <div className="flex flex-col items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>

      {/* Progress transition  */}
      <Transition
        show={uploading}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-transform duration-150"
        leaveFrom="scale-100"
        leaveTo="scale-125"
      >
        <div className="glass-effect pointer-events-none absolute inset-0">
          <div
            className="absolute left-0 top-0 h-full bg-green-300"
            style={{
              width: `${percentageComplete}%`,
              transition: "width 1s linear",
            }}
          ></div>
        </div>
      </Transition>
    </div>
  );
}
