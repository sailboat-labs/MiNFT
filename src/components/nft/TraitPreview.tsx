/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getLayers } from "redux/reducers/selectors/layers";
import {
  changeElementCount,
  selectTraitForPreview,
} from "redux/reducers/slices/layers";
import swal from "sweetalert";

import { IElement } from "@/interfaces";
import { getMaximumSupply } from "@/utils/module_utils/nft";

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
  const layers = useSelector(getLayers);
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
  function onRangeChanged(e: React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) > getMaximumSupply(layers)) return;
    if (parseInt(e.target.value) > getMaximumSupply(layers)) {
      dispatch(
        changeElementCount({
          layerName: file.trait,
          elementName: file.filename,
          newCount: getMaximumSupply(layers),
        })
      );
      return toast.error(`Maximum can be ${getMaximumSupply(layers)}`);
    }
    dispatch(
      changeElementCount({
        layerName: file.trait,
        elementName: file.filename,
        newCount: isNaN(parseInt(e.target.value))
          ? 0
          : parseInt(e.target.value ?? "0"),
      })
    );
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
            {/* <input
              className="max-w-[60px] flex-1"
              type="range"
              onChange={onRangeChanged}
              value={file.count}
              step={20}
              min={0}
              max={100}
            /> */}
            <output className=" text-xs">
              {parseFloat(
                (
                  (parseInt(file.count?.toString() ?? "0") /
                    getMaximumSupply(layers)) *
                  100
                ).toFixed(2)
              )}
              %
            </output>
          </div>
          <input
            className="mt-4 w-20 rounded border-none bg-gray-50"
            value={file.count}
            min={0}
            max={getMaximumSupply(layers)}
            onChange={(e) => {
              if (parseInt(e.target.value) > getMaximumSupply(layers)) {
                dispatch(
                  changeElementCount({
                    layerName: file.trait,
                    elementName: file.filename,
                    newCount: getMaximumSupply(layers),
                  })
                );
                return toast.error(
                  `Maximum can be ${getMaximumSupply(layers)}`
                );
              }
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
