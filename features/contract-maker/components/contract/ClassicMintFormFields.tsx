import { Formik } from "formik";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useStore } from "react-redux";
import { updateClassicMint } from "redux/reducers/slices/contract";

import BaseDatetimeInput from "@/components/controls/BaseDatetimeInput";
import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
import BaseTimezoneSelector from "@/components/controls/BaseTimezoneSelector";
import ContractFormRowSection from "@/components/layout/ContractRowSection";

interface AppProps {
  form: any;
}

const ClassicMintFormFields: FC<AppProps> = ({ form }) => {
  const dispatch = useDispatch();

  const store = useStore();

  const handleUpdateStore = (values: any) => {
    
    for (const valueKey in values) {
      dispatch(updateClassicMint({'key': valueKey, 'value': values[valueKey]}))
    }
    console.log('Store state is:', store.getState())
  };

  return (
    <div className="pt-6">
      <Formik
        initialValues={form.initialValues}
        validationSchema={form.validationSchema}
        onSubmit={(values) => {
          console.log(values);
          handleUpdateStore(values)
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
                  placeholder="Quantity"
                  onBlur={(e) =>
                    (formik.values.quantityOfCollection = e.target.value)
                  }
                  error={
                    form.touched.quantityOfCollection &&
                    form.errors.quantityOfCollection ? (
                      <div>{form.errors.quantityOfCollection}</div>
                    ) : null
                  }
                />
              </ContractFormRowSection>
              <ContractFormRowSection
                headingClass="font-semibold text-base"
                name="Mint Price"
                className="mb-5 flex items-center "
              >
                <BaseInput
                  required
                  {...form.getFieldProps("mintPrice")}
                  wrapperClass="w-40"
                  type="number"
                  placeholder="Price"
                  onBlur={(e) => (formik.values.mintPrice = e.target.value)}
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
                  onBlur={(e) =>
                    (formik.values.reservedTokens = e.target.value)
                  }
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
                  onBlur={(e) =>
                    (formik.values.maxMintPerWallet = e.target.value)
                  }
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
                  onBlur={(e) =>
                    (formik.values.maxMintPerTransaction = e.target.value)
                  }
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
                      onChange={(e) =>
                        (formik.values.startDate = e.target.value)
                      }
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
                      formik.values.timezone = e;
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
                    formik.values.minutes = e.name;
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
