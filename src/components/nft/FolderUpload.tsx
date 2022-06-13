import React, { ChangeEvent, useState } from "react";

import UploadFolderResultStructure from "./UploadFolderResultStructure";

import { NFTLayer } from "@/types";

interface AppProps {
  onUploaded?: (data: NFTLayer[]) => void;
}

const FolderUploader = ({ onUploaded }: AppProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showLayerStructure, setShowLayerStructure] = useState(false);
  const [layerStructure, setLayerStructure] = useState<any[]>([]);

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

    /**
     * relay data to onUploaded function
     */
    if (onUploaded) {
      onUploaded(refinedData);
    }
  }

  return (
    <div className="relative">
      <UploadFolderResultStructure
        data={layerStructure}
        open={showLayerStructure}
        setShowLayerStructure={setShowLayerStructure}
      />

      <button
        className="gradient-button"
        onClick={() => inputRef.current?.click()}
      >
        Upload Folder
      </button>
      <input
        type="file"
        autoComplete="off"
        className=" pointer-events-none absolute opacity-0"
        ref={inputRef}
        accept="images/png,application/svg+xml"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default FolderUploader;
