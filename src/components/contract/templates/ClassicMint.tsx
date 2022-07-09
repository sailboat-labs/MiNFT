import React from "react";

import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
import DateTimeRangePicker from "@/components/controls/DateTimeRangePicker";
import ContractFormRowSection from "@/components/layout/ContractRowSection";

const ClassicMint = () => {
  return (
    <div className="py-8">
      {/* <h2 className="text-xl text-indigo-800">Classi</h2> */}
      <section className="mt-6 flex flex-col gap-y-4">
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Quantity of collection"
        >
          <BaseInput
            type="number"
            wrapperClass="w-full"
            placeholder="Quantity"
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Mint Price"
        >
          <BaseInput
            wrapperClass="w-full"
            type="number"
            placeholder="Price"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Number of tokens to reserve"
        >
          <BaseInput type="number" wrapperClass="w-full" />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Max mint per wallet"
        >
          <BaseInput type="number" wrapperClass="w-full" />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Max mint per transaction"
        >
          <BaseInput type="number" wrapperClass="w-full" />
        </ContractFormRowSection>
      </section>
      <h4 className="mt-10">Timing</h4>
      <section className="mb-10 mt-3 flex items-start  gap-10">
        <div className="flex-1">
          <DateTimeRangePicker />
        </div>
        <div className=" max-w-[300px] rounded-md bg-white p-5 ring-1 ring-gray-200">
          <strong>Minutes</strong>
          <BaseSelect
            options={[]}
            buttonClass="!bg-white ring-1 mt-1 ring-gray-200 !text-gray-800"
            selectorIconColor="black"
          />
        </div>
      </section>
    </div>
  );
};

export default ClassicMint;
