import { Listbox, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import React, { Fragment, ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getConfiguration } from "redux/reducers/selectors/configuration";
import { setConfiguration } from "redux/reducers/slices/configuration";
import * as Yup from "yup";

import BaseRadio from "@/components/input-controls/BaseRadio";
import SettingsLayout from "@/components/layout/Settings";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";

const formats = ["PNG", "JPEG"];

const qualities = [
  { percentage: 20, name: "Very Low" },
  { percentage: 40, name: "Low" },
  { percentage: 60, name: "Medium" },
  { percentage: 80, name: "High" },
  { percentage: 100, name: "Full" },
];

const OutputSettingsPage = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(getConfiguration);

  useEffect(() => {
    console.log(configuration);
  }, [configuration]);

  const formik = useFormik({
    initialValues: {
      width: 0,
      height: 0,
    },
    validationSchema: Yup.object({
      width: Yup.number().required("width is required"),
      height: Yup.number().required("height is required"),
    }),
    onSubmit: (values, helpers) => {
      console.log("submitting output", values);
    },
  });

  return (
    <section className="container mx-auto max-w-2xl divide-y divide-gray-200 pb-10">
      <div className="py-12">
        <h3 className="mb-2 text-4xl font-bold">Render Settings</h3>
        <h4>Backend</h4>
        <p>
          MiNFT comes with two render systems - one using canvas and the other
          using FFmpeg. The canvas backend is faster but only supports PNG and{" "}
          <strong>JPEG</strong> files. The FFmpeg is lower and uses more memory
          but supports animation and video exports.
        </p>
        <div className="mt-8 flex gap-6">
          <BaseRadio
            className="flex-1"
            checked={configuration[enumNFTGenConfig.RENDER_FORMAT] === "canvas"}
            onClick={() => {
              dispatch(
                setConfiguration({
                  key: enumNFTGenConfig.RENDER_FORMAT,
                  value: "canvas",
                })
              );
            }}
          >
            <div className="p-6">
              <strong>Canvas</strong>
              <p className="text-sm">
                Much faster & requires less resources, but no animation support
              </p>
            </div>
          </BaseRadio>
          <BaseRadio
            className="flex-1"
            checked={configuration[enumNFTGenConfig.RENDER_FORMAT] === "FFmpeg"}
            onClick={() => toast("Support for FFmpeg will come soon")}
          >
            <div className="p-6">
              <strong>FFmpeg</strong>
              <p className="text-sm">
                Supports animation, but is slower and requires experimental
                browser features
              </p>
            </div>
          </BaseRadio>
        </div>
        <div className="py-10">
          <h4>Output</h4>
          <p>
            Dimensions and format used for exporting tokens. We highly recommend
            using source files with the same dimensions to reduce generation
            time.
          </p>
          <div className="mt-6 grid grid-cols-2 items-start gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="format">
                Format
              </label>
              <div className="relative w-full">
                <Listbox
                  value={configuration[enumNFTGenConfig.OUTPUT_IMAGE_TYPE]}
                  onChange={(value) => {
                    dispatch(
                      setConfiguration({
                        key: enumNFTGenConfig.OUTPUT_IMAGE_TYPE,
                        value: value,
                      })
                    );
                  }}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg  border border-gray-400 bg-gray-100 py-2 pl-3 pr-10 text-left transition-all duration-100 hover:bg-gray-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">
                        {configuration[enumNFTGenConfig.OUTPUT_IMAGE_TYPE]}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="gray"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {formats.map((format, formatIdx) => (
                          <Listbox.Option
                            key={formatIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-[#085e7d2c] text-[#085E7D]"
                                  : "text-gray-900"
                              }`
                            }
                            value={format}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {format}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="#085E7D"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-6 grid grid-cols-2 items-start gap-6"
          >
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="width">
                Width
              </label>
              <input
                type="number"
                value={configuration[enumNFTGenConfig.RENDER_FORMAT_WIDTH]}
                onChange={(evt) => {
                  dispatch(
                    setConfiguration({
                      key: enumNFTGenConfig.RENDER_FORMAT_WIDTH,
                      value: evt.target.value,
                    })
                  );
                }}
                className="flex-1 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="width">
                Height
              </label>
              <input
                type="number"
                value={configuration[enumNFTGenConfig.RENDER_FORMAT_HEIGHT]}
                onChange={(evt) => {
                  dispatch(
                    setConfiguration({
                      key: enumNFTGenConfig.RENDER_FORMAT_HEIGHT,
                      value: evt.target.value,
                    })
                  );
                }}
                className="flex-1 rounded-lg"
              />
            </div>
          </form>
        </div>
        <div className="py-10">
          <h4>Preview</h4>
          <p>Lower preview quality will make updates quicker</p>
          <div className="relative w-1/3">
            <Listbox
              value={configuration[enumNFTGenConfig.RENDER_QUALITY]}
              onChange={(value) => {
                dispatch(
                  setConfiguration({
                    key: enumNFTGenConfig.RENDER_QUALITY,
                    value: value,
                  })
                );
              }}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg  border border-gray-400 bg-gray-100 py-2 pl-3 pr-10 text-left transition-all duration-100 hover:bg-gray-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {configuration[enumNFTGenConfig.RENDER_QUALITY]?.name} (
                    {configuration[enumNFTGenConfig.RENDER_QUALITY]?.percentage}
                    %)
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="gray"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md  border border-gray-200 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {qualities.map((quality, qualityIdx) => (
                      <Listbox.Option
                        key={qualityIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-[#085e7d2c] text-[#085E7D]"
                              : "text-gray-900"
                          }`
                        }
                        value={quality}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected
                                  ? "font-medium text-[#085E7D]"
                                  : "font-normal"
                              }`}
                            >
                              {quality.name} ({quality.percentage}%)
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="#085E7D"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </section>
  );
};

OutputSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default OutputSettingsPage;
