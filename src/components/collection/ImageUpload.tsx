/* eslint-disable @next/next/no-img-element */

import { Transition } from "@headlessui/react";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import parse from "url-parse";
import { v4 } from "uuid";

import { firebaseApp } from "@/lib/firebase";

type IImageUploadProps = {
  className?: string;
  imageUrl?: string;
  setImageUrl: Dispatch<SetStateAction<string | undefined>>;
};

const storage = getStorage(firebaseApp);

const ImageUpload = ({
  className,
  imageUrl,
  setImageUrl,
}: IImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [percentageComplete, setPercentageComplete] = useState(0);

  async function deleteFile() {
    if (imageUrl) {
      const parts = parse(imageUrl, true);
      const name = parts.pathname.split("%2F").pop();

      // Create a reference to the file to delete
      const fileRef = ref(storage, `images/collections/${name}`);

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
    }
  }

  async function uploadFile(acceptedFiles: File[]) {
    try {
      if (imageUrl) await deleteFile();

      const file = acceptedFiles[0];
      const name = v4() + "." + file.type.split("/").pop();

      setUploading(true);
      setPercentageComplete(0);

      const storageRef = ref(storage, `images/collections/${name}`);

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
          setImageUrl(downloadUrl);
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
    toast.promise(uploadFile(acceptedFiles), {
      loading: "Uploading...",
      success: <b>Upload Successful!</b>,
      error: <b>Could not upload file</b>,
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`relative ${className}`}>
      <div
        className={`flex justify-center rounded-lg bg-gray-100 ${
          imageUrl ? "w-fit h-fit" : "w-full h-36"
        }`}
      >
        <input {...getInputProps()} name="file" />
        {imageUrl && (
          <img
            className="translate h-36 w-36 rounded-lg  object-cover"
            src={imageUrl}
            alt=""
          />
        )}

        {!imageUrl && (
          <div className="flex flex-col items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="mt-4 rounded-full bg-black bg-opacity-50 px-3 py-1 text-white shadow-md">
              Upload File
            </div>
          </div>
        )}
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
};

export default ImageUpload;
