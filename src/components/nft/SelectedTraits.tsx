/* eslint-disable @next/next/no-img-element */
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPreviewLayers } from "redux/reducers/selectors/layers";
import { deletePreviewLayer } from "redux/reducers/slices/layers";

import NFTPreview from "./NFTPreview";

export default function SelectedTraits() {
  const previewLayer = useSelector(getPreviewLayers);
  const dispatch = useDispatch();

  function removePreviewLayer(layer: any) {
    dispatch(deletePreviewLayer(layer));
  }

  return (
    <div
      className={`flex pl-3 pt-0 transition-all  ${
        previewLayer.length < 1
          ? "pointer-events-none -mt-14 opacity-0"
          : "pointer-events-auto mt-0 opacity-100"
      }`}
    >
      <NFTPreview />

      <div className="w-full">
        <div className="border-y bg-gray-100 py-2 px-2">Traits</div>
        <div className="px-5">
          {previewLayer.map(
            (item: { layer: string; element: string }, index: number) => (
              <div
                className="mt-5 flex w-full items-center justify-between gap-5"
                key={index}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.element}
                    alt=""
                    className="h-10 w-10 rounded-lg bg-gray-100 object-cover"
                  />
                  <div>
                    <span className="text-sm text-gray-700">{item.layer}</span>
                  </div>
                </div>
                <svg
                  onClick={() => {
                    removePreviewLayer(item);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer stroke-gray-300 transition-all hover:scale-110 hover:stroke-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
