import React from "react";

import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";

const ClassicMint = () => {
  return (
    <div className="py-8">
      {/* <h2 className="text-xl text-indigo-800">Classi</h2> */}
      <section className="mt-6 grid grid-cols-4 gap-x-10">
        <div className="flex flex-col">
          <strong>Quantity of collection</strong>
          <BaseInput wrapperClass="mt-2" placeholder="quantity" />
        </div>
        <div className="flex flex-col">
          <strong>Mint Price</strong>
          <BaseInput
            wrapperClass="mt-2"
            placeholder="price"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
        <div className="flex flex-col">
          <strong>Max mint per wallet</strong>
          <BaseInput wrapperClass="mt-2" />
        </div>
        <div className="flex flex-col">
          <strong>Reserved tokens</strong>
          <BaseInput wrapperClass="mt-2" />
        </div>
        <div className="flex flex-col">
          <strong>Max mint per transaction</strong>
          <BaseInput
            wrapperClass="mt-2"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
      </section>
      <section className="mt-10 flex  gap-10">
        <div className=" box-content grid flex-1 grid-cols-2 gap-x-10 rounded-md bg-white p-5 ring-1 ring-gray-200">
          <div className="my-3">
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
          <div className="my-3">
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
        </div>
        <div className=" max-w-[300px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
          <strong>Minutes</strong>
          <BaseSelect
            options={[]}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            selectorIconColor="black"
          />
        </div>
      </section>
    </div>
  );
};

export default ClassicMint;
