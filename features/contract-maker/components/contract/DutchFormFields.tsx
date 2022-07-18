import React, { FC } from "react";

import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";

interface AppProps {
  form: any;
}

const DutchAuctionFormFields: FC<AppProps> = ({ form }) => {
  return (
    <div className="pt-8 pb-10">
      {/* <h2 className="text-xl text-indigo-800">Dutch auction</h2> */}
      <section className="mt-6 grid grid-cols-4 gap-x-10">
        <div className="flex flex-col">
          <strong>Quantity of collection</strong>
          <BaseInput
            type="number"
            {...form.getFieldProps("quantity")}
            error={
              form.touched.quantity && form.errors.quantity ? (
                <p className="text-base text-red-500">{form.errors.quantity}</p>
              ) : null
            }
            wrapperClass="mt-2"
          />
        </div>
        <div className="flex flex-col">
          <strong>Starting Price</strong>
          <BaseInput
            type="number"
            {...form.getFieldProps("startingPrice")}
            error={
              form.touched.startingPrice && form.errors.startingPrice ? (
                <p className="text-base text-red-500">
                  {form.errors.startingPrice}
                </p>
              ) : null
            }
            wrapperClass="mt-2"
            placeholder="starting price"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
        <div className="flex flex-col">
          <strong>Ending Price</strong>
          <BaseInput
            {...form.getFieldProps("endingPrice")}
            error={
              form.touched.endingPrice && form.errors.endingPrice ? (
                <p className="text-base text-red-500">
                  {form.errors.endingPrice}
                </p>
              ) : null
            }
            wrapperClass="mt-2"
            placeholder="ending price"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
        <div className="flex flex-col">
          <strong>Amount Decrement</strong>
          <BaseInput
            type="number"
            {...form.getFieldProps("decrementAmount")}
            error={
              form.touched.decrementAmount && form.errors.decrementAmount ? (
                <p className="text-base text-red-500">
                  {form.errors.decrementAmount}
                </p>
              ) : null
            }
            wrapperClass="mt-2"
            placeholder="amount"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
      </section>
      <section className="mt-6 grid grid-cols-4 gap-x-12">
        <div className="flex flex-col gap-1">
          <strong>Start date & time</strong>
          <input
            id="classic-mint-start-date"
            type="datetime-local"
            className="w-full rounded border-gray-200 font-dmsans"
          />
        </div>
        <div className="flex flex-col gap-1">
          <strong>End date & time</strong>
          <input
            id="classic-mint-end-date"
            type="datetime-local"
            className="w-full rounded border-gray-200 font-dmsans"
          />
        </div>
        <div className="flex flex-col gap-1">
          <strong>Decremental Time</strong>
          <div className="grid grid-cols-2 items-center gap-4">
            <BaseSelect
              options={Array(60)
                .fill(null)
                .map((_, index) => ({ name: index + 1 }))}
              buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
              selectorIconColor="black"
            />
            <span>minutes</span>
          </div>
        </div>
        {/* <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Start date & time"
        >
          <input
            id="classic-mint-start-date"
            type="datetime-local"
            className="w-full rounded border-gray-200 font-dmsans"
          />
        </ContractFormRowSection> */}
        {/* <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="End date & time"
        >
          <input
            id="classic-mint-end-date"
            type="datetime-local"
            className="w-full rounded border-gray-200 font-dmsans"
          />
        </ContractFormRowSection> */}
        {/* <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Decremental Time"
        >
          <div className="grid grid-cols-2 items-center gap-4">
            <BaseSelect
              options={Array(60)
                .fill(null)
                .map((_, index) => ({ name: index + 1 }))}
              buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
              selectorIconColor="black"
            />
            <span>minutes</span>
          </div>
        </ContractFormRowSection> */}
      </section>
    </div>
  );
};

export default DutchAuctionFormFields;
