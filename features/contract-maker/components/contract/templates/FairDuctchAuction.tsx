import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { getContract } from "redux/reducers/selectors/contract";
import * as Yup from "yup";

import useWhitelistForm from "@/hooks/useWhitelistForm";

import StepperFooter from "@/components/contract/StepperFooter";

import WhitelistForm from "./Whitelist";
import DutchAuctionFormFields from "../DutchFormFields";

const FairDutchAuction = () => {
  const { type, whitelisted } = useSelector(getContract);
  const whitelistForm = useWhitelistForm();

  const fairDutchAuctionForm = useFormik({
    initialValues: {
      quantity: 0,
      startingPrice: 0,
      endingPrice: 0,
      decrementAmount: 0,
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required("enter collection quantity")
        .positive("expected positive value"),
      startingPrice: Yup.number()
        .required("enter starting price")
        .min(0, "starting price is required"),
      endingPrice: Yup.number()
        .required("ending price is required")
        .min(0, "expected positive value"),
      decrementAmount: Yup.number()
        .required("enter collection quantity")
        .positive("expected positive value"),
    }),
    onSubmit: (values, formik) => {
      console.log(values);
    },
  });

  function isValid(): boolean {
    fairDutchAuctionForm.handleSubmit();
    if (whitelisted) {
      whitelistForm.handleSubmit();
      return fairDutchAuctionForm.isValid && whitelistForm.isValid;
    }

    return fairDutchAuctionForm.isValid;
  }

  return (
    <div>
      <DutchAuctionFormFields form={fairDutchAuctionForm} />
      {type.toLowerCase().trim() !== "pure whitelist" && whitelisted && (
        <div>
          <h2 className="pt-8 text-xl text-indigo-800">Whitelist</h2>
          {whitelisted && <WhitelistForm form={whitelistForm} />}
        </div>
      )}
      <StepperFooter beforeStep={isValid} />
    </div>
  );
};

export default FairDutchAuction;
