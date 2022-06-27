/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addPreviewLayer } from "redux/reducers/slices/layers";
import swal from "sweetalert";

import { IElement } from "@/interfaces/get-started";

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
  const [rarity, setRarity] = useState<number>();
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
    setRarity(parseInt(evt.target.value));
  }

  return (
    <div
      className="flex flex-col items-center justify-center"
      onClick={() => {
        dispatch(addPreviewLayer({ layer: file.name, element: file.path }));
      }}
    >
      <div
        className={`text-xs font-semibold text-[#30489C] ${
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
        <svg
          xmlns="http://www.w3.org/1200/svg"
          className="absolute -left-2 -top-2 h-6 w-6 rotate-45 scale-0  transform rounded-full bg-white p-1 shadow-md transition duration-150 hover:rotate-[135deg] hover:cursor-pointer hover:border hover:border-gray-200 hover:shadow-none group-hover:scale-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={handleRemoveTrait}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <div className="h-[76px] w-[76px] overflow-hidden rounded-md">
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
        <div className="mt-2 flex gap-2">
          <input
            className="max-w-[60px] flex-1"
            type="range"
            onChange={onRangeChanged}
            value={rarity}
            step={20}
            min={0}
            max={100}
          />
          <output className="text-xs">{rarity}</output>
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
