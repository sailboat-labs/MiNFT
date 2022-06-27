import { getFirestore } from "firebase/firestore";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPreviewLayers,
  getSelectedLayerName,
} from "redux/reducers/selectors/layers";
import {
  reOrderLayer,
  setSelectedLayerName,
} from "redux/reducers/slices/layers";

import { firebaseApp } from "@/lib/firebase";

import { ILayer } from "@/interfaces";

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
const firestore = getFirestore(firebaseApp);

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

  const previewLayers = useSelector(getPreviewLayers);

  function onDisplayNameClick(evt: React.MouseEvent<HTMLDivElement>) {
    evt.stopPropagation();
    setEditName(true);
  }

  /**
   * updates group name
   *
   * @returns {undefined}
   */
  // function saveGroupName() {
  //   if (groupName === name) {
  //     setEditName(false);
  //     return;
  //   }

  //   setShowEmptyNameError(groupName.trim() === "");
  //   if (!showEmptyNameError) return;

  //   // todo: code to update name goes here
  //   // - state "groupName" has the most up to date version of name
  //   console.log("updating group name");
  // }
  /**
   * handles changes in group name
   *
   * @param evt - react ChangeEvent object
   * @returns {undefined}
   */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    // setGroupName(evt.target.value);
    // setShowEmptyNameError(groupName.trim() === "");
  }
  /**
   * checks if group's trait rarity is being changed
   *
   * @returns {boolean} - flag indicating whether groups trait rarity is being changed
   */
  function changingRarity(): boolean {
    if (selectedLayerName === null) return false;

    return layer.name === selectedLayerName;
  }
  /**
   * deletes trait at @param traitIndex -index
   *
   * @param {number} traitIndex - index of trait to delete
   */
  function removeTrait(traitIndex: number) {
    alert("File: PropertyGroup, line 77");
    // todo: code to remove a trait goes here
  }

  function updateLayer() {
    console.log("update layer");
  }
  /**
   * moves layer up or down the hierarchy
   *
   * @param {boolean} up - flag to move layer up or down
   * @returns {undefined}
   */
  function moveLayer(isMoveUp: boolean, index: number) {
    if (isMoveUp) {
      console.log(name, "wants to move up to", --index);

      dispatch(reOrderLayer({ currentIndex: index, nextIndex: ++index }));
    } else {
      console.log(name, "wants to move down to", ++index);
      dispatch(reOrderLayer({ currentIndex: index, nextIndex: --index }));
    }
  }

  useEffect(() => {
    setAccordionHeight(accordionContent.current?.scrollHeight);
  }, [selectedLayerName]);

  // useEffect(() => {
  //   if (selectedLayerName !== null) {
  //     setCollapsed(!(selectedLayerName === groupName));
  //   }
  // }, selectedLayerName);

  return (
    <div className="flex gap-6" id={`trait-group-${name}`}>
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
          className="flex items-end justify-between bg-white"
          // onClick={() => setCollapsed(!collapsed)}
        >
          <div className="relative mt-5 flex items-center  gap-4 py-2">
            {/* input control */}
            {editName ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={layer.name}
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
                  // onClick={() => setGroupName("")}
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
                  strokeWidth={2}
                  // onClick={() => saveGroupName()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3"
                  />
                </svg>
              </div>
            ) : (
              // display content
              <>
                <div
                  className="flex items-center gap-2 rounded-md   bg-[#30489C] px-4 py-1 text-base text-white"
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
                <span className="text-sm text-gray-700">
                  {elements?.length} variation{elements?.length == 1 ? "" : "s"}
                </span>
              </>
            )}
          </div>

          {/* Rarity button */}
          <button
            onClick={() => dispatch(setSelectedLayerName(layer.name))}
            className={`my-2 flex items-center gap-1 rounded-md border border-indigo-600 px-4 py-1 text-base font-medium text-indigo-600 ${
              changingRarity() && "bg-[#30489C] !text-white"
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
        </div>
        <div
          style={{
            maxHeight: collapsed ? 0 : accordionHeight + "px",
          }}
          className="overflow-y-hidden transition-all  duration-200"
          ref={accordionContent}
        >
          <div className="rounded-md border-2 bg-gray-100">
            <div className={`mt-5 flex flex-wrap gap-6    p-6 `}>
              {elements.map((element: any, index: number) => (
                <TraitPreview
                  key={index}
                  file={element}
                  traitIndex={index}
                  rarityMode={layer.name === selectedLayerName}
                  onRemove={removeTrait}
                  active={
                    previewLayers.find(
                      (item: { layer: string; element: string }) =>
                        item.layer == layer.name
                    )?.element == element.path
                  }
                />
              ))}
            </div>
            {changingRarity() && (
              <div className="mb-4  flex items-center justify-center gap-x-4 px-6">
                <button
                  className="rounded-md border border-[#30489c] bg-white  px-6 py-2 font-medium text-[#30489C] transition-all duration-100 hover:bg-[#30479c09]"
                  onClick={() => dispatch(setSelectedLayerName(null))}
                >
                  Discard
                </button>
                <button
                  onClick={() => updateLayer()}
                  className="rounded-md bg-[#30489C] px-6 py-2 text-white transition-all  duration-100 hover:bg-[#223474]"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGroup;
