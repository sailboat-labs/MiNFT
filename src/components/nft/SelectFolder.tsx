import addLayersToFirebase from "features/traitmixer/components/index.logic";
import { handleUpload } from "features/traitmixer/components/PropertyGroup/upload-element";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProjectState } from "redux/reducers/selectors/project";
import { setLayers } from "redux/reducers/slices/layers";

import { DEMO_PROJECT } from "@/data/DemoProject";

import { IProject } from "@/interfaces";

import NewProperty from "./NewProperty";

import { NFTLayer } from "@/types";

type props = {
  className?: string;
};

export default function SelectFolder({ className }: props) {
  const [isOpen, setIsOpen] = useState(true);
  const toastId = useRef(null);
  const [currentStep, setCurrentStep] = useState<
    "select-folder" | "new-property"
  >("select-folder");
  const _layers: any[] = [];
  const layers: NFTLayer[] = [];
  const dispatch = useDispatch();
  const project = useSelector(getProjectState) as IProject;

  let demoProject;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const store = useSelector((state) => state) as any;
  const layersState = store.layersReducer;

  useEffect(() => {
    if (layersState.layers.length > 1) return closeModal();
    return openModal();
  }, [layersState]);

  function getMaximumSupply() {
    let maxSupply = 1;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].elements?.length > 0) {
        maxSupply *= layers[i].elements.length;
      }
    }
    return maxSupply;
  }

  async function viewAllFiles() {
    const options = {
      types: [
        {
          description: "Images",
          accept: {
            "image/png": ".png",
          },
        },
      ],
      // excludeAcceptAllOption: true,
    };
    try {
      const directoryHandle = await (window as any).showDirectoryPicker(
        options
      );

      await listAllFilesAndDirs(directoryHandle);

      for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
        const layer = layers[layerIndex];

        const elements: any[] = [];

        for (let index = 0; index < layer.elements?.length; index++) {
          const element = layer.elements[index];
          const path = await handleUpload(
            project,
            layerIndex.toString(),
            element.file,
            toastId
          );

          const uploadedElements = {
            id: index,
            sublayer: false,
            weight:
              getMaximumSupply() / layer.elements.length > 100
                ? 10
                : getMaximumSupply() / layer.elements.length ?? 0,
            blendmode: "source-over",
            opacity: 1,
            name: layer.name,
            filename: `${element.file.name}`,
            path: path,
            zindex: "",
            trait: layer.name,
            traitValue: layer.name,
            isWeightTouched: false,
          };

          elements.push(uploadedElements);
        }

        const outputLayer = {
          id: layerIndex,
          name: layer.name,
          blendmode: "source-over",
          opacity: 1,
          bypassDNA: false,
          elements: elements,
        };

        _layers.push(outputLayer);
      }

      // dispatch(setLayers(_layers));
      toast.dismiss();
      toast("Generating thumbnails");
      await addLayersToFirebase(_layers, project);
      toast.dismiss();
      toast.success("Layer Saved");
    } catch (e) {
      console.log(e);
    }
  }

  async function listAllFilesAndDirs(dirHandle: any): Promise<any> {
    const files = [];
    for await (const [name, handle] of dirHandle) {
      const { kind } = handle;

      if (handle.kind === "directory") {
        files.push({ name, handle, kind });
        layers.push({
          name: handle.name,
          elements: [...(await listAllFilesAndDirs(handle))],
        });
        files.push(...(await listAllFilesAndDirs(handle)));
      } else {
        const file = await handle.getFile();

        files.push({ name, handle, kind, file });
      }
    }

    // dispatch(setLayers(_layers));

    return files;
  }

  return (
    <div className={`flex h-[40rem] items-center justify-center  ${className}`}>
      <div
        className={`absolute z-[2] w-full max-w-md transform overflow-hidden rounded-2xl border-2 bg-white p-6 text-left align-middle transition-all duration-300 dark:bg-[color:var(--dark)] ${
          currentStep != "select-folder"
            ? "pointer-events-none -translate-x-[150%] opacity-30"
            : "pointer-events-auto translate-x-0 opacity-100"
        }`}
      >
        <div className="text-lg font-medium leading-6 text-gray-900">
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
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          Let&apos;s get started
        </div>
        <div className="mt-4 flex w-full ">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-3 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => {
              dispatch(setLayers(DEMO_PROJECT));
            }}
          >
            Try with a demo project
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
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className="my-5 h-1 flex-1 rounded-xl border-2 "></div>

        <div className="text-lg font-medium leading-6 text-gray-900">
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
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          Select a project folder
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Select a folder to import. Selected folder should contain a folder
            for each trait with a file for each trait variation
          </p>
        </div>

        <div className="mt-4 flex w-full ">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => {
              viewAllFiles();
            }}
          >
            Select Folder
          </button>
        </div>

        <div className="my-5 h-1 flex-1 rounded-xl border-2 "></div>
        <p className="text-lg font-medium leading-6 text-gray-900">
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Add Layers and traits manually
        </p>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Add a new layer and select traits for them. More can be added later
          </p>
        </div>
        <div className="mt-4 flex w-full">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => {
              setCurrentStep("new-property");
            }}
          >
            Add New Layer
          </button>
        </div>
      </div>

      <div
        className={`w-2/5 transition-all duration-500 ${
          currentStep == "new-property"
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-52 opacity-0"
        }`}
      >
        <NewProperty
          onDiscard={() => {
            setCurrentStep("select-folder");
          }}
        />
      </div>
    </div>
  );
}
