import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

import ClassicMintFormFields from "../ClassicMintFormFields";
import StepperFooter from "../StepperFooter";

const PureWhitelist = () => {
  const pureWhitelistForm = useFormik({
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

  function isValid(): boolean {
    pureWhitelistForm.handleSubmit();
    return pureWhitelistForm.isValid;
  }

  return (
    <>
      <ClassicMintFormFields form={pureWhitelistForm} />
      <StepperFooter beforeStep={isValid} />
    </>
  );
};

export default PureWhitelist;
