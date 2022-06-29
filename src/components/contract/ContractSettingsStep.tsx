import React, { useState } from "react";

import ContractStepHeader from "./StepHeader";
import BaseInput from "../controls/BaseInput";
import BaseSelect from "../controls/BaseSelect";

const ContractSettingsStep = () => {
  const [selected, setSelected] = useState();

  return (
    <section>
      <ContractStepHeader
        title="Whitelist"
        onChange={(value) => setSelected(value)}
      />
      <div className="divide-y divide-indigo-800">
        <div className="mt-8 grid grid-cols-2 gap-8 pb-8">
          <article>
            <strong>Launch Time</strong>
            <div>The same as for classic participants</div>
            <div>Special time</div>
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
                  <BaseSelect />
                  <BaseSelect />
                  <BaseSelect />
                </div>
              </div>
            </div>
          </article>
          <article>
            <strong>Mint price</strong>
            <div>The same as for classic participants</div>
            <div>Special time</div>
            <BaseInput
              wrapperClass="mt-3"
              postfix={
                <span className="font-semibold text-indigo-800">ETH</span>
              }
            />
          </article>
        </div>
        <div className="pt-8">
          <h2 className="text-xl text-indigo-800">Dutch auction</h2>
          <section className="mt-6 grid max-w-[90%] grid-cols-4 gap-x-10">
            <div className="flex flex-col">
              <strong>Quantity of collection</strong>
              <BaseInput wrapperClass="mt-2" />
            </div>

            <div className="flex flex-col">
              <strong>Starting Price</strong>
              <BaseInput
                wrapperClass="mt-2"
                placeholder="starting price"
                postfix={
                  <span className="font-semibold text-indigo-800">ETH</span>
                }
              />
            </div>
            <div className="flex flex-col">
              <strong>Ending Price</strong>
              <BaseInput
                wrapperClass="mt-2"
                placeholder="ending price"
                postfix={
                  <span className="font-semibold text-indigo-800">ETH</span>
                }
              />
            </div>
            <div className="flex flex-col">
              <strong>Amount Decrement</strong>
              <BaseInput
                wrapperClass="mt-2"
                placeholder="amount"
                postfix={
                  <span className="font-semibold text-indigo-800">ETH</span>
                }
              />
            </div>
          </section>
          <section className="mt-10 flex max-w-[90%]  gap-10">
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
                    <BaseSelect />
                    <BaseSelect />
                    <BaseSelect />
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
                    <BaseSelect />
                    <BaseSelect />
                    <BaseSelect />
                  </div>
                </div>
              </div>
            </div>
            <div className=" max-w-[300px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
              <strong>Minutes</strong>
              <BaseSelect />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ContractSettingsStep;
