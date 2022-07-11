import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getContractByField } from "redux/reducers/selectors/contract";
import * as Yup from "yup";

import BaseInput from "@/components/controls/BaseInput";
import DateTimeRangePicker from "@/components/controls/DateTimeRangePicker";
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
    }),
    onSubmit: (values, formik) => {
      // todo: on submit
      console.log(values);
    },
  });

  // function handleOnChange(key: string, value: string) {
  //   value = value.trim();

  //   dispatch(
  //     updateWhitelistDetails({
  //       key,
  //       value: value.length === 0 ? undefined : parseInt(value),
  //     })
  //   );
  // }

  return (
    <form>
      <div className="mx-auto flex flex-col divide-y-2 divide-gray-200 pb-8">
        {/* Timing */}
        <ContractFormRowSection className="pt-4 pb-8" name="Timing">
          <article>
            <strong className="font-semibold ">Launch Time</strong>
            <div className="flex gap-1">
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
            <div
              // style={{ maxHeight: undefined, overflowY: "hidden" }}
              className="mt-2"
            >
              <DateTimeRangePicker />
            </div>
          </article>
        </ContractFormRowSection>
        {/* Price & Quantity */}
        <ContractFormRowSection className="py-8" name="Price & Quantity">
          <article>
            <strong className="font-semibold ">Mint price</strong>
            <div className="flex gap-1">
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
              wrapperClass="mt-3 w-full"
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
              <label className="font-semibold">Total whitelist quantity</label>
              <BaseInput
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
              <label className="font-semibold">{contractType} quantity</label>
              <BaseInput
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
          <article>
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
              />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <label className="font-semibold">
                Maximum Mint per whitelisted wallet
              </label>
              <BaseInput
                {...whitelistForm.getFieldProps("maxMintPerWhitelistWallet")}
                error={
                  whitelistForm.touched.maxMintPerWhitelistWallet &&
                  whitelistForm.errors.maxMintPerWhitelistWallet ? (
                    <p className="text-base text-red-500">
                      {whitelistForm.errors.maxMintPerWhitelistWallet}
                    </p>
                  ) : null
                }
                type="number"
                wrapperClass=""
              />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="font-semibold">
                  Maximum Mint per transaction
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-indigo-800"
                  viewBox="0 0 20 20"
                  data-for="mmpt"
                  data-tip
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {/* <ReactTooltip id="mmpt" place="right" effect="solid">
                  Lorem ipsum dolor sit
                </ReactTooltip> */}
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
                wrapperClass=""
              />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <label className="font-semibold">Maximum Mint per wallet</label>
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
                wrapperClass=""
              />
            </div>
          </article>
        </ContractFormRowSection>
      </div>
    </form>
  );
};

export default WhitelistForm;
