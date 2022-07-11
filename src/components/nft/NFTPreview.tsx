/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-async-promise-executor */
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getConfiguration } from "redux/reducers/selectors/configuration";
import { getLayers } from "redux/reducers/selectors/layers";

import { IElement, IGeneratedTokens, ILayer } from "@/interfaces";
import { generateTokens } from "@/utils/art-engine";

interface AppProps {
  className?: string;
}

const NFTPreview: FC<AppProps> = ({ className }) => {
  const layersState = useSelector(getLayers);
  const configuration = useSelector(getConfiguration);

  const [previewImage, setPreviewImage] = useState<IGeneratedTokens[]>([]);

  async function getPreview() {
    const layers: ILayer[] = layersState
      .filter((layer: ILayer) =>
        layer.elements.some((element: IElement) => element.isSelected)
      )
      .map((layer: ILayer, layerIndex: number) => ({
        id: layerIndex,
        name: layer.name,
        blendmode: "source-over",
        opacity: 1,
        bypassDNA: false,
        elements: layer.elements.filter((element) => element.isSelected),
      }));

    const _generatedImages: any = await generateTokens({
      configuration: {
        supply: 1,
        name: "Preview",
        externalLink: "Preview",
        description: "Preview",
        symbol: "Preview",
        family: "Preview",
      },
      layers,
      showToast: false,
    });
    console.log(_generatedImages);

    setPreviewImage(_generatedImages);
  }

  useEffect(() => {
    getPreview();
  }, [layersState]);

  return (
    <>
      <div className={`h-fit w-fit max-w-lg rounded-lg ${className} relative`}>
        <div className="w-96">
          <div className="flex w-full translate-y-5 items-center justify-center ">
            <div className="w-fit rounded-2xl border-2 bg-gray-100 px-8 py-2">
              Preview
            </div>
          </div>

          {previewImage.length == 0 ||
            (previewImage.length > 0 &&
              previewImage[0].renderObjects.length == 0 && (
                <div className="flex h-96 w-full flex-col items-center justify-center rounded-2xl border-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>Select a trait to preview</div>
                </div>
              ))}

          {previewImage.length > 0 && previewImage[0].renderObjects.length > 0 && (
            <img
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              src={previewImage[0].file}
              alt=""
              className="h-full w-full rounded-2xl bg-gray-100 object-cover"
            />
          )}
        </div>
      </div>

      {/* <EditTemplate isOpen={isOpen} closeModal={() => setIsOpen(false)} /> */}
    </>
  );
};

export default NFTPreview;
