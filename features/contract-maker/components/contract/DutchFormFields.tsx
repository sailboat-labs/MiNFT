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
      <section className="mt-10 flex items-start  gap-10">
        {/* <DateTimeRangePicker /> */}
        <div className=" max-w-[300px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200 dark:bg-[color:var(--dark)]">
          <strong>Minutes</strong>
          <BaseSelect
            options={[]}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800 mt-2"
            selectorIconColor="black"
          />
        </div>
      </section>
    </div>
  );
};

export default DutchAuctionFormFields;
