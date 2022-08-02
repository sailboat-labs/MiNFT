import React, { FC } from "react";

import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
import ContractFormRowSection from "@/components/layout/ContractRowSection";

interface AppProps {
  form: any;
}

const ClassicMintFormFields: FC<AppProps> = ({ form }) => {
  return (
    <div className="py-8">
      <section className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2 2xl:grid-cols-3">
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Quantity of collection"
        >
          <BaseInput
            {...form.getFieldProps("quantityOfCollection")}
            type="number"
            wrapperClass="w-full"
            placeholder="Quantity"
            error={
              form.touched.quantityOfCollection &&
              form.errors.quantityOfCollection ? (
                <div>{form.errors.quantityOfCollection}</div>
              ) : null
            }
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
            {...form.getFieldProps("mintPrice")}
            error={
              form.touched.mintPrice && form.errors.mintPrice ? (
                <p className="text-base text-red-500">
                  {form.errors.mintPrice}
                </p>
              ) : null
            }
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Number of tokens to reserve"
        >
          <BaseInput
            type="number"
            {...form.getFieldProps("reservedTokens")}
            error={
              form.touched.reservedTokens && form.errors.reservedTokens ? (
                <p className="text-base text-red-500">
                  {form.errors.reservedTokens}
                </p>
              ) : null
            }
            wrapperClass="w-full"
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Max mint per wallet"
        >
          <BaseInput
            {...form.getFieldProps("maxMintPerWallet")}
            error={
              form.touched.maxMintPerWallet && form.errors.maxMintPerWallet ? (
                <p className="text-base text-red-500">
                  {form.errors.maxMintPerWallet}
                </p>
              ) : null
            }
            type="number"
            wrapperClass="w-full"
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Max mint per transaction"
        >
          <BaseInput
            {...form.getFieldProps("maxMintPerTransaction")}
            error={
              form.touched.maxMintPerTransaction &&
              form.errors.maxMintPerTransaction ? (
                <p className="text-base text-red-500">
                  {form.errors.maxMintPerTransaction}
                </p>
              ) : null
            }
            type="number"
            wrapperClass="w-full"
          />
        </ContractFormRowSection>
      </section>
      <h4 className="mt-10">Timing</h4>
      <section className="mb-10 mt-3 flex items-start  gap-10">
        <div className="flex-1">{/* <DateTimeRangePicker /> */}</div>
        <div className="max-w-[250px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
          <strong>Minutes</strong>
          <BaseSelect
            options={Array(60)
              .fill(null)
              .map((_, index) => ({ name: index + 1 }))}
            buttonClass="!bg-white ring-1 mt-1 ring-gray-200 !text-gray-800"
            selectorIconColor="black"
          />
        </div>
      </section>
    </div>
  );
};

export default ClassicMintFormFields;
