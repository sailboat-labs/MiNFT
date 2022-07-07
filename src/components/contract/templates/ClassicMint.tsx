import React from "react";

import BaseDatePicker from "@/components/controls/BaseDatePicker";
import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
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
          <BaseInput wrapperClass="w-full" placeholder="quantity" />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Mint Price"
        >
          <BaseInput
            wrapperClass="w-full"
            placeholder="price"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Number of tokens to reserve"
        >
          <BaseInput wrapperClass="w-full" />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Max mint per wallet"
        >
          <BaseInput wrapperClass="w-full" />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Max mint per transaction"
        >
          <BaseInput wrapperClass="w-full" />
        </ContractFormRowSection>

        {/* <div className="flex flex-col">
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
        </div> */}
      </section>
      <h4 className="mt-10">Timing</h4>
      <section className="mb-10 mt-3 flex items-start  gap-10">
        <div className="flex-1">
          <BaseDatePicker />
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
