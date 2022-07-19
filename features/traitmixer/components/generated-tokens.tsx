/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from "react-redux";
import { getConfiguration } from "redux/reducers/selectors/configuration";
import {
  getGeneratedImages,
  getGeneratedImagesFilter,
} from "redux/reducers/selectors/layers";
import { setGeneratedImagesFilter } from "redux/reducers/slices/generated-images";

import GeneratedToken from "@/components/nft/GeneratedToken";

import { IGeneratedTokens } from "@/interfaces";

export default function GeneratedTokens() {
  const generatedTokens: IGeneratedTokens[] = useSelector(getGeneratedImages);

  const generatedTokenFilter = useSelector(getGeneratedImagesFilter);
  const dispatch = useDispatch();
  const configuration = useSelector(getConfiguration);
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

  return (
    <div className="h-screen w-full transform overflow-y-auto  bg-white p-6 text-left align-middle shadow-xl transition-all">
      <div className="text-lg font-medium leading-6 text-gray-900">
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
              <strong>{generatedTokenFilter.split("|||")[0]}</strong>
              &apos;
            </p>
          ) : (
            <>
              {generatedTokens.length > 100 && "Showing 100 of"}{" "}
              {generatedTokens?.length} tokens
            </>
          )}
        </div>
      </div>
      <div className="mt-8 flex w-full items-center justify-center">
        <div className="mt-5 grid w-fit grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
          {filteredTokens
            .filter((_, index) => index + 100 > filteredTokens.length)
            .reverse()
            .map((token, index) => (
              <GeneratedToken key={index} token={token} />
            ))}
        </div>
      </div>
    </div>
  );
}
