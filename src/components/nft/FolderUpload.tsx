import axios from "axios";
import React, { ChangeEvent, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import { setLayers } from "redux/reducers/slices/layers";

import UploadFolderResultStructure from "./UploadFolderResultStructure";

import { NFTLayer } from "@/types";

interface AppProps {
  onUploaded?: (data: NFTLayer[]) => void;
}

const FolderUploader = ({ onUploaded }: AppProps) => {
  const dispatch = useDispatch();
  const { account } = useMoralis();
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [groupedLayers, setGroupedLayers] = useState<NFTLayer[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [layerStructure, setLayerStructure] = useState<any[]>([]);
  const [showLayerStructure, setShowLayerStructure] = useState(false);

  /**
   * manually sets html5 attributes on the input element
   */
  React.useEffect(() => {
    inputRef.current?.setAttribute("directory", "");
    inputRef.current?.setAttribute("mozDirectory", "");
    inputRef.current?.setAttribute("webkitDirectory", "");
  }, [inputRef]);
  /**
   * handles change in folder upload
   *
   * @param {ChangeEvent<HTMLInputElement>} evt - change event object
   * @returns {undefined}
   */
  function handleOnChange(evt: ChangeEvent<HTMLInputElement>): void {
    const files: FileList | null = evt.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
    // ignore if no files were uploaded
    if (files === null) return;

    const layers = Array.from(files)
      /**
       * filters all files that don't match the hierarchy parent -> layers-> traits
       */
      .filter((file: File) => file.webkitRelativePath.split("/").length === 3)
      /**
       * group files per layer ie. sub directories in parent directory
       */
      .reduce((acc: any, curr: any) => {
        (acc[curr.webkitRelativePath.split("/")[1]] =
          acc[curr.webkitRelativePath.split("/")[1]] || []).push(curr);
        return acc;
      }, {});

    setFiles(
      Array.from(files)
        /**
         * filters all files that don't match the hierarchy parent -> layers-> traits
         */
        .filter((file: File) => file.webkitRelativePath.split("/").length === 3)
    );

    // transform object into array
    let id = 1;
    const refinedData = [];
    for (const key in layers) {
      refinedData.push({
        id,
        name: key,
        elements: layers[key],
      });
      id++;
    }
    // console.log(refinedData[0].elements[0]);

    setLayerStructure(refinedData);
    setShowLayerStructure(true);
    setGroupedLayers(refinedData);
    dispatch(setLayers(refinedData));

    onLayerStructureConfirmed();

    /**
     * relay data to onUploaded function
     */
    if (onUploaded) {
      onUploaded(refinedData);
    }
  }

  /**
   * uploads files to server
   *
   * @returns {undefined}
   */
  async function onLayerStructureConfirmed() {
    if (files === null || files.length === 0) return;

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: { loaded: number; total: number }) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const accountName = account as string;

    try {
      const response = await axios.post(
        `/api/nft/files_upload?account=${accountName}`,
        formData,
        config
      );
      // console.log(response.data);
      setShowLayerStructure(false);
    } catch (err: any) {
      console.error(err.response);
    }

    formRef.current?.reset();
  }

  return (
    <form className="relative" ref={formRef}>
      <UploadFolderResultStructure
        data={layerStructure}
        open={showLayerStructure}
        setShowLayerStructure={setShowLayerStructure}
        onConfirm={onLayerStructureConfirmed}
      />

      <button
        className="gradient-button mb-8 w-full rounded-none py-6"
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        Upload Folder
      </button>
      <input
        type="file"
        autoComplete="off"
        className=" pointer-events-none absolute opacity-0"
        ref={inputRef}
        name="files"
        accept="images/png,application/svg+xml"
        onChange={handleOnChange}
      />
    </form>
  );
};

export default FolderUploader;
