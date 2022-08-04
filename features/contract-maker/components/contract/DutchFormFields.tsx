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
import ContractFormRowSection from "@/components/layout/ContractRowSection";

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

  const contract =
    contractType == "Dutch Auction" ? "dutchAuction" : "fairDutch";

  const whitelisted = useSelector(getContractByField('whitelisted'))

  let path = ''
  whitelisted
    ? (path = `Projects/${project.slug}/Contract-Maker/draft/${contract}/draft/whitelisted/draft`)
    : (path = `Projects/${project.slug}/Contract-Maker/draft/${contract}/draft`);  

  useEffect(() => {
    const _doc = doc(firestore, path);
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setValues(snapshot.data());
    });

    return () => {
      unsubscribe();
    };
  }, [path, project.slug]);

  async function handleSaveContractMaker(
    field: string,
    value: string | boolean | { title: string; description: string }[]
  ) {
    const saveDraft = await saveContractMaker(
      whitelisted ? `${contract}/draft/whitelisted` : `${contract}`,
      project,
      field,
      value
    );

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

  const displayValues = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(`${contractType} values`, values);
  };

  return (
    <>
      <div className="mx-auto flex flex-col divide-y-2 divide-gray-200 pb-6">
        <form onSubmit={form.handleSubmit}>
          <ContractFormRowSection className="pt-5 pb-8" name="Details">
            {/* <h2 className="text-xl text-indigo-800">Dutch auction</h2> */}
            <section className="grid grid-cols-1">
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
                  wrapperClass="mt-1 w-80"
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
                  wrapperClass="mt-1 w-80"
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
                    updateContract("Starting Price", e.target.value)
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
                  wrapperClass="mt-1 w-80"
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
                  wrapperClass="mt-1 w-80"
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
                    updateContract("decrememntAmount", e.target.value)
                  }
                />
              </div>
            </section>
          </ContractFormRowSection>
          {/* <h4 className="mt-10 ">Timing</h4> */}

          <ContractFormRowSection className="pt-5 " name="Timing">
            <section className="mb-10 ">
              <div className="flex w-3/5 flex-col">
                <div className="flex w-full flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <span className="my-3 font-bold">Start date</span>
                    <BaseDatetimeInput
                      {...form.getFieldProps("startDate")}
                      required
                      type="datetime-local"
                      wrapperClass="border-gray-600"
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
                    <span className=" font-bold">End date</span>
                    <BaseDatetimeInput
                      {...form.getFieldProps("endDate")}
                      required
                      type="datetime-local"
                      wrapperClass="border-gray-600"
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
                </div>
                <div className="mt-8">
                  <span className="my-3 font-bold">Timezone</span>
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
              <div className="mt-10 w-3/5 max-w-[250px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
                <strong>Minutes</strong>
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
              </div>
            </section>
          </ContractFormRowSection>
          <button
            id="showValues"
            className="hidden"
            onClick={(e) => displayValues(e)}
          ></button>
        </form>
      </div>
    </>
  );
};

export default DutchAuctionFormFields;
