import { handleUpload } from "features/traitmixer/components/PropertyGroup/upload-element";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getConfiguration } from "redux/reducers/selectors/configuration";
import {
  getLayers,
  getSelectedLayerName,
} from "redux/reducers/selectors/layers";
import { getProjectState } from "redux/reducers/selectors/project";
import {
  addTraitsToLayer,
  changeLayerName,
  reOrderLayer,
  setSelectedLayerName,
} from "redux/reducers/slices/layers";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";
import { IElement, ILayer, IProject } from "@/interfaces";

import LayerContextMenu from "./LayerContextMenu";
import TraitPreview from "./TraitPreview";

interface AppProps {
  layer: ILayer;
  index: number;
  layersCount: number;
  elements: any[];
  onChange?: ({
    groupName,
    traitIndex,
  }: {
    groupName: string;
    traitIndex: number;
  }) => void;
}

const PropertyGroup: FC<AppProps> = ({
  layer,
  layersCount,
  onChange,
  index,
  elements,
}) => {
  const dispatch = useDispatch();
  const selectedLayerName = useSelector(getSelectedLayerName);

  const accordionContent = useRef<HTMLDivElement | null>(null);
  const [editName, setEditName] = useState<boolean>(false);
  const [showEmptyNameError, setShowEmptyNameError] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [accordionHeight, setAccordionHeight] = useState<number>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [newName, setNewName] = useState<string>();
  const layers = useSelector(getLayers) as ILayer[];
  const project = useSelector(getProjectState) as IProject;

  const configuration = useSelector(getConfiguration);
  const [possibleConfigCount, setPossibleConfigCount] = useState(0);

  function onDisplayNameClick(evt: React.MouseEvent<HTMLDivElement>) {
    evt.stopPropagation();
    setEditName(true);
  }

  function openFileInput() {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  async function handleFileChanged(evt: ChangeEvent<HTMLInputElement>) {
    const fileListArray: File[] = [];
    const files: FileList | null = evt.target.files;
    // console.log(files?.length);
    if (files !== null) {
      for (let index = 0; index < files.length; index++) {
        fileListArray.push(files[index]);
      }
    }

    // fileListArray.forEach((element) => {
    //   handleUpload(element);
    // });

    const elements: any[] = [];

    if (files) {
      for (let index = 0; index < fileListArray.length; index++) {
        const file = fileListArray[index];
        const downloadUrl = (await handleUpload(
          project,
          layer.id?.toString() ?? "unknown",
          file
        )) as string;
        toast(downloadUrl?.toString());

        const element: IElement = {
          id: index,
          sublayer: false,
          blendmode: "source-over",
          opacity: 1,
          name: layer.name,
          filename: `${file.name}`,
          path: downloadUrl,
          zindex: "",
          trait: layer.name,
          traitValue: file.name?.split(".")[0],
          weight: getMaximumSupply() / layer.elements.length ?? 0,
          isWeightTouched: false,
        };

        elements.push(element);
      }

      console.log({ elements });

      // elements = fileListArray.map(async (file, index) => {
      //   const downloadUrl = await handleUpload(file);

      //   return {
      //     id: index,
      //     sublayer: false,
      //     blendmode: "source-over",
      //     opacity: 1,
      //     name: layer.name,
      //     filename: `${file.name}`,
      //     path: downloadUrl,
      //     zindex: "",
      //     trait: layer.name,
      //     traitValue: file.name?.split(".")[0],
      //     weight: getMaximumSupply() / layer.elements.length ?? 0,
      //     isWeightTouched: false,
      //   };
      // });
    }

    dispatch(addTraitsToLayer({ layerName: layer.name, elements: elements }));

    console.log(elements);
  }

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setNewName(evt.target.value);
    // setShowEmptyNameError(groupName.trim() === "");
  }

  function changingRarity(): boolean {
    if (selectedLayerName === null) return false;

    return layer.name === selectedLayerName;
  }

  function removeTrait(traitIndex: number) {
    alert("File: PropertyGroup, line 77");
    // todo: code to remove a trait goes here
  }

  function updateLayer() {
    console.log("update layer");
  }

  function moveLayer(isMoveUp: boolean, index: number) {
    if (isMoveUp) {
      console.log(name, "wants to move up to", --index);

      dispatch(reOrderLayer({ currentIndex: index, nextIndex: ++index }));
    } else {
      console.log(name, "wants to move down to", ++index);
      dispatch(reOrderLayer({ currentIndex: index, nextIndex: --index }));
    }
  }

  function getElementCountTotal() {
    let total = 0;
    layer.elements.forEach((element: IElement) => {
      total += element.weight ?? 0;
    });
    return total;
  }

  function getMaximumSupply() {
    let maxSupply = 1;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].elements?.length > 0) {
        maxSupply *= layers[i].elements.length;
      }
    }
    return maxSupply;
  }

  useEffect(() => {
    // const _possibleConfig = generateTokensDNA(layers);
    // setPossibleConfigCount(new Set(_possibleConfig).size);

    setAccordionHeight(accordionContent.current?.scrollHeight);
  }, [selectedLayerName, elements, configuration, layers]);

  // useEffect(() => {
  //   if (selectedLayerName !== null) {
  //     setCollapsed(!(selectedLayerName === groupName));
  //   }
  // }, selectedLayerName);

  return (
    <div className="flex gap-6" id={`trait-group-${name} h-fit`}>
      <div className="mt-20 flex flex-col items-center justify-center text-gray-500">
        {index > 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform cursor-pointer duration-100 hover:-translate-y-2"
            viewBox="0 0 20 20"
            fill="gray"
            onClick={() => moveLayer(true, index)}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        Move
        {index < layersCount - 1 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform cursor-pointer duration-100 hover:translate-y-2"
            viewBox="0 0 20 20"
            fill="gray"
            onClick={() => moveLayer(false, index)}
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <div className="flex-1">
        {/* header */}
        <div
          className="flex items-end justify-between bg-white dark:bg-[color:var(--dark)]"
          // onClick={() => setCollapsed(!collapsed)}
        >
          <div className="relative mt-5 flex items-center  gap-4 py-2">
            {/* input control */}
            {editName ? (
              <div className="flex items-center">
                <input
                  type="text"
                  defaultValue={layer.name}
                  onChange={handleChange}
                  className="rounded-md border border-[#30489C] py-1 text-sm"
                />
                {showEmptyNameError && (
                  <small className="absolute top-full -mt-1 text-xs text-red-500">
                    Group name is required
                  </small>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-1 h-4 w-4 cursor-pointer duration-100 hover:scale-125"
                  viewBox="0 0 20 20"
                  fill="gray"
                  onClick={() => setEditName(false)}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-1 h-4 w-4 cursor-pointer duration-100 hover:scale-125"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="gray"
                  strokeWidth="2"
                  onClick={() => {
                    dispatch(
                      changeLayerName({
                        currentName: layer.name,
                        newName: newName,
                      })
                    );
                    setEditName(false);
                    toast.success("Layer name changed");
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : (
              // display content
              <>
                <div
                  className="flex items-center gap-2 rounded-md   bg-[#30489C] px-4 py-1 text-base text-white dark:text-gray-200"
                  onClick={onDisplayNameClick}
                >
                  <span>{layer.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 translate-x-2 transform cursor-pointer duration-100 hover:scale-125"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  {elements?.length} variation{elements?.length == 1 ? "" : "s"}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {getElementCountTotal() !=
              configuration[enumNFTGenConfig.SUPPLY] && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
            {/* Rarity button */}
            {elements.length > 0 && (
              <button
                onClick={() => {
                  if (changingRarity()) {
                    return dispatch(setSelectedLayerName(null));
                  }
                  dispatch(setSelectedLayerName(layer.name));
                }}
                className={`my-2 flex items-center gap-1 rounded-md border border-indigo-600 px-4 py-1 text-base font-medium text-indigo-600 ${
                  changingRarity() &&
                  "bg-[#30489C] !text-white dark:text-gray-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Change rarity
              </button>
            )}
            <LayerContextMenu layer={layer} />
          </div>
        </div>
        <div
          style={{
            maxHeight: collapsed ? 0 : accordionHeight + "px",
          }}
          className="overflow-y-hidden transition-all  duration-200"
          ref={accordionContent}
        >
          <div className="rounded-md border-2 bg-gray-100">
            <div className="flex items-center gap-3">
              <div
                className={`flex flex-wrap gap-6 p-6 transition-all ${
                  elements.length < 1 ? "mt-0" : "mt-0"
                }`}
              >
                {elements.map((element: IElement, index: number) => (
                  <TraitPreview
                    key={index}
                    file={element}
                    traitIndex={index}
                    rarityMode={layer.name === selectedLayerName}
                    onRemove={removeTrait}
                    active={element.isSelected}
                  />
                ))}

                {elements.length < 1 && (
                  <div className=" flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 rounded-full border-2 border-red-500 bg-red-200 p-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="red"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    No element added
                  </div>
                )}
              </div>
              <div
                className="mr-5 h-10 w-10 cursor-pointer rounded-full border-2 bg-gray-100 p-2 transition-all hover:scale-105"
                onClick={openFileInput}
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
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
                <input
                  className="pin-r pin-t pointer-events-none absolute block cursor-pointer opacity-0"
                  type="file"
                  onChange={handleFileChanged}
                  multiple
                  accept="image/*"
                  ref={fileInput}
                />
              </div>
            </div>
            {changingRarity() &&
              getElementCountTotal() !=
                configuration[enumNFTGenConfig.SUPPLY] && (
                <div className="mb-4  flex w-full gap-x-4 px-6">
                  <div className="rounded bg-red-100 px-5 py-2 text-sm text-red-500">
                    Total element counts must equal{" "}
                    {configuration[enumNFTGenConfig.SUPPLY]} (currently{" "}
                    {getElementCountTotal()})
                  </div>
                </div>
              )}

            {/* {changingRarity() &&
              possibleConfigCount < configuration[enumNFTGenConfig.SUPPLY] && (
                <div className="mb-4  flex w-full gap-x-4 px-6">
                  <div className="rounded bg-red-100 px-5 py-2 text-sm text-red-500">
                    Your current configuration can produce up to{" "}
                    {possibleConfigCount} (instead of{" "}
                    {configuration[enumNFTGenConfig.SUPPLY]})
                  </div>
                </div>
              )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGroup;
