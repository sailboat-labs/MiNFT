import React from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { getContractByField } from "redux/reducers/selectors/contract";

import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";

const WhitelistForm = () => {
  const contractType = useSelector(getContractByField("type"));

  return (
    <article>
      <div className="mt-8 flex flex-col gap-12 pb-8">
        <article className="max-w-lg">
          <strong>Launch Time</strong>
          <div className="flex gap-1">
            <input
              id="classic-1"
              type="checkbox"
              className="mt-1"
              value="The same as for classic participants"
            />
            <label htmlFor="classic-1" className="ml-1">
              The same as for classic participants
            </label>
          </div>
          <div className="flex gap-1">
            <input
              id="special-time"
              type="checkbox"
              className="mt-1"
              value="Special Time"
            />
            <label htmlFor="special-time" className="ml-1">
              Special Time
            </label>
          </div>
          <div className="my-3 inline-block rounded-md bg-white p-5">
            <strong>Start on a specific date & time</strong>
            <div className="grid grid-cols-4 gap-3">
              <div>Day</div>
              <div>Month</div>
              <div>Year</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="gray"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="mt-3">
              <strong>Time</strong>
              <div className="grid grid-cols-4 gap-3">
                <BaseSelect options={[]} />
                <BaseSelect options={[]} />
                <BaseSelect options={[]} />
              </div>
            </div>
          </div>
        </article>
        <article className="max-w-lg">
          <strong>Mint price</strong>
          <div className="flex gap-1">
            <input
              id="price-classic-1"
              type="checkbox"
              className="mt-1"
              value="The same as for classic participants"
            />
            <label htmlFor="price-classic-1" className="ml-1">
              The same as for classic participants
            </label>
          </div>
          <div className="flex gap-1">
            <input
              id="special-price"
              type="checkbox"
              className="mt-1"
              value="Special price"
            />
            <label htmlFor="special-price" className="ml-1">
              Special price
            </label>
          </div>
          <BaseInput
            wrapperClass="mt-3 w-full"
            postfix={<span className="font-semibold ">ETH</span>}
          />
          <div className="mt-6 flex flex-col gap-2">
            <label className="font-bold ">Total whitelist quantity</label>
            <BaseInput wrapperClass="" />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <label className="font-bold ">{contractType} quantity</label>
            <BaseInput wrapperClass="" />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <label className="font-bold ">
              Maximum Mint per whitelisted wallet
            </label>
            <BaseInput wrapperClass="" />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <label className="font-bold ">Reserved Tokens</label>
            <BaseInput wrapperClass="" />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="font-bold ">Maximum Mint per transaction</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-indigo-800"
                viewBox="0 0 20 20"
                data-for="mmpt"
                data-tip
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <ReactTooltip id="mmpt" place="right" effect="solid">
                Lorem ipsum dolor sit
              </ReactTooltip>
            </div>
            <BaseInput wrapperClass="" />
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <label className="font-bold ">Maximum Mint per wallet</label>
            <BaseInput wrapperClass="" />
          </div>
        </article>
      </div>
    </article>
  );
};

export default WhitelistForm;
