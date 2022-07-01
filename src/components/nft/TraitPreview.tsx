/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { selectTraitForPreview } from "redux/reducers/slices/layers";
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
  const [inputMode, setInputMode] = useState(false);
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
        <div className="mt-2 flex items-center gap-2">
          {inputMode ? (
            <input
              type="number"
              className="w-[40px] flex-1 appearance-none rounded-lg py-1"
              step={0.1}
            />
          ) : (
            <div className="flex items-center gap-2">
              <input
                className="max-w-[80px] flex-1"
                type="range"
                onChange={onRangeChanged}
                value={rarity}
                step={20}
                min={0}
                max={100}
              />
            </div>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => setInputMode(!inputMode)}
          >
            <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
          </svg>
          {/* <div className="flex items-center gap-2"></div> */}
        </div>
        // <Range
        //   step={20}
        //   min={0}
        //   max={100}
        //   values={[0, 20]}
        //   onChange={(values) => console.log(values)}
        //   renderTrack={({ props, children }) => (
        //     <div
        //       {...props}
        //       className="w-full"
        //       style={{
        //         ...props.style,
        //         // height: "6px",
        //         // width: "100%",
        //         // backgroundColor: "#ccc",
        //       }}
        //     >
        //       {children}
        //     </div>
        //   )}
        //   renderThumb={({ props }) => (
        //     <div
        //       {...props}
        //       style={{
        //         ...props.style,
        //         height: "6px",
        //         width: "6px",
        //         backgroundColor: "#999",
        //       }}
        //     />
        //   )}
        // />
        // <ReactSlider
        //   className="horizontal-slider mt-3 w-full"
        //   marks={[20, 40, 60, 80, 100]}
        //   markClassName="h-2 w-[2px] bg-[#30489C]"
        //   min={0}
        //   max={100}
        //   step={20}
        //   thumbClassName="w-2 -top-2 -bottom-4 rounded-full bg-[#30489C]"
        //   trackClassName="h-2 bg-white border border-[#30489C] rounded-full "
        //   renderThumb={(props, state) => <div {...props}></div>}
        // />
      )}
    </div>
  );
};

export default TraitPreview;
