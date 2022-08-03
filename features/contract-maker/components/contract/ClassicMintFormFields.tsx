/* eslint-disable @typescript-eslint/ban-types */
import { doc, onSnapshot } from "firebase/firestore";
import { Formik } from "formik";
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
}

const ClassicMintFormFields: FC<AppProps> = ({ form }) => {
  const [values, setValues] = useState({});

  const project = useSelector(getProjectState) as IProject;

  useEffect(() => {
    const _doc = doc(
      firestore,
      `Projects/${project.slug}/Contract-Maker/draft`
    );
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setValues({...snapshot.data()});
      console.log("Retrieved values are: ", values);
      console.log("Snapshot data", snapshot.data());

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
    <div className="pt-6">
      <Formik
        initialValues={form.initialValues}
        validationSchema={form.validationSchema}
        onSubmit={(values) => {
          console.log(values);
          // handleUpdateStore(values);
        }}
        isInitialValid={false}
      >
        {(formik) => (
          <form onSubmit={form.handleSubmit}>
            <section className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2 2xl:grid-cols-3">
              <ContractFormRowSection
                headingClass="font-semibold text-base"
                name="Quantity of collection"
                className="mb-5 flex items-center"
              >
                <BaseInput
                  required
                  {...form.getFieldProps("quantityOfCollection")}
                  type="number"
                  wrapperClass="w-40"
                  error={
                    form.touched.quantityOfCollection &&
                    form.errors.quantityOfCollection ? (
                      <div>{form.errors.quantityOfCollection}</div>
                    ) : null
                  }
                  // onChange={(e) => {
                  //   updateContract("quantityOfCollection", e.target.value);
                  // }}
                  onBlur={(e) => {
                    updateContract("quantityOfCollection", e.target.value);
                  }}
                  // value={values?.quantityOfCollection}
                  // defaultValue={values?.quantityOfCollection}
                />
              </ContractFormRowSection>
              <ContractFormRowSection
                headingClass="font-semibold text-base"
                name="Mint Price"
                className="mb-5 flex items-center "
              >
                <BaseInput
                  required
                  defaultValue={values?.mintPrice}
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
                  onBlur={(e) => {
                    updateContract("mintPrice", e.target.value);
                  }}
                />
              </ContractFormRowSection>
              <ContractFormRowSection
                headingClass="font-semibold text-base"
                name="Number of tokens to reserve"
                className="mb-5 flex items-center"
              >
                <BaseInput
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
                />
              </ContractFormRowSection>
              <ContractFormRowSection
                headingClass="font-semibold text-base"
                name="Maximum mint per wallet"
                className="mb-5 flex items-center"
              >
                <BaseInput
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
                />
              </ContractFormRowSection>
              <ContractFormRowSection
                headingClass="font-semibold text-base"
                name="Maximum mint per transaction"
                className="mb-5 flex items-center"
              >
                <BaseInput
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
                />
              </ContractFormRowSection>
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
                  error={
                    form.touched.minutes && form.errors.minutes ? (
                      <p className="text-base text-red-500">
                        {form.errors.minutes}
                      </p>
                    ) : null
                  }
                  onChange={(e) => console.log(e)}
                />
              </div>
            </section>
            <input
              id="form-submit"
              type="submit"
              className="hidden"
              onClick={(e) => {
                e.preventDefault();
                console.log("Form submitted.");
                formik.handleSubmit();
              }}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ClassicMintFormFields;
