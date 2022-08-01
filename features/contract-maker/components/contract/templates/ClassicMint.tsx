import { Formik, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

import ClassicMintFormFields from "../ClassicMintFormFields";

const ClassicMint = () => {
  const classicMintForm = useFormik({
    // initialValues: {
    //   quantityOfCollection: 0,
    //   mintPrice: 0,
    //   reservedTokens: 0,
    //   maxMintPerWallet: 0,
    //   maxMintPerTransaction: 0,
    //   startDate: null,
    //   endDate: null,
    //   startTime: null,
    //   endTime: null,
    // },
    initialValues: {
      quantityOfCollection: 0,
      mintPrice: 0,
      reservedTokens: 0,
      maxMintPerWallet: 0,
      maxMintPerTransaction: 0,
      startDate: null,
      endDate: null,
      timezone: null,
      minutes: 0,
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
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().required("End date is required"),
      timezone: Yup.string().required("Timezone is required"),
      minutes: Yup.string()
    }),
    onSubmit: (values, formik) => {
      console.log("Values are ", values);
      alert(values);
    },
  });

  return <ClassicMintFormFields form={classicMintForm} />;
};

export default ClassicMint;
