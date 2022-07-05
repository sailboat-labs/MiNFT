import React from "react";

import ContractStepHeader from "./StepHeader";
import BaseInput from "../controls/BaseInput";
import BaseSelect from "../controls/BaseSelect";

const WhitelistForm = () => {
  return (
    <article>
      <ContractStepHeader
        title="Whitelist--"
        selectOptions={[{ name: "Admin" }]}
        onChange={(value) => console.log(value)}
      />
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
                <BaseSelect options={[]} />
                <BaseSelect options={[]} />
                <BaseSelect options={[]} />
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
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </article>
      </div>
    </article>
  );
};

export default WhitelistForm;
