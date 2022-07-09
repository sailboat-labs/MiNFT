import React from "react";

import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
import DateTimeRangePicker from "@/components/controls/DateTimeRangePicker";

const DutchAuction = () => {
  return (
    <div className="pt-8 pb-10">
      {/* <h2 className="text-xl text-indigo-800">Dutch auction</h2> */}
      <section className="mt-6 grid grid-cols-4 gap-x-10">
        <div className="flex flex-col">
          <strong>Quantity of collection</strong>
          <BaseInput wrapperClass="mt-2" />
        </div>

        <div className="flex flex-col">
          <strong>Starting Price</strong>
          <BaseInput
            wrapperClass="mt-2"
            placeholder="starting price"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
        <div className="flex flex-col">
          <strong>Ending Price</strong>
          <BaseInput
            wrapperClass="mt-2"
            placeholder="ending price"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
        <div className="flex flex-col">
          <strong>Amount Decrement</strong>
          <BaseInput
            wrapperClass="mt-2"
            placeholder="amount"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
      </section>
      <section className="mt-10 flex items-start  gap-10">
        <DateTimeRangePicker />
        <div className=" max-w-[300px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
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

export default DutchAuction;
