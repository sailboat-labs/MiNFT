/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-async-promise-executor */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
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
  setGeneratedImagesFilter,
} from "redux/reducers/slices/generated-images";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";
import { IGeneratedTokens } from "@/interfaces";
import { generateTokens } from "@/utils/art-engine";
import { generateTokensDNA } from "@/utils/generateTokensDNA";

import GeneratedToken from "./GeneratedToken";

export default function GenerateToken() {
  const generatedTokens: IGeneratedTokens[] = useSelector(getGeneratedImages);
  const generatedTokenFilter = useSelector(getGeneratedImagesFilter);
  const [possibleConfigCount, setPossibleConfigCount] = useState(0);

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

  useEffect(() => {
    const _possibleConfig = generateTokensDNA(layers);
    setPossibleConfigCount(new Set(_possibleConfig).size);
  }, [layers]);

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
          if (possibleConfigCount < configuration[enumNFTGenConfig.SUPPLY])
            return toast.error("Resolve errors in trait mixer rarity");
          dispatch(clearGeneratedImages({}));

          const _generatedImages: any = await generateTokens({
            configuration,
            layers,
            component: onDoneComponent,
          });

          dispatch(setGeneratedImages(_generatedImages));
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

      {/* <div
        onClick={() => {
          dispatch(clearGeneratedImages({}));
        }}
        className="gradient-button mt-10"
      >
        Clear Generated Tokens
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            //
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 ml-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" ml-[15rem] min-h-screen w-screen transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="mb-5 flex w-full items-center justify-between">
                      <div className="flex items-center gap-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                        <span className="text-3xl">Generated Images</span>
                      </div>
                      <svg
                        onClick={() => {
                          closeModal();
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 cursor-pointer rounded-xl bg-gray-200 p-2 transition-all hover:scale-105 hover:bg-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-3 font-normal">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 cursor-pointer rounded-xl transition-all hover:-rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        onClick={() => dispatch(setGeneratedImagesFilter(null))}
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {generatedTokenFilter ? (
                        <p>
                          Showing {filteredTokens.length} results where{" "}
                          <strong>
                            &apos;{generatedTokenFilter.split("|||")[1]}&apos;
                          </strong>{" "}
                          is &apos;
                          <strong>
                            {generatedTokenFilter.split("|||")[0]}
                          </strong>
                          &apos;
                        </p>
                      ) : (
                        <>
                          {generatedTokens.length > 100 && "Showing 100 of"}{" "}
                          {generatedTokens?.length} tokens
                        </>
                      )}
                    </div>
                  </Dialog.Title>
                  <div className="mt-8 flex w-full items-center justify-center">
                    <div className="mt-5 grid w-fit grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
                      {filteredTokens
                        .filter(
                          (_, index) => index + 100 > filteredTokens.length
                        )
                        .reverse()
                        .map((token, index) => (
                          <GeneratedToken key={index} token={token} />
                        ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
