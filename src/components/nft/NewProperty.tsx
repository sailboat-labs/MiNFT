import addLayersToFirebase from "features/traitmixer/components/index.logic";
import { handleUpload } from "features/traitmixer/components/PropertyGroup/upload-element";
import { getFirestore } from "firebase/firestore";
import React, { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getLayers } from "redux/reducers/selectors/layers";
import { getProjectState } from "redux/reducers/selectors/project";

import { firebaseApp } from "@/lib/firebase";

import { ILayer, IProject } from "@/interfaces";

export const firestore = getFirestore(firebaseApp);

type props = {
  onDiscard?: any;
  onSave?: any;
};

const NewProperty = ({ onDiscard, onSave }: props) => {
  const [files, setFiles] = useState<File[]>([]);
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);
  const [propertyName, setPropertyName] = useState<string>("");
  const layers = useSelector(getLayers);
  const toastId = useRef(null);
  const project = useSelector(getProjectState) as IProject;

  /**
   * handles change in file input
   *
   * @param evt - ChangeEvent
   * @returns {undefined}
   */
  function handleFileChanged(evt: ChangeEvent<HTMLInputElement>) {
    const fileListArray: File[] = [];
    const _files: FileList | null = evt.target.files;
    // console.log(files?.length);
    if (_files !== null) {
      for (let index = 0; index < _files.length; index++) {
        fileListArray.push(_files[index]);
      }
      setFiles([...files, ...fileListArray]);
    }
  }
  /**
   * opens file Input
   *
   * @returns {undefined}
   */
  function openFileInput() {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }
  /**
   * clears property details
   *
   * @returns {undefined}
   */
  function discardProperty() {
    setPropertyName("");
    setFiles([]);

    onDiscard && onDiscard();
  }
  /**
   * saves entered property name
   * saves uploaded trait files
   *
   * @returns {undefined}
   */
  async function saveProperty() {
    if (propertyName.length < 1) return toast.error("Add property name");

    const elements: any[] = [];

    for (let index = 0; index < files?.length; index++) {
      const element = files[index];
      const path = await handleUpload(
        project,
        (layers.length + 1).toString(),
        element,
        toastId
      );

      const uploadedElements = {
        id: index,
        sublayer: false,
        weight: 1,
        blendmode: "source-over",
        opacity: 1,
        name: propertyName,
        filename: `${element.name}`,
        path: path,
        zindex: "",
        trait: propertyName,
        traitValue: propertyName,
        isWeightTouched: false,
      };

      elements.push(uploadedElements);
    }

    const layer: ILayer = {
      name: propertyName,
      id: layers.length + 1,
      blendmode: "source-over",
      opacity: 1,
      bypassDNA: false,
      elements: elements,
    };

    const _layers: any[] = [];
    _layers.push(layer);
    toast.dismiss();
    toast("Generating thumbnails");
    await addLayersToFirebase(_layers, project);
    toast.dismiss();
    toast.success("Layer Saved");

    // dispatch(addLayer(layer));
    toast.success("New Layer Added");
    onSave && onSave();
  }

  function removeTrait(traitIndex: number) {
    const newList: File[] = [...files];
    newList.splice(traitIndex, 1);
    setFiles(newList);
  }

  return (
    <form className="w-full rounded-xl border border-[color:var(--border-gray)] bg-[color:var(--bg-gray)] p-6">
      <div className="flex flex-col gap-3">
        <label htmlFor="newProperty" className="font-semibold">
          New Layer
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
      {propertyName.length > 0 && (
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
      )}
      {/* {propertyName.length > 0 && files.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-6 rounded-md p-6 pb-0">
          {files
            .map((file, index) => ({
              id: index,
              sublayer: false,
              weight: index + 1,
              blendmode: "source-over",
              opacity: 1,
              name: propertyName,
              filename: `${file.name}`,
              path: URL.createObjectURL(file),
              zindex: "",
              trait: propertyName,
              traitValue: file.name?.split(".")[0],
            }))
            .map((file: any, index: number) => (
              <TraitPreview
                file={file}
                key={index}
                traitIndex={index}
                onRemove={removeTrait}
              />
            ))}
        </div>
      )} */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <div
          className="flex max-w-[130px] flex-1 cursor-pointer items-center justify-center rounded-md bg-[color:var(--blue)] py-2 text-white dark:text-gray-200"
          onClick={() => discardProperty()}
        >
          Discard
        </div>
        <div
          className={`flex max-w-[130px] flex-1  items-center justify-center rounded-md py-2  text-white transition-all dark:text-gray-700 ${
            propertyName.length < 1
              ? "cursor-not-allowed bg-gray-500"
              : "cursor-pointer bg-[color:var(--blue)]"
          }`}
          onClick={() => {
            propertyName.length > 1 && saveProperty();
          }}
        >
          Save
        </div>
      </div>
    </form>
  );
};

export default NewProperty;
