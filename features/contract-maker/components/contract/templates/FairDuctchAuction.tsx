import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

import DutchAuctionFormFields from "../DutchFormFields";

// const FairDutchAuction = () => {
//   const fairDutchAuctionForm = useFormik({
//     initialValues: {
//       quantity: 0,
//       startingPrice: 0,
//       endingPrice: 0,
//       decrementAmount: 0,
//     },
//     validationSchema: Yup.object({
//       quantity: Yup.number()
//         .required("enter collection quantity")
//         .positive("expected positive value"),
//       startingPrice: Yup.number()
//         .required("enter starting price")
//         .min(0, "starting price is required"),
//       endingPrice: Yup.number()
//         .required("ending price is required")
//         .min(0, "expected positive value"),
//       decrementAmount: Yup.number()
//         .required("enter collection quantity")
//         .positive("expected positive value"),
//     }),
//     onSubmit: (values, formik) => {
//       console.log(values);
//     },
//   });
//   return <DutchAuctionFormFields form={fairDutchAuctionForm} />;
// };

const FairDutchAuction = ({isPreview = false}) => {
  const fairDutchAuctionForm = useFormik({
    initialValues: {
      quantity: 0,
      startingPrice: 0,
      endingPrice: 0,
      decrementAmount: 0,
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required("enter collection quantity"),
      startingPrice: Yup.number()
        .required("enter starting price")
        .min(0, "starting price is required"),
      endingPrice: Yup.number()
        .required("ending price is required")
        .min(0, "expected positive value"),
      decrementAmount: Yup.number()
        .required("enter collection quantity"),
    }),
    onSubmit: (values, formik) => {
      console.log(values);
    },
  });
  return <DutchAuctionFormFields form={fairDutchAuctionForm} isPreview={isPreview} />;
};

export default FairDutchAuction;
