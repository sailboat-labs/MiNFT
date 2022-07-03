/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeElementCount,
  selectTraitForPreview,
} from "redux/reducers/slices/layers";
import swal from "sweetalert";

import { IElement } from "@/interfaces";

import DeleteTraitModal from "./DeleteTraitModal";

interface AppProps {
  active?: boolean;
  traitIndex: number;
  file: IElement;
  rarityMode?: boolean;
  onRemove?: (traitIndex: number) => void;
}

const TraitPreview: FC<AppProps> = ({
  file,
  traitIndex,
  active = false,
  rarityMode = false,
  onRemove,
}) => {
  // const url = typeof file === "string" ? file : URL.createObjectURL(file);
  const dispatch = useDispatch();
  const [rarity, setRarity] = useState<number>(0);
  /**
   * handles removal of trait
   *
   * @param evt - MouseEvent object
   * @returns {undefined}
   */
  function handleRemoveTrait(evt: React.MouseEvent<SVGSVGElement>) {
    evt.stopPropagation();
    if (onRemove) {
      swal({
        title: "Warning",
        text: "You are deleting a trait. Action is irreversible.\n Do you want to continue?",
        icon: "warning",
        dangerMode: true,
        buttons: ["Cancel", "Ok"],
      }).then((value) => {
        if (value) {
          onRemove(traitIndex);
        }
      });
    }
  }
  /**
   * handles changes in range input
   *
   * @param {Object} evt - React's ChangeEvent object
   * @returns {undefined}
   */
  function onRangeChanged(evt: React.ChangeEvent<HTMLInputElement>) {
    setRarity(parseFloat(evt.target.value));
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`text-xs font-semibold text-[#30489C] transition-all ${
          active && !rarityMode ? "opacity-100" : "opacity-0"
        }`}
      >
        Preview
      </div>

      <div
        className={`${
          active && "border-[#30489C]"
        } group relative w-fit transform rounded-lg border-2  bg-gray-50 transition-all duration-150 hover:cursor-pointer hover:border-[#30489C] ${
          rarityMode && "scale-100"
        }`}
      >
        {/* <TraitContextMenu /> */}

        <DeleteTraitModal trait={file} />

        <div
          onClick={() => {
            dispatch(
              selectTraitForPreview({
                layer: file.name,
                elementName: file.filename,
              })
            );
          }}
          className="h-[76px] w-[76px] overflow-hidden rounded-md"
        >
          <img
            src={file.path}
            // alt="file preview"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      {!rarityMode && (
        <div className="w-20 overflow-hidden text-xs text-gray-600">
          {file.filename?.toString().split(".")[0]}
        </div>
      )}
      {rarityMode && (
        <div className="flex flex-col items-center">
          <div className="mt-2 flex gap-2">
            {/* <input type="number" step={0.1} /> */}
            <input
              className="max-w-[60px] flex-1"
              type="range"
              onChange={onRangeChanged}
              value={rarity}
              step={20}
              min={0}
              max={100}
            />
            <output className=" text-xs">{rarity}%</output>
          </div>
          <input
            className="mt-4 w-20 rounded border-none bg-gray-50"
            value={file.count}
            min={0}
            onChange={(e) => {
              dispatch(
                changeElementCount({
                  layerName: file.trait,
                  elementName: file.filename,
                  newCount: isNaN(parseInt(e.target.value))
                    ? 0
                    : parseInt(e.target.value ?? "0"),
                })
              );
            }}
            type="number"
          />
        </div>
      )}
    </div>
  );
};

export default TraitPreview;
