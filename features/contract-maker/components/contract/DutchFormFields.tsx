import { Formik } from "formik";
import React, { FC } from "react";

import BaseDatetimeInput from "@/components/controls/BaseDatetimeInput";
import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
import BaseTimezoneSelector from "@/components/controls/BaseTimezoneSelector";

interface AppProps {
  form: any;
}

const DutchAuctionFormFields: FC<AppProps> = ({ form }) => {
  return (
    <Formik
      initialValues={form.initialValues}
      validationSchema={form.validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
      isInitialValid={false}
    >
      {(formik) => (
        <div className="pt-4 pb-10">
          {/* <h2 className="text-xl text-indigo-800">Dutch auction</h2> */}
          <section className="mt-6 grid grid-cols-2">
            <div className="mb-8 flex flex-col">
              <strong>Quantity of collection</strong>
              <BaseInput
                type="number"
                {...form.getFieldProps("quantity")}
                error={
                  form.touched.quantity && form.errors.quantity ? (
                    <p className="text-base text-red-500">
                      {form.errors.quantity}
                    </p>
                  ) : null
                }
                wrapperClass="mt-3 w-3/5"
              />
            </div>

            <div className="mb-8 flex flex-col">
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
                wrapperClass="mt-3 w-3/5"
                placeholder="starting price"
                postfix={
                  <span className="font-semibold text-indigo-800">ETH</span>
                }
              />
            </div>
            <div className="mb-8 flex flex-col">
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
                wrapperClass="mt-3 w-3/5"
                placeholder="ending price"
                postfix={
                  <span className="font-semibold text-indigo-800">ETH</span>
                }
              />
            </div>
            <div className="mb-8 flex flex-col">
              <strong>Amount Decrement</strong>
              <BaseInput
                type="number"
                {...form.getFieldProps("decrementAmount")}
                error={
                  form.touched.decrementAmount &&
                  form.errors.decrementAmount ? (
                    <p className="text-base text-red-500">
                      {form.errors.decrementAmount}
                    </p>
                  ) : null
                }
                wrapperClass="mt-3 w-3/5"
                placeholder="amount"
                postfix={
                  <span className="font-semibold text-indigo-800">ETH</span>
                }
              />
            </div>
          </section>
          <h4 className="mt-10 ">Timing</h4>
          <section className=" flex flex-col items-start gap-10">
            <div className="w-1/2">
              <div className="mt-8 flex w-3/5 flex-col ">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col ">
                    <span>Start Date</span>
                    <BaseDatetimeInput
                      type="datetime-local"
                      wrapperClass="border-gray-600"
                      onChange={(e) =>
                        (formik.values.startDate = e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col ">
                    <span>End Date</span>
                    <BaseDatetimeInput
                      type="datetime-local"
                      wrapperClass="border-gray-600"
                      onChange={(e) => (formik.values.endDate = e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-8 flex flex-col">
                  <span>Timezone</span>
                  <BaseTimezoneSelector
                    onChange={(e) => (formik.values.timezone = e.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
              <strong>Minutes</strong>
              <BaseSelect
                options={[]}
                buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800 mt-2"
                selectorIconColor="black"
              />
            </div>
          </section>
        </div>
      )}
    </Formik>
  );
};

export default DutchAuctionFormFields;
