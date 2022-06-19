import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";

import { firebaseApp } from "@/lib/firebase";

import TraitPreview from "./TraitPreview";

export const firestore = getFirestore(firebaseApp);

const NewProperty = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const { account, logout, isAuthenticated } = useMoralis();

  const fileInput = useRef<HTMLInputElement>(null);
  const [propertyName, setPropertyName] = useState<string>("");

  function handleFileChanged(evt: ChangeEvent<HTMLInputElement>) {
    const fileListArray: File[] = [];
    const files: FileList | null = evt.target.files;
    if (files !== null) {
      for (let index = 0; index < files.length; index++) {
        fileListArray.push(files[index]);
      }
      setFiles(fileListArray);
    }
  }

  function openFileInput() {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  function discardProperty() {
    setPropertyName("");
    setFiles([]);
  }
  /**
   * saves entered property name
   * saves uploaded trait files
   *
   * @returns {undefined}
   */
  async function saveProperty() {
    if (router.query)
      // todo: save Property name and uploaded trait files
      toast("Saving");

    const project = router.query?.name?.toString().toLowerCase();

    if (!account || !project) return;

    try {
      const _layer = {
        name: propertyName,
        blendmode: "source-over",
        opacity: 1,
        bypassDNA: false,
      };

      const _doc = doc(
        firestore,
        `art-engine/users/${account}/${project}/layers/${propertyName}`
      );
      await setDoc(_doc, _layer);
      toast.dismiss();
      toast.success("Saved");
    } catch (error) {
      console.log(error);
    }
  }

  function removeTrait(traitIndex: number) {
    const newList: File[] = [...files];
    newList.splice(traitIndex, 1);
    setFiles(newList);
  }

  return (
    <div className="rounded-xl border border-[color:var(--border-gray)] bg-[color:var(--bg-gray)] p-6">
      <div className="flex flex-col gap-3">
        <label htmlFor="newProperty" className="font-semibold">
          New Property
        </label>
        <input
          type="text"
          placeholder="Name"
          value={propertyName}
          onChange={(evt) => setPropertyName(evt.target.value)}
          className="rounded-sm border-[color:var(--border-gray)]"
          id="newProperty"
        />
      </div>
      <div
        className="relative mt-8 mb-4 w-full overflow-hidden rounded-md border-2 border-dashed border-[color:var(--indigo)] bg-[color:var(--bg-indigo)] py-2 hover:cursor-pointer"
        onClick={openFileInput}
      >
        <div className="bg-indigo hover:bg-indigo-dark flex w-full items-center justify-center py-2 px-4 font-bold text-[color:var(--blue)]">
          <svg
            className="rotate-180 transform "
            fill="#30489C"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
          </svg>
          <span className="ml-2">Add your traits here</span>
        </div>
        <input
          className="pin-r pin-t absolute block cursor-pointer opacity-0"
          type="file"
          onChange={handleFileChanged}
          multiple
          accept="image/*"
          ref={fileInput}
        />
      </div>
      {files.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-6 rounded-md p-6 pb-0">
          {Array.from(files).map((file: any, index: number) => (
            <TraitPreview
              file={file}
              key={index}
              traitIndex={index}
              onRemove={removeTrait}
            />
          ))}
        </div>
      )}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          className="max-w-[130px] flex-1 rounded-md bg-[color:var(--blue)] py-2 text-white"
          onClick={discardProperty}
        >
          Discard
        </button>
        <div
          className="max-w-[130px] flex-1 rounded-md bg-[color:var(--blue)] py-2 text-white"
          onClick={saveProperty}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default NewProperty;
