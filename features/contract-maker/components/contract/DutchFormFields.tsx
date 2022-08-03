import { doc, onSnapshot } from "firebase/firestore";
import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import BaseDatetimeInput from "@/components/controls/BaseDatetimeInput";
import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
import BaseTimezoneSelector from "@/components/controls/BaseTimezoneSelector";

import { IProject } from "@/interfaces";
import { firestore } from "@/pages/dashboard";

import { saveContractMaker } from "./../../../launch/launch-config/launchpad-config.logic";

interface AppProps {
  form: any;
}

const DutchAuctionFormFields: FC<AppProps> = ({ form }) => {
  const [values, setValues] = useState({});

  const project = useSelector(getProjectState) as IProject;

  useEffect(() => {
    const _doc = doc(firestore, `Project/${project.slug}/Contract-Maker/draft`);

    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setValues(snapshot.data());
      console.log("Retrived values are: ", values);
      console.log("Snapshot data: ", snapshot.data());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function handleSaveContractMaker(
    field: string,
    value: string | boolean | { title: string; description: string }[]
  ) {
    const saveDraft = await saveContractMaker(project, field, value);
    console.log(saveDraft);

    if (!saveDraft) {
      toast.error(
        "Error Ocurred while saving draft. Changes will not be saved"
      );
      console.log("Toast error occured!");
    }
  }

  const updateContract = (key, value) => {
    handleSaveContractMaker(key, value);
  };

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
                value={values?.quantity}
                onChange={(e) => updateContract("quantity", e.target.value)}
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
          <section className="mb-10 mt-3">
            <div className="flex w-1/2 flex-col">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-col">
                  <span className="my-3 font-bold">Start date</span>
                  <BaseDatetimeInput
                    {...form.getFieldProps("startDate")}
                    required
                    type="datetime-local"
                    wrapperClass="border-gray-600"
                    onChange={(e) => (formik.values.startDate = e.target.value)}
                    onBlur={(e) => (formik.values.startDate = e.target.value)}
                    error={
                      form.touched.startDate && form.errors.startDate ? (
                        <p className="text-base text-red-500">
                          {form.errors.startDate}
                        </p>
                      ) : null
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <span className="my-3 font-bold">End date</span>
                  <BaseDatetimeInput
                    {...form.getFieldProps("endDate")}
                    required
                    type="datetime-local"
                    wrapperClass="border-gray-600"
                    onBlur={(e) => (formik.values.endDate = e.target.value)}
                    onChange={(e) => (formik.values.endDate = e.target.value)}
                    error={
                      form.touched.endDate && form.errors.endDate ? (
                        <p className="text-base text-red-500">
                          {form.errors.endDate}
                        </p>
                      ) : null
                    }
                  />
                </div>
              </div>
              <div className="mt-8">
                <span className="my-3 font-bold">Timezone</span>
                <BaseTimezoneSelector
                  {...form.getFieldProps("timezone")}
                  required
                  onChange={(e) => {
                    console.log(e);
                  }}
                  error={
                    form.touched.timezone && form.errors.timezone ? (
                      <p className="text-base text-red-500">
                        {form.errors.timezone}
                      </p>
                    ) : null
                  }
                />
              </div>
            </div>
            <div className="mt-10 w-1/2 max-w-[250px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
              <strong>Minutes</strong>
              <BaseSelect
                {...form.getFieldProps("minutes")}
                options={Array(60)
                  .fill(null)
                  .map((_, index) => ({ name: index + 1 }))}
                buttonClass="!bg-white ring-1 mt-1 ring-gray-200 !text-gray-800"
                selectorIconColor="black"
                onChange={(e) => {
                  //console.log(e);
                }}
                error={
                  form.touched.minutes && form.errors.minutes ? (
                    <p className="text-base text-red-500">
                      {form.errors.minutes}
                    </p>
                  ) : null
                }
              />
            </div>
          </section>
        </div>
      )}
    </Formik>
  );
};

export default DutchAuctionFormFields;
