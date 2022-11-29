import { doc, onSnapshot } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getContractByField } from "redux/reducers/selectors/contract";
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
  isPreview?: boolean;
}

const DutchAuctionFormFields: FC<AppProps> = ({ form, isPreview = false }) => {
  const [values, setValues] = useState<any>();

  const project = useSelector(getProjectState) as IProject;

  const contractType = useSelector(getContractByField("type"));

  useEffect(() => {
    const _doc = doc(
      firestore,
      `Projects/${project.slug}/Contract-Maker/draft`
    );
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setValues(snapshot.data());
    });

    return () => {
      unsubscribe();
    };
  }, [project.slug]);

  async function handleSaveContractMaker(
    field: string,
    value: string | boolean | { title: string; description: string }[]
  ) {
    const saveDraft = await saveContractMaker(project, field, value);

    if (!saveDraft) {
      toast.error(
        "Error Ocurred while saving draft. Changes will not be saved"
      );
      console.log("Toast error occured!");
    }
  }

  const updateContract = (
    key: string,
    value: string | boolean | { title: string; description: string }[]
  ) => {
    handleSaveContractMaker(key, value);
  };

  const displayValues = (e: any) => {
    e.preventDefault();
    console.log("Contract values", values);
  };

  return (
    <>
      <div className="">
        <form onSubmit={form.handleSubmit}>
          <div className="pt-5">
            <div className="mt-3 mb-5 flex items-center gap-5">
              <div className="text-xl text-indigo-500">Details</div>
              <div className=" flex-1 rounded-lg border "></div>
            </div>
            <section className="grid grid-cols-3 2xl:grid-cols-4">
              <div className="mb-8 flex flex-col">
                <strong>
                  Quantity of collection <span className="text-red-500">*</span>
                </strong>
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
                  wrapperClass="mt-1 w-fit"
                  disabled={isPreview}
                  value={values?.quantity}
                  onChange={(e: any) =>
                    updateContract("quantity", e.target.value)
                  }
                  onBlur={(e: any) =>
                    updateContract("quantity", e.target.value)
                  }
                />
              </div>

              <div className="mb-8 flex flex-col">
                <strong>
                  Starting Price <span className="text-red-500">*</span>
                </strong>
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
                  wrapperClass="mt-1 w-fit"
                  placeholder="starting price"
                  postfix={
                    <span className="font-semibold text-indigo-800">ETH</span>
                  }
                  disabled={isPreview}
                  value={values?.startingPrice}
                  onChange={(e: any) =>
                    updateContract("startingPrice", e.target.value)
                  }
                  onBlur={(e: any) =>
                    updateContract("startingPrice", e.target.value)
                  }
                />
              </div>
              <div className="mb-8 flex flex-col">
                <strong>
                  Ending Price <span className="text-red-500">*</span>
                </strong>
                <BaseInput
                  {...form.getFieldProps("endingPrice")}
                  error={
                    form.touched.endingPrice && form.errors.endingPrice ? (
                      <p className="text-base text-red-500">
                        {form.errors.endingPrice}
                      </p>
                    ) : null
                  }
                  wrapperClass="mt-1 w-fit"
                  placeholder="ending price"
                  postfix={
                    <span className="font-semibold text-indigo-800">ETH</span>
                  }
                  disabled={isPreview}
                  value={values?.endingPrice}
                  onChange={(e: any) =>
                    updateContract("endingPrice", e.target.value)
                  }
                  onBlur={(e: any) =>
                    updateContract("endingPrice", e.target.value)
                  }
                />
              </div>
              <div className="mb-8 flex flex-col">
                <strong>
                  Amount Decrement <span className="text-red-500">*</span>
                </strong>
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
                  wrapperClass="mt-1 w-fit"
                  placeholder="amount"
                  postfix={
                    <span className="font-semibold text-indigo-800">ETH</span>
                  }
                  disabled={isPreview}
                  value={values?.decrementAmount}
                  onChange={(e: any) =>
                    updateContract("decrementAmount", e.target.value)
                  }
                  onBlur={(e: any) =>
                    updateContract("decrementAmount", e.target.value)
                  }
                />
              </div>
            </section>
          </div>

          {/* <h4 className="mt-10 ">Timing</h4> */}
          <div className=" ">
            <div className="mt-3 mb-5 flex items-center gap-5">
              <div className="text-xl text-indigo-500">Timing</div>
              <div className=" flex-1 rounded-lg border "></div>
            </div>
            <section className="mb-10 ">
              <div className="">
                <div className="grid grid-cols-3">
                  <div className="flex flex-col">
                    <span className=" font-bold">
                      Start date <span className="text-red-500">*</span>
                    </span>
                    <BaseDatetimeInput
                      {...form.getFieldProps("startDate")}
                      required
                      type="datetime-local"
                      wrapperClass="border-gray-600 w-fit"
                      error={
                        form.touched.startDate && form.errors.startDate ? (
                          <p className="text-base text-red-500">
                            {form.errors.startDate}
                          </p>
                        ) : null
                      }
                      disabled={isPreview}
                      value={values?.startDate}
                      onChange={(e: any) =>
                        updateContract("startDate", e.target.value)
                      }
                      onBlur={(e: any) =>
                        updateContract("startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className=" font-bold">
                      End date <span className="text-red-500">*</span>
                    </span>
                    <BaseDatetimeInput
                      {...form.getFieldProps("endDate")}
                      required
                      type="datetime-local"
                      wrapperClass="border-gray-600 w-fit"
                      error={
                        form.touched.endDate && form.errors.endDate ? (
                          <p className="text-base text-red-500">
                            {form.errors.endDate}
                          </p>
                        ) : null
                      }
                      disabled={isPreview}
                      value={values?.endDate}
                      onChange={(e: any) =>
                        updateContract("endDate", e.target.value)
                      }
                      onBlur={(e: any) =>
                        updateContract("endDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-fit flex-1">
                    <span className="font-semibold">
                      Minutes <span className="text-red-500">*</span>
                    </span>
                    {isPreview ? (
                      <p className="mt-3 rounded-md bg-white py-1 px-2 !text-gray-800 ring-1 ring-gray-300 ">
                        {values?.minutes}
                      </p>
                    ) : (
                      <BaseSelect
                        {...form.getFieldProps("minutes")}
                        options={Array(60)
                          .fill(null)
                          .map((_, index) => ({ name: index + 1 }))}
                        buttonClass="!bg-white ring-1 mt-1 ring-gray-200 !text-gray-800"
                        selectorIconColor="black"
                        error={
                          form.touched.minutes && form.errors.minutes ? (
                            <p className="text-base text-red-500">
                              {form.errors.minutes}
                            </p>
                          ) : null
                        }
                        disabled={isPreview}
                        value={values?.minutes}
                        onChange={(e: any) => updateContract("minutes", e.name)}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-8 w-fit">
                  <span className="my-3 font-bold">
                    Timezone <span className="text-red-500">*</span>
                  </span>
                  <BaseTimezoneSelector
                    {...form.getFieldProps("timezone")}
                    required
                    error={
                      form.touched.timezone && form.errors.timezone ? (
                        <p className="text-base text-red-500">
                          {form.errors.timezone}
                        </p>
                      ) : null
                    }
                    disabled={isPreview}
                    value={values?.timezone}
                    defaultValue={values?.timezone}
                    onChange={(e: any) => {
                      updateContract("timezone", e);
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
          <button
            id="showValues"
            className="hidden"
            onClick={(e: any) => displayValues(e)}
          ></button>
        </form>
      </div>
    </>
  );
};

export default DutchAuctionFormFields;
