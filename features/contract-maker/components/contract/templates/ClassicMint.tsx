import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { getContract } from "redux/reducers/selectors/contract";
import * as Yup from "yup";

import useWhitelistForm from "@/hooks/useWhitelistForm";

import StepperFooter from "@/components/contract/StepperFooter";

import WhitelistForm from "./Whitelist";
import ClassicMintFormFields from "../ClassicMintFormFields";

const ClassicMint = () => {
  const { type, whitelisted } = useSelector(getContract);
  const whitelistForm = useWhitelistForm();

  const classicMintForm = useFormik({
    initialValues: {
      quantityOfCollection: 1,
      mintPrice: 0,
      reservedTokens: 0,
      maxMintPerWallet: 1,
      maxMintPerTransaction: 0,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      startDateTimeZone: "",
      endDateTimeZone: "",
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
      startDate: Yup.date().default(() => new Date()),
      endDate: Yup.date().default(() => new Date()),
      startDateTimezone: Yup.string().required("timezone is required"),
      endDateTimezone: Yup.string().required("timezone is required"),
    }),
    onSubmit: (values, formik) => {
      console.log(values);
    },
  });

  function isValid(): boolean {
    classicMintForm.submitForm();
    if (whitelisted) {
      whitelistForm.submitForm();
      return classicMintForm.isValid && whitelistForm.isValid;
    }

    return classicMintForm.isValid;
  }

  return (
    <div>
      <ClassicMintFormFields form={classicMintForm} />
      <div>
        {type.toLowerCase().trim() !== "pure whitelist" && whitelisted && (
          <>
            <h2 className="pt-8 text-xl text-indigo-800">Whitelist</h2>
            {whitelisted && <WhitelistForm form={whitelistForm} />}
          </>
        )}
        <StepperFooter beforeStep={isValid} />
      </div>
    </div>
  );
};

export default ClassicMint;
