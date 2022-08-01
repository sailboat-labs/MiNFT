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
    dispatch(updateClassicMint(values));
  };

  return (
    <div className="pt-6">
      <Formik
        initialValues={form.initialValues}
        validationSchema={form.validationSchema}
        onSubmit={form.handleSubmit}
        validator={() => ({})}
      >
        {(formik) => (
          <form onSubmit={form.handleSubmit}>
            <section className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2 2xl:grid-cols-3">
              <ContractFormRowSection
                headingClass="font-semibold text-base"
                name="Quantity of collection"
                className="mb-5 flex items-center"
              >
                {/* <BaseInput
                  {...form.getFieldProps("quantityOfCollection")}
                  type="number"
                  wrapperClass="w-40"
                  placeholder="Quantity"
                  error={
                    form.touched.quantityOfCollection &&
                    form.errors.quantityOfCollection ? (
                      <div>{form.errors.quantityOfCollection}</div>
                    ) : null
                  }
                  onChange={form.handleChange}
                  value={form.values.quantityOfCollection}
                  onBlur={(e) => {
                    if (!form.errors.quantityOfCollection) {
                      // handleUpdateStore({
                      //   key: "quantityOfCollection",
                      //   value: e.target.value,
                      // });
                    }
                  }}
                /> */}
                <BaseInput
                  {...form.getFieldProps("quantityOfCollection")}
                  type="number"
                  wrapperClass="w-full"
                  placeholder="Quantity"
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
                className="mb-5 flex items-center"
              >
                {/* <BaseInput
                  required
                  wrapperClass="w-40"
                  type="number"
                  placeholder="Price"
                  {...form.getFieldProps("mintPrice")}
                  value={form.values.mintPrice}
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
                    // handleUpdateStore({
                    //   key: "mintPrice",
                    //   value: e.target.value,
                    // });
                  }}
                /> */}
                <BaseInput
                  wrapperClass="w-full"
                  type="number"
                  placeholder="Price"
                  {...form.getFieldProps("mintPrice")}
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
                {/* <BaseInput
                  required
                  type="number"
                  value={form.values.reservedTokens}
                  {...form.getFieldProps("reservedTokens")}
                  error={
                    form.touched.reservedTokens &&
                    form.errors.reservedTokens ? (
                      <p className="text-base text-red-500">
                        {form.errors.reservedTokens}
                      </p>
                    ) : null
                  }
                  wrapperClass="w-40"
                  onBlur={(e) => {
                    // handleUpdateStore({
                    //   key: "reservedTokens",
                    //   value: e.target.value,
                    // });
                  }}
                /> */}
                <BaseInput
                  type="number"
                  {...form.getFieldProps("reservedTokens")}
                  error={
                    form.touched.reservedTokens &&
                    form.errors.reservedTokens ? (
                      <p className="text-base text-red-500">
                        {form.errors.reservedTokens}
                      </p>
                    ) : null
                  }
                  wrapperClass="w-full"
                />
              </ContractFormRowSection>
              <ContractFormRowSection
                headingClass="font-semibold text-base"
                name="Maximum mint per wallet"
                className="mb-5 flex items-center"
              >
                {/* <BaseInput
                  required
                  value={form.values.maxMintPerWallet}
                  {...form.getFieldProps("maxMintPerWallet")}
                  error={
                    form.touched.maxMintPerWallet &&
                    form.errors.maxMintPerWallet ? (
                      <p className="text-base text-red-500">
                        {form.errors.maxMintPerWallet}
                      </p>
                    ) : null
                  }
                  type="number"
                  wrapperClass="w-40"
                  onBlur={(e) => {
                    // handleUpdateStore({
                    //   key: "maxMintPerWallet",
                    //   value: e.target.value,
                    // });
                  }}
                /> */}
                <BaseInput
                  {...form.getFieldProps("maxMintPerWallet")}
                  error={
                    form.touched.maxMintPerWallet &&
                    form.errors.maxMintPerWallet ? (
                      <p className="text-base text-red-500">
                        {form.errors.maxMintPerWallet}
                      </p>
                    ) : null
                  }
                  type="number"
                  wrapperClass="w-full"
                />
              </ContractFormRowSection>
              <ContractFormRowSection
                headingClass="font-semibold text-base"
                name="Maximum mint per transaction"
                className="mb-5 flex items-center"
              >
                {/* <BaseInput
                  required
                  value={form.values.maxMintPerTransaction}
                  {...form.getFieldProps("maxMintPerTransaction")}
                  error={
                    form.touched.maxMintPerTransaction &&
                    form.errors.maxMintPerTransaction ? (
                      <p className="text-base text-red-500">
                        {form.errors.maxMintPerTransaction}
                      </p>
                    ) : null
                  }
                  type="number"
                  wrapperClass="w-40"
                  onBlur={(e) => {
                    // handleUpdateStore({
                    //   key: "maxMintPerTransaction",
                    //   value: e.target.value,
                    // });
                  }}
                /> */}
                <BaseInput
                  {...form.getFieldProps("maxMintPerTransaction")}
                  error={
                    form.touched.maxMintPerTransaction &&
                    form.errors.maxMintPerTransaction ? (
                      <p className="text-base text-red-500">
                        {form.errors.maxMintPerTransaction}
                      </p>
                    ) : null
                  }
                  type="number"
                  wrapperClass="w-full"
                />
              </ContractFormRowSection>
            </section>
            <h4 className="mt-10 ">Timing</h4>
            <section className="mb-10 mt-3">
              <div className="flex w-1/2 flex-col">
                {/* <DateTimeRangePicker
            onRangeChange={(e) => console.log("Date is changed to:", e)}
          /> */}
                <div className="flex w-full flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <span className="my-3 font-bold">Start date</span>
                    <BaseDatetimeInput
                      {...form.getFieldProps("startDate")}
                      error={
                        form.touched.startDate &&
                        form.errors.maxMintPerWallet ? (
                          <p className="text-base text-red-500">
                            {form.errors.startDate}
                          </p>
                        ) : null
                      }
                      type="datetime-local"
                      wrapperClass="border-gray-600"
                      // onChange={(e) => {
                        // const day = e.target.value.substring(0, 10);
                        // const time = e.target.value.substring(11);
                        // handleUpdateStore({
                        //   key: "startDateTime",
                        //   value: e.target.value,
                        // });
                        // handleUpdateStore({
                        //   key: "startDay",
                        //   value: day,
                        // });
                        // handleUpdateStore({
                        //   key: "startTime",
                        //   value: time,
                        // });
                      //}}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="my-3 font-bold">End date</span>
                    <BaseDatetimeInput
                      //required
                      value={form.values.endDate}
                      {...form.getFieldProps("endDate")}
                      error={
                        form.touched.startDate &&
                        form.errors.maxMintPerWallet ? (
                          <p className="text-base text-red-500">
                            {form.errors.startDate}
                          </p>
                        ) : null
                      }
                      type="datetime-local"
                      wrapperClass="border-gray-600"
                      //onChange={(e) => {
                        // const day = e.target.value.substring(0, 10);
                        // const time = e.target.value.substring(11);
                        // handleUpdateStore({
                        //   key: "endDateTime",
                        //   value: e.target.value,
                        // });
                        // handleUpdateStore({
                        //   key: "endDay",
                        //   value: day,
                        // });
                        // handleUpdateStore({
                        //   key: "endTime",
                        //   value: time,
                        // });
                      //}}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <span className="my-3 font-bold">Timezone</span>
                  <BaseTimezoneSelector
                    value={form.values.quantityOfCollection}
                  />
                </div>
              </div>
              <div className="mt-10 w-1/2 max-w-[250px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
                <strong>Minutes</strong>
                <BaseSelect
                  options={Array(60)
                    .fill(null)
                    .map((_, index) => ({ name: index + 1 }))}
                  buttonClass="!bg-white ring-1 mt-1 ring-gray-200 !text-gray-800"
                  selectorIconColor="black"
                  onChange={(e) => {
                    // handleUpdateStore({
                    //   key: "minutes",
                    //   value: e.name,
                    // });
                  }}
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
              }}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ClassicMintFormFields;
