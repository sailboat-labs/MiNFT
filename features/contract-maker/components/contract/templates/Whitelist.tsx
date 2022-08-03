import { Formik, useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getContractByField } from "redux/reducers/selectors/contract";
import * as Yup from "yup";

import BaseDatetimeInput from "@/components/controls/BaseDatetimeInput";
import BaseInput from "@/components/controls/BaseInput";
import BaseTimezoneSelector from "@/components/controls/BaseTimezoneSelector";
import ContractFormRowSection from "@/components/layout/ContractRowSection";

const WhitelistForm = () => {
  const contractType = useSelector(getContractByField("type"));
  const dispatch = useDispatch();

  const whitelistForm = useFormik({
    initialValues: {
      mintPrice: 0,
      totalQuantity: 0,
      quantity: 0,
      reservedTokensCount: 0,
      maxMintPerWhitelistWallet: 0,
      maxMintPerWallet: 0,
      maxMintPerTransaction: 0,
      startDate: "",
      endDate: "",
      timezone: "",
    },
    validationSchema: Yup.object({
      mintPrice: Yup.number()
        .required("enter mint price")
        .positive("expected positive value"),
      totalQuantity: Yup.number()
        .required("enter mint price")
        .positive("total whitelisted quantity should be a positive value"),
      quantity: Yup.number()
        .required("enter mint quantity")
        .positive("quantity should  be positive"),
      reservedTokensCount: Yup.number()
        .required("how many tokens should be reserved?")
        .positive("tokens reserved should  be positive"),
      maxMintPerWhitelistWallet: Yup.number()
        .required("max mint per whitelisted wallet is required")
        .positive("value should be positive"),
      maxMintPerWallet: Yup.number()
        .required("max mint per wallet is required")
        .positive("value should be positive"),
      maxMintPerTransaction: Yup.number()
        .required("max mint per transaction is required")
        .positive("value should be positive"),
      startDate: Yup.date().required("End date is required").nullable(false),
      endDate: Yup.date().required("End date is required").nullable(false),
      timezone: Yup.string().required("Timezone is required").nullable(false),
    }),
    onSubmit: (values, formik) => {
      // todo: on submit
      console.log(values);
    },
  });

  return (
    <Formik
      initialValues={whitelistForm.initialValues}
      validationSchema={whitelistForm.validationSchema}
      onSubmit={whitelistForm.onSubmit}
    >
      {(formik) => (
        <form>
          <div className="mx-auto flex flex-col divide-y-2 divide-gray-200 pb-6">
            {/* Timing */}
            <ContractFormRowSection className="pt-5 pb-8" name="Timing">
              <article>
                <strong className="font-semibold">Launch Time</strong>
                <div className="flex gap-1 py-2">
                  <input
                    id="classic-1"
                    type="radio"
                    {...whitelistForm.getFieldProps("same")}
                    className="mt-1"
                    value="same"
                  />
                  <label htmlFor="classic-1" className="ml-1">
                    The same as for classic participants
                  </label>
                </div>
                <div className="flex gap-1">
                  <input
                    id="special-time"
                    type="radio"
                    {...whitelistForm.getFieldProps("same")}
                    className="mt-1"
                    value="special"
                  />
                  <label htmlFor="special-time" className="ml-1">
                    Special Time
                  </label>
                </div>
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
                        onChange={(e) =>
                          (formik.values.endDate = e.target.value)
                        }
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
              </article>
            </ContractFormRowSection>
            {/* Price & Quantity */}
            <ContractFormRowSection className="py-8" name="Price & Quantity">
              <article>
                <strong className="py-2 font-semibold">Mint price</strong>
                <div className="flex gap-1 py-2">
                  <input
                    id="price-classic-1"
                    type="checkbox"
                    className="mt-1"
                    value="The same as for classic participants"
                  />
                  <label htmlFor="price-classic-1" className="ml-1">
                    The same as for classic participants
                  </label>
                </div>
                <div className="flex gap-1">
                  <input
                    id="special-price"
                    type="checkbox"
                    className="mt-1"
                    value="Special price"
                  />
                  <label htmlFor="special-price" className="ml-1">
                    Special price
                  </label>
                </div>
                <BaseInput
                  type="number"
                  wrapperClass="mt-3 md:w-32"
                  {...whitelistForm.getFieldProps("mintPrice")}
                  error={
                    whitelistForm.touched.mintPrice &&
                    whitelistForm.errors.mintPrice ? (
                      <p className="text-base text-red-500">
                        {whitelistForm.errors.mintPrice}
                      </p>
                    ) : null
                  }
                  postfix={<span className="font-semibold ">ETH</span>}
                />
                <div className="mt-6 flex flex-col gap-2">
                  <label className="font-semibold">
                    Total whitelist quantity
                  </label>
                  <BaseInput
                    wrapperClass="mt-3 md:w-1/3"
                    {...whitelistForm.getFieldProps("totalQuantity")}
                    error={
                      whitelistForm.touched.totalQuantity &&
                      whitelistForm.errors.totalQuantity ? (
                        <p className="text-base text-red-500">
                          {whitelistForm.errors.totalQuantity}
                        </p>
                      ) : null
                    }
                    type="number"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <label className="font-semibold">
                    {contractType} quantity
                  </label>
                  <BaseInput
                    wrapperClass="mt-3 md:w-1/3"
                    {...whitelistForm.getFieldProps("quantity")}
                    error={
                      whitelistForm.touched.quantity &&
                      whitelistForm.errors.quantity ? (
                        <p className="text-base text-red-500">
                          {whitelistForm.errors.quantity}
                        </p>
                      ) : null
                    }
                    type="number"
                  />
                </div>
              </article>
            </ContractFormRowSection>
            {/* Limitations */}
            <ContractFormRowSection className="pt-8" name="Limitations">
              <article className="grid  md:grid-cols-2 2xl:grid-cols-4">
                <div className="mt-6 flex flex-col gap-2">
                  <label className="font-semibold">
                    Number of tokens to reserve
                  </label>
                  <BaseInput
                    {...whitelistForm.getFieldProps("reservedTokensCount")}
                    error={
                      whitelistForm.touched.reservedTokensCount &&
                      whitelistForm.errors.reservedTokensCount ? (
                        <p className="text-base text-red-500">
                          {whitelistForm.errors.reservedTokensCount}
                        </p>
                      ) : null
                    }
                    type="number"
                    wrapperClass="md:w-1/2"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <label className="font-semibold">
                    Maximum Mint per whitelisted wallet
                  </label>
                  <BaseInput
                    {...whitelistForm.getFieldProps(
                      "maxMintPerWhitelistWallet"
                    )}
                    error={
                      whitelistForm.touched.maxMintPerWhitelistWallet &&
                      whitelistForm.errors.maxMintPerWhitelistWallet ? (
                        <p className="text-base text-red-500">
                          {whitelistForm.errors.maxMintPerWhitelistWallet}
                        </p>
                      ) : null
                    }
                    type="number"
                    wrapperClass="md:w-1/2"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <label className="font-semibold">
                      Maximum Mint per transaction
                    </label>
                  </div>
                  <BaseInput
                    {...whitelistForm.getFieldProps("maxMintPerTransaction")}
                    error={
                      whitelistForm.touched.maxMintPerTransaction &&
                      whitelistForm.errors.maxMintPerTransaction ? (
                        <p className="text-base text-red-500">
                          {whitelistForm.errors.maxMintPerTransaction}
                        </p>
                      ) : null
                    }
                    type="number"
                    wrapperClass="md:w-1/2"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <label className="font-semibold">
                    Maximum Mint per wallet
                  </label>
                  <BaseInput
                    {...whitelistForm.getFieldProps("maxMintPerWallet")}
                    error={
                      whitelistForm.touched.maxMintPerWallet &&
                      whitelistForm.errors.maxMintPerWallet ? (
                        <p className="text-base text-red-500">
                          {whitelistForm.errors.maxMintPerWallet}
                        </p>
                      ) : null
                    }
                    type="number"
                    wrapperClass="md:w-1/2"
                  />
                </div>
              </article>
            </ContractFormRowSection>
          </div>
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
  );
};

export default WhitelistForm;
