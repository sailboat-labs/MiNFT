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
  const [rarity, setRarity] = useState<number>(0);
  const [inputMode, setInputMode] = useState<boolean>(false);
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
   * handles changed in rarity number input
   *
   * @param {Object} evt - ChangeEvent Object
   * @returns {undefined}
   */
  function handleOnRarityInputed(evt: React.ChangeEvent<HTMLInputElement>) {
    const value: number = parseFloat(evt.target.value);

    setRarity(value ? Math.abs(value) : 0);
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

  function handleInputSwitch() {
    if (inputMode) {
      /**
       * get number to which current rarity is closest to [0, 20, 40, 60, 80, 100]
       * set rarity to that number
       *
       */
      const closestValue: number =
        rarity % 20 >= 10
          ? Math.ceil(rarity / 20) * 20
          : Math.floor(rarity / 20) * 20;

      setRarity(closestValue > 100 ? 100 : closestValue);
    }
    // switch input mode
    setInputMode(!inputMode);
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
        <div className="w-20 overflow-hidden text-center text-xs text-gray-600">
          {file.filename?.toString().split(".")[0]}
        </div>
      )}
      {rarityMode && (
        <div className="relative mt-3 max-w-[80px] p-2">
          <div className="flex items-center justify-between">
            <output className="text-xs">{rarity}%</output>
            <button
              className=" group relative h-4 w-6 appearance-none hover:cursor-pointer"
              onClick={handleInputSwitch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="transition-left absolute -left-[2px] bottom-0 h-5 w-5 duration-100 active:outline-none active:ring-0 group-hover:-left-[4px]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="transition-right absolute -right-[2px] top-0 h-5 w-5 duration-100 active:outline-none active:ring-0 group-hover:-right-[4px]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" h-4 w-4 transform cursor-pointer transition duration-100 hover:scale-150"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={handleInputSwitch}
            >
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg> */}
          </div>
          <div className="flex flex-col">
            {inputMode ? (
              <input
                className="!appearance-none border-0 border-b-2 border-indigo-500 bg-transparent p-0 shadow-none ring-0 invalid:border-red-400 invalid:text-red-400 focus:shadow-none focus:outline-none focus:ring-0"
                onInput={handleOnRarityInputed}
                type="number"
                step={0.1}
                max={100}
                min={0}
              />
            ) : (
              <input
                className="mt-3"
                type="range"
                onChange={onRangeChanged}
                value={rarity}
                step={20}
                min={0}
                max={100}
              />
            )}
          </div>
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
