import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { updateClassicMint } from "redux/reducers/slices/contract";
import * as Yup from "yup";

import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
import DateTimeRangePicker from "@/components/controls/DateTimeRangePicker";
import ContractFormRowSection from "@/components/layout/ContractRowSection";

const ClassicMint = () => {
  const dispatch = useDispatch();

  const classicMintForm = useFormik({
    initialValues: {
      quantityOfCollection: 0,
      mintPrice: 0,
      reservedTokens: 0,
      maxMintPerWallet: 0,
      maxMintPerTransaction: 0,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    },
    validationSchema: Yup.object({
      quantityOfCollection: Yup.number()
        .min(1, "*expected value 1 or more")
        .required("*quantity is required"),
      mintPrice: Yup.number()
        .required("*mint price is required")
        .positive("*mint price should be positive"),
      reservedTokens: Yup.number()
        .required("*how many tokens should be reserved?")
        .positive("*number should be positive"),
      maxMintPerWallet: Yup.number().required(
        "*max mint per wallet is required"
      ),
      maxMintPerTransaction: Yup.number().required(
        "*max mint per transaction is required"
      ),
    }),
    onSubmit: (values, formik) => {
      console.log(values);
    },
  });

  function handleOnChange(key: string, value: string) {
    value = value.trim();

    dispatch(
      updateClassicMint({
        key,
        value: value.length === 0 ? undefined : parseInt(value),
      })
    );
  }

  return (
    <div className="py-8">
      <section className="mt-6 flex flex-col gap-y-4">
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Quantity of collection"
        >
          <BaseInput
            {...classicMintForm.getFieldProps("quantityOfCollection")}
            type="number"
            wrapperClass="w-full"
            placeholder="Quantity"
            error={
              classicMintForm.touched.quantityOfCollection &&
              classicMintForm.errors.quantityOfCollection ? (
                <div>{classicMintForm.errors.quantityOfCollection}</div>
              ) : null
            }
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Mint Price"
        >
          <BaseInput
            wrapperClass="w-full"
            type="number"
            placeholder="Price"
            {...classicMintForm.getFieldProps("mintPrice")}
            error={
              classicMintForm.touched.mintPrice &&
              classicMintForm.errors.mintPrice ? (
                <p className="text-base text-red-500">
                  {classicMintForm.errors.mintPrice}
                </p>
              ) : null
            }
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Number of tokens to reserve"
        >
          <BaseInput
            type="number"
            {...classicMintForm.getFieldProps("reservedTokens")}
            error={
              classicMintForm.touched.reservedTokens &&
              classicMintForm.errors.reservedTokens ? (
                <p className="text-base text-red-500">
                  {classicMintForm.errors.reservedTokens}
                </p>
              ) : null
            }
            wrapperClass="w-full"
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Max mint per wallet"
        >
          <BaseInput
            {...classicMintForm.getFieldProps("maxMintPerWallet")}
            error={
              classicMintForm.touched.maxMintPerWallet &&
              classicMintForm.errors.maxMintPerWallet ? (
                <p className="text-base text-red-500">
                  {classicMintForm.errors.maxMintPerWallet}
                </p>
              ) : null
            }
            type="number"
            wrapperClass="w-full"
          />
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Max mint per transaction"
        >
          <BaseInput
            {...classicMintForm.getFieldProps("maxMintPerTransaction")}
            error={
              classicMintForm.touched.maxMintPerTransaction &&
              classicMintForm.errors.maxMintPerTransaction ? (
                <p className="text-base text-red-500">
                  {classicMintForm.errors.maxMintPerTransaction}
                </p>
              ) : null
            }
            type="number"
            wrapperClass="w-full"
          />
        </ContractFormRowSection>
      </section>
      <h4 className="mt-10">Timing</h4>
      <section className="mb-10 mt-3 flex items-start  gap-10">
        <div className="flex-1">
          <DateTimeRangePicker />
        </div>
        <div className="max-w-[250px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
          <strong>Minutes</strong>
          <BaseSelect
            options={[]}
            buttonClass="!bg-white ring-1 mt-1 ring-gray-200 !text-gray-800"
            selectorIconColor="black"
          />
        </div>
      </section>
    </div>
  );
};

export default ClassicMint;
