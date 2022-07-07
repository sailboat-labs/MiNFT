import React from "react";

import BaseSelect from "./BaseSelect";

const BaseDatePicker = () => {
  return (
    <section className="gap-10">
      <div className="box-content grid w-fit grid-cols-2 gap-x-10 rounded-md bg-white p-5 ring-1 ring-gray-200">
        <div className="my-3">
          <strong>Start on a specific date & time</strong>
          <div className="grid grid-cols-3 gap-3">
            <div className="mt-2">
              <strong className="font-semibold text-gray-500">Day</strong>
              <input
                className="!focus:invalid:border-red-500 mt-1 w-full rounded border border-gray-300 py-2 px-3 text-center placeholder:text-center invalid:border-red-500 invalid:text-red-500 focus:border-indigo-800"
                placeholder="DD"
                type="number"
                min={1}
                // max={} // set maximum depending on the month
              />
            </div>
            <div className="mt-2">
              <strong className="font-semibold text-gray-500">Month</strong>
              <input
                className="!focus:invalid:border-red-500 mt-1 w-full rounded border border-gray-300 py-2 px-3 text-center placeholder:text-center invalid:border-red-500 invalid:text-red-500 focus:border-indigo-800"
                placeholder="MM"
                type="number"
                min={1}
                max={12}
              />
            </div>
            <div className="mt-2">
              <strong className="font-semibold text-gray-500">Year</strong>
              <input
                className="!focus:invalid:border-red-500 mt-1 w-full rounded border border-gray-300 py-2 px-3 text-center placeholder:text-center invalid:border-red-500 invalid:text-red-500 focus:border-indigo-800"
                placeholder="YYYY"
                type="number"
                min={1}
                max={9999}
              />
            </div>
            {/* <svg
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
            </svg> */}
          </div>
          <div className="mt-3">
            <strong className="font-semibold text-gray-500">Time</strong>
            <div className="grid grid-cols-3 gap-3">
              <BaseSelect
                buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
                options={Array(12)
                  .fill(null)
                  .map((_, index: number) => ({
                    name: index + 1,
                  }))}
              />
              <BaseSelect
                buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
                options={Array(60)
                  .fill(null)
                  .map((_, index: number) => ({
                    name: index < 10 ? "0" + index : index,
                  }))}
              />
              <BaseSelect
                buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
                options={[{ name: "AM" }, { name: "PM" }]}
              />
            </div>
          </div>
        </div>
        <div className="my-3">
          <strong>End on a specific date & time</strong>
          <div className="grid grid-cols-3 gap-3">
            <div className="mt-2">
              <strong className="font-semibold text-gray-500">Day</strong>
              <input
                className="!focus:invalid:border-red-500 mt-1 w-full rounded border border-gray-300 py-2 px-3 text-center placeholder:text-center invalid:border-red-500 invalid:text-red-500 focus:border-indigo-800"
                placeholder="DD"
                type="number"
                min={1}
                // max={} // set maximum depending on the month
              />
            </div>
            <div className="mt-2">
              <strong className="font-semibold text-gray-500">Month</strong>
              <input
                className="!focus:invalid:border-red-500 mt-1 w-full rounded border border-gray-300 py-2 px-3 text-center placeholder:text-center invalid:border-red-500 invalid:text-red-500 focus:border-indigo-800"
                placeholder="MM"
                type="number"
                min={1}
                max={12}
              />
            </div>
            <div className="mt-2">
              <strong className="font-semibold text-gray-500">Year</strong>
              <input
                className="!focus:invalid:border-red-500 mt-1 w-full rounded border border-gray-300 py-2 px-3 text-center placeholder:text-center invalid:border-red-500 invalid:text-red-500 focus:border-indigo-800"
                placeholder="YYYY"
                type="number"
                min={1}
                max={9999}
              />
            </div>
            {/* <svg
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
            </svg> */}
          </div>
          <div className="mt-3">
            <strong className="font-semibold text-gray-500">Time</strong>
            <div className="grid grid-cols-3 gap-3">
              <BaseSelect
                buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
                options={Array(12)
                  .fill(null)
                  .map((_, index: number) => ({
                    name: index + 1,
                  }))}
              />
              <BaseSelect
                buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
                options={Array(60)
                  .fill(null)
                  .map((_, index: number) => ({
                    name: index < 10 ? "0" + index : index,
                  }))}
              />
              <BaseSelect
                buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
                options={[{ name: "AM" }, { name: "PM" }]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BaseDatePicker;
