/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-async-promise-executor */
import { loadImage } from "canvas";
import { generateTokens } from "features/traitmixer/utils/art-engine";
import { createProjectPreviewGIF } from "features/traitmixer/utils/gif-engine";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import { getConfiguration } from "redux/reducers/selectors/configuration";
import {
  getGeneratedImages,
  getGeneratedImagesFilter,
  getLayers,
} from "redux/reducers/selectors/layers";
import {
  clearGeneratedImages,
  setGeneratedImages,
} from "redux/reducers/slices/generated-images";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";
import { IGeneratedTokens } from "@/interfaces";

export default function GenerateToken() {
  const generatedTokens: IGeneratedTokens[] = useSelector(getGeneratedImages);
  const generatedTokenFilter = useSelector(getGeneratedImagesFilter);
  const [gifImage, setGifImage] = useState<any>();

  let filteredTokens = [];
  if (generatedTokenFilter === null) {
    filteredTokens = generatedTokens;
  } else {
    filteredTokens = [...generatedTokens].filter((token: IGeneratedTokens) => {
      return token.renderObjects.some(
        (element) =>
          element.filename.split(".")[0] ===
          generatedTokenFilter.split("|||")[0]
      );
    });
  }

  const layers = useSelector(getLayers);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // useEffect(() => {
  //   const _possibleConfig = generateTokensDNA(layers);
  //   setPossibleConfigCount(new Set(_possibleConfig).size);
  // }, [layers]);

  const dispatch = useDispatch();
  const configuration = useSelector(getConfiguration);

  function onDoneComponent() {
    return (
      <div className="flex items-center gap-3">
        All Tokens Generated
        <div
          onClick={() => {
            openModal();
          }}
          className="rounded-lg border-2 px-3 py-1"
        >
          View
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="mt-5 rounded-lg bg-[#30489C] px-5 py-3">
        <div className="text-white dark:text-gray-200">Collection Size</div>
        <div className="mt-2 rounded-lg bg-white">
          <input placeholder="Supply" className="bg-transparent px-5 py-2" />
          <span className="text-[#30489C]">Max</span>
        </div>
      </div> */}
      <div
        onClick={async () => {
          if (!configuration[enumNFTGenConfig.NAME])
            return toast.error("Enter collection name in settings");
          if (!configuration[enumNFTGenConfig.SUPPLY])
            return toast.error("Enter supply in settings");
          if (!configuration[enumNFTGenConfig.DESCRIPTION])
            return toast.error("Enter description in settings");
          if (!configuration[enumNFTGenConfig.BASE_URL])
            return toast.error("Enter external link in settings");
          // if (possibleConfigCount < configuration[enumNFTGenConfig.SUPPLY])
          //   return toast.error("Resolve errors in trait mixer rarity");
          dispatch(clearGeneratedImages({}));

          const _generatedImages: any = await generateTokens({
            configuration,
            layers,
            component: onDoneComponent,
          });

          console.log({ _generatedImages });

          dispatch(setGeneratedImages(_generatedImages));
          const _list: any[] = [];
          for (let index = 0; index < _generatedImages.length; index++) {
            const image = _generatedImages[index];
            const file = await loadImg(image.file);
            _list.push(file);
          }
          console.log({ _list });

          const gif = await createProjectPreviewGIF(_list);

          const blob = new Blob([gif]);
          const srcBlob = URL.createObjectURL(blob);
          setGifImage(srcBlob);
        }}
        className={`mt-5 flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-[#30489C] bg-white px-5 py-2 text-[#30489C] transition-all hover:scale-105 `}
      >
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Generate Tokens
      </div>

      {/* <img className="h-52 w-52 bg-gray-50" src={gifImage} /> */}
    </div>
  );
}

async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
}

const loadImg = async (_img: any) => {
  return new Promise(async (resolve) => {
    const loadedImage = await loadImage(`${_img}`);
    resolve({ loadedImage: loadedImage });
  });
};
