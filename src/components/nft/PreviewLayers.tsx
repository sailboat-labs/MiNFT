/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPreviewLayers } from "redux/reducers/selectors/layers";

import { ILayer } from "@/interfaces";

const traitNotVisibleAnim = {
  transform: "translateX(-100%)",
  opacity: 0.1,
};

const PreviewLayers = () => {
  const dispatch = useDispatch();
  const previewLayers = useSelector(getPreviewLayers);

  return (
    <section>
      {/* <FlipMove
      enterAnimation={{
        from: {
          transform: "translateX(-100%)",
          opacity: "0.1",
        },
        to: {},
      }}
      leaveAnimation={{
        from: {},
        to: {
          transform: "translateX(100%)",
          opacity: "0.1",
        },
      }}
      > */}
      {previewLayers.map((layer: ILayer, index: number) => (
        <div
          className="flex gap-4 border-b border-gray-200 px-3 py-4"
          key={index}
        >
          <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-50">
            <img
              className="h-full w-full object-cover"
              src={layer.elements[0].path}
              alt={layer.elements[0].filename}
            />
          </div>
          <div className="flex-1">
            <strong>{layer.name}</strong>
            <p>{layer.elements[0].name}</p>
          </div>
          <button
            // onClick={() => dispatch(removePreviewLayer(layer.name))}
            className="group flex h-8 w-8 items-center justify-center self-center rounded-full bg-red-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="duration-250 h-4 w-4 fill-red-500 transition-all group-hover:h-5 group-hover:w-5"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
      {/* </FlipMove> */}
    </section>
  );
};

export default PreviewLayers;
