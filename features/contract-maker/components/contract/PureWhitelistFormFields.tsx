/* eslint-disable @typescript-eslint/ban-types */
import { doc, onSnapshot } from "firebase/firestore";
import React, { FC, useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
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

const PureWhitelistFormFields: FC<AppProps> = ({ form, isPreview = false }) => {
  const [values, setValues] = useState<any>();

  const project = useSelector(getProjectState) as IProject;

  const path = `Projects/${project.slug}/Contract-Maker/draft/pureWhitelist/draft`;

  useEffect(() => {
    const _doc = doc(
      firestore,
      path
    );
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setValues(snapshot.data());
      console.log(snapshot.data());
      
    });

    return () => {
      unsubscribe();
    };
  }, [project.slug]);

  async function handleSaveContractMaker(
    field: string,
    value: string | boolean | { title: string; description: string }[]
  ) {
    const saveDraft = await saveContractMaker(
      "pureWhitelist",
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

  const displayValues = () => {
    console.log('Logging Pure Whitelist Form user inputs');
    console.log(values); 
  }
  
  return (
    <div className="pt-6">
      <div className="mx-auto flex flex-col divide-y-2 divide-gray-200 pb-6">
        <form onSubmit={displayValues}>
          <ContractFormRowSection className="pt-5 pb-8" name="Details">
            {/* <article className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2 2xl:grid-cols-3"> */}
            <article className="">
              <div className="mb-8 flex flex-col">
                <span className="mb-1 flex flex-col">
                  Quantity of collection
                </span>
                <BaseInput
                  required
                  disabled={isPreview}
                  {...form.getFieldProps("quantityOfCollection")}
                  type="number"
                  wrapperClass="w-40"
                  error={
                    form.touched.quantityOfCollection &&
                    form.errors.quantityOfCollection ? (
                      <div>{form.errors.quantityOfCollection}</div>
                    ) : null
                  }
                  value={values?.quantityOfCollection}
                  onChange={(e) => {
                    updateContract("quantityOfCollection", e.target.value);
                  }}
                  onBlur={(e) => {
                    updateContract("quantityOfCollection", e.target.value);
                  }}
                />
              </div>
              <div className="mb-8 flex flex-col ">
                <span className="mb-1 flex flex-col">Mint Price</span>
                <BaseInput
                  required
                  disabled={isPreview}
                  {...form.getFieldProps("mintPrice")}
                  wrapperClass="w-40"
                  type="number"
                  placeholder="Price"
                  error={
                    form.touched.mintPrice && form.errors.mintPrice ? (
                      <p className="text-base text-red-500">
                        {form.errors.mintPrice}
                      </p>
                    ) : null
                  }
                  postfix={
                    <span className="font-semibold text-indigo-800">ETH</span>
                  }
                  value={values?.mintPrice}
                  onChange={(e) => {
                    updateContract("mintPrice", e.target.value);
                  }}
                  onBlur={(e) => {
                    updateContract("mintPrice", e.target.value);
                  }}
                />
              </div>
              <div className="mb-8 flex flex-col">
                <span className="mb-1 flex flex-col">
                  Number of reserved tokens
                </span>
                <BaseInput
                  required
                  disabled={isPreview}
                  {...form.getFieldProps("reservedTokens")}
                  type="number"
                  error={
                    form.touched.reservedTokens &&
                    form.errors.reservedTokens ? (
                      <p className="text-base text-red-500">
                        {form.errors.reservedTokens}
                      </p>
                    ) : null
                  }
                  wrapperClass="w-40"
                  value={values?.reservedTokens}
                  onChange={(e) => {
                    updateContract("reservedTokens", e.target.value);
                  }}
                  onBlur={(e) => {
                    updateContract("reservedTokens", e.target.value);
                  }}
                />
              </div>
              <div className="mb-8 flex flex-col">
                <span className="mb-1 flex flex-col">
                  Maximum mint per wallet
                </span>
                <BaseInput
                  disabled={isPreview}
                  {...form.getFieldProps("maxMintPerWallet")}
                  type="number"
                  wrapperClass="w-40"
                  error={
                    form.touched.maxMintPerWallet &&
                    form.errors.maxMintPerWallet ? (
                      <p className="text-base text-red-500">
                        {form.errors.maxMintPerWallet}
                      </p>
                    ) : null
                  }
                  value={values?.maxMintPerWallet}
                  onChange={(e) => {
                    updateContract("maxMintPerWallet", e.target.value);
                  }}
                  onBlur={(e) => {
                    updateContract("maxMintPerWallet", e.target.value);
                  }}
                />
              </div>
              <div className="mb-5 flex flex-col">
                <span className="mb-1 flex flex-col">
                  Maximum mint per transaction
                </span>
                <BaseInput
                  disabled={isPreview}
                  {...form.getFieldProps("maxMintPerTransaction")}
                  type="number"
                  wrapperClass="w-40"
                  error={
                    form.touched.maxMintPerTransaction &&
                    form.errors.maxMintPerTransaction ? (
                      <p className="text-base text-red-500">
                        {form.errors.maxMintPerTransaction}
                      </p>
                    ) : null
                  }
                  value={values?.maxMintPerTransaction}
                  onChange={(e) => {
                    updateContract("maxMintPerTransaction", e.target.value);
                  }}
                  onBlur={(e) => {
                    updateContract("maxMintPerTransaction", e.target.value);
                  }}
                />
              </div>
            </article>
          </ContractFormRowSection>

          <div className="mx-auto flex flex-col divide-y-2 divide-gray-200 pb-6">
            {/* Timing */}
            <ContractFormRowSection className="pt-5 pb-8" name="Timing">
              <article>
                {/* <h4 className="mt-10 ">Timing</h4> */}
                <section className="mb-10">
                  <div className="flex w-3/5 flex-col">
                    <div className="flex w-full flex-row items-center justify-between">
                      <div className="flex flex-col">
                        <span className="my-3">Start date</span>
                        <BaseDatetimeInput
                          {...form.getFieldProps("startDate")}
                          required
                          disabled={isPreview}
                          type="datetime-local"
                          wrapperClass="border-gray-600"
                          error={
                            form.touched.startDate && form.errors.startDate ? (
                              <p className="text-base text-red-500">
                                {form.errors.startDate}
                              </p>
                            ) : null
                          }
                          value={values?.startDate}
                          onChange={(e) => {
                            updateContract("startDate", e.target.value);
                          }}
                          onBlur={(e) => {
                            updateContract("startDate", e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="my-3">End date</span>
                        <BaseDatetimeInput
                          {...form.getFieldProps("endDate")}
                          required
                          disabled={isPreview}
                          type="datetime-local"
                          wrapperClass="border-gray-600"
                          error={
                            form.touched.endDate && form.errors.endDate ? (
                              <p className="text-base text-red-500">
                                {form.errors.endDate}
                              </p>
                            ) : null
                          }
                          value={values?.endDate}
                          onChange={(e) => {
                            updateContract("endDate", e.target.value);
                          }}
                          onBlur={(e) => {
                            updateContract("endDate", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-8">
                      <span className="my-3 font-bold">Timezone</span>
                      <BaseTimezoneSelector
                        {...form.getFieldProps("timezone")}
                        disabled={isPreview}
                        error={
                          form.touched.timezone && form.errors.timezone ? (
                            <p className="text-base text-red-500">
                              {form.errors.timezone}
                            </p>
                          ) : null
                        }
                        defaultValue={values?.timezone}
                        value={values?.timezone}
                        onChange={(e) => {
                          updateContract("timezone", e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-10 w-3/5 max-w-[250px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
                    <strong>Minutes</strong>
                    {isPreview ? (
                      <p className="mt-3 rounded-md bg-white py-1 px-2 !text-gray-800 ring-1 ring-gray-200 ">
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
                        value={values?.minutes}
                        onChange={(e) => {
                          updateContract("minutes", e.name);
                        }}
                        onBlur={(e) => {
                          updateContract("minutes", e.name);
                        }}
                      />
                    )}
                  </div>
                </section>
                <input
                  id="form-submit"
                  type="submit"
                  className="hidden"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Form submitted.");
                  }}
                />
              </article>
            </ContractFormRowSection>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PureWhitelistFormFields;
