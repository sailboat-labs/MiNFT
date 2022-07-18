import { useFormik } from "formik";
import * as Yup from "yup";

const useWhitelistForm = () => {
  const whitelistForm = useFormik({
    initialValues: {
      mintPrice: 0,
      totalQuantity: 0,
      quantity: 0,
      reservedTokensCount: 0,
      maxMintPerWhitelistWallet: 0,
      maxMintPerWallet: 0,
      startDateTimezone: "",
      endDateTimezone: "",
      maxMintPerTransaction: 0,
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
      startDateTimezone: Yup.string().required("timezone is required"),
      endDateTimezone: Yup.string().required("timezone is required"),
    }),
    onSubmit: (values, formik) => {
      // dispatch(updateWhitelistDetails(values));
      console.log(values);
    },
  });

  return whitelistForm;
};

export default useWhitelistForm;
