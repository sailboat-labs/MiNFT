/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { doc, getDoc, setDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import React, { FC, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getConfiguration } from "redux/reducers/selectors/configuration";
import { getLayers } from "redux/reducers/selectors/layers";
import {
  changeElementCount,
  selectTraitForPreview,
} from "redux/reducers/slices/layers";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";
import { IElement, ILayer } from "@/interfaces";
import { getMaximumSupply } from "@/utils/module_utils/nft";

import DeleteTraitModal from "./DeleteTraitModal";
import { firestore } from "./NewProperty";

interface AppProps {
  active?: boolean;
  traitIndex: number;
  layer: ILayer;
  file: IElement;
  rarityMode?: boolean;
  onRemove?: (traitIndex: number) => void;
}

const TraitPreview: FC<AppProps> = ({
  file,
  traitIndex,
  active = false,
  rarityMode = false,
  layer,
  onRemove,
}) => {
  const dispatch = useDispatch();
  const [rarity, setRarity] = useState<number>(0);
  const layers = useSelector(getLayers);
  const configuration = useSelector(getConfiguration);
  const router = useRouter();
  const debouncedChangeHandler = useMemo(
    () => debounce(updateRarityOnFirestore, 500),
    []
  );

  async function updateRarityOnFirestore() {
    //

    try {
      let _elementsFromFirebase: any[] = [];
      const _doc = doc(
        firestore,
        `Projects/${router.query.project}/Layers/${layer.id}`
      );
      const _getDoc = getDoc(_doc);
      _elementsFromFirebase = (await _getDoc).data()?.elements;

      layer.elements.forEach(async (element) => {
        console.log(
          "old weight:",
          _elementsFromFirebase.find((item) => item.id == element.id).weight,
          "new weight",
          element.weight
        );

        _elementsFromFirebase.find((item) => item.id == element.id).weight =
          element.weight;
      });

      setDoc(
        _doc,
        {
          elements: _elementsFromFirebase,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnRarityChanged(value: any) {
    if (parseInt(value) > getMaximumSupply(layers)) {
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
        newCount: isNaN(parseInt(value)) ? 0 : parseInt(value ?? "0"),
      })
    );
    debouncedChangeHandler();
  }

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`text-xs font-semibold text-[#30489C] transition-all dark:text-white ${
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
        <div className="w-20 overflow-hidden text-center text-xs text-gray-600 dark:text-gray-300">
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
              value={file.weight}
              step={20}
              min={0}
              max={100}
            /> */}
            <output className=" text-xs">
              {parseFloat(
                (
                  (parseInt(file.weight?.toString() ?? "0") /
                    configuration[enumNFTGenConfig.SUPPLY]) *
                  100
                ).toFixed(2)
              )}
              %
            </output>
          </div>
          <input
            className="mt-4 w-20 rounded border-none bg-gray-50"
            value={file.weight}
            min={0}
            max={getMaximumSupply(layers)}
            onChange={(e) => {
              handleOnRarityChanged(e.target.value);
            }}
            type="number"
          />
        </div>
      )}
    </div>
  );
};

export default TraitPreview;
