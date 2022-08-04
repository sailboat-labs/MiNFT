/* eslint-disable @typescript-eslint/ban-types */
import { doc, onSnapshot } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getContractByField } from "redux/reducers/selectors/contract";
import { getProjectState } from "redux/reducers/selectors/project";
import * as Yup from "yup";

import BaseDatetimeInput from "@/components/controls/BaseDatetimeInput";
import BaseInput from "@/components/controls/BaseInput";
import BaseTimezoneSelector from "@/components/controls/BaseTimezoneSelector";
import ContractFormRowSection from "@/components/layout/ContractRowSection";

import { IProject } from "@/interfaces";
import { firestore } from "@/pages/dashboard";

import { saveContractMaker } from "./../../../../launch/launch-config/launchpad-config.logic";

const WhitelistForm = ({ isPreview = false }) => {
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
      // mintPrice: Yup.number()
      //   .required("enter mint price")
      //   .positive("expected positive value"),
      mintPrice: Yup.number().required("enter mint price"),
      totalQuantity: Yup.number().required("enter mint price"),
      //  .positive("total whitelisted quantity should be a positive value"),
      quantity: Yup.number().required("enter mint quantity"),
      // .positive("quantity should  be positive"),
      reservedTokensCount: Yup.number().required(
        "how many tokens should be reserved?"
      ),
      // .positive("tokens reserved should  be positive"),
      maxMintPerWhitelistWallet: Yup.number().required(
        "max mint per whitelisted wallet is required"
      ),
      // .positive("value should be positive"),
      maxMintPerWallet: Yup.number().required(
        "max mint per wallet is required"
      ),
      // .positive("value should be positive"),
      maxMintPerTransaction: Yup.number().required(
        "max mint per transaction is required"
      ),
      // .positive("value should be positive"),
      startDate: Yup.date().required("End date is required").nullable(false),
      endDate: Yup.date().required("End date is required").nullable(false),
      timezone: Yup.string().required("Timezone is required").nullable(false),
    }),
    onSubmit: (values, formik) => {
      // todo: on submit
      console.log(values);
    },
  });

  const contractType = useSelector(getContractByField("type"));

  const [whitelistValues, setWhitelistValues] = useState<any>();

  const project = useSelector(getProjectState) as IProject;

  let contractToFirestore = "";

  const a = contractType.split(" ");

  contractToFirestore = a[0].toLowerCase().concat(a[1]);

  useEffect(() => {

    const _doc = doc(
      firestore,
      `Projects/${project.slug}/Contract-Maker/draft/${contractToFirestore}/draft/whitelisted/draft`
    );
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setWhitelistValues(snapshot.data());
    });

    return () => {
      unsubscribe();
    };
  }, [contractToFirestore, project.slug]);

  async function handleSaveContractMaker(
    field: string,
    value: string | boolean | { title: string; description: string }[]
  ) {
    const saveDraft = await saveContractMaker(
      `${contractToFirestore}/draft/whitelisted`,
      project,
      field,
      value
    );

    if (!saveDraft) {
      toast.error(
        "Error Ocurred while saving draft. Changes will not be saved"
      );
      console.log("Toast error occured!");
    }
  }

  const updateWhitelist = (
    key: string,
    value: string | boolean | { title: string; description: string }[]
  ) => {
    handleSaveContractMaker(key, value);
  };

  const displayValues = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Whitelist Form values", whitelistValues);
  };

  return (
    <form onSubmit={whitelistForm.handleSubmit}>
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
                disabled={isPreview}
                checked={whitelistValues?.whitelistLaunchTime === "same"}
                onChange={() => updateWhitelist("whitelistLaunchTime", "same")}
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
                disabled={isPreview}
                checked={whitelistValues?.whitelistLaunchTime === "special"}
                onChange={() =>
                  updateWhitelist("whitelistLaunchTime", "special")
                }
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
                    value={whitelistValues?.whitelistStartDate}
                    disabled={isPreview}
                    onChange={(e) => {
                      updateWhitelist("whitelistStartDate", e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col ">
                  <span>End Date</span>
                  <BaseDatetimeInput
                    type="datetime-local"
                    wrapperClass="border-gray-600"
                    value={whitelistValues?.whitelistEndDate}
                    disabled={isPreview}
                    onChange={(e) => {
                      updateWhitelist("whitelistEndDate", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-col">
                <span>Timezone</span>
                <BaseTimezoneSelector
                  disabled={isPreview}
                  value={whitelistValues?.whitelistTimezone}
                  onChange={(e) => {
                    updateWhitelist("whitelistTimezone", e);
                  }}
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
                disabled={isPreview}
                checked={
                  whitelistValues?.whitelistMintPriceType ===
                  "The same as for classic participants"
                }
                onChange={() => {
                  updateWhitelist(
                    "whitelistMintPriceType",
                    "The same as for classic participants"
                  );
                }}
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
                disabled={isPreview}
                checked={
                  whitelistValues?.whitelistMintPriceType === "Special price"
                }
                onChange={() => {
                  updateWhitelist("whitelistMintPriceType", "Special price");
                }}
              />
              <label htmlFor="special-price" className="ml-1">
                Special price
              </label>
            </div>
            <BaseInput
              disabled={isPreview}
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
              value={whitelistValues?.whitelistMintPrice}
              onChange={(e) => {
                updateWhitelist("whitelistMintPrice", e.target.value);
              }}
            />
            <div className="mt-6 flex flex-col gap-2">
              <label className="font-semibold">Total whitelist quantity</label>
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
                disabled={isPreview}
                onChange={(e) => {
                  updateWhitelist("whitelistTotalQuantity", e.target.value);
                }}
                value={whitelistValues?.whitelistTotalQuantity}
              />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <label className="font-semibold">{contractType} quantity</label>
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
                disabled={isPreview}
                onChange={(e) => {
                  updateWhitelist("whitelistQuantity", e.target.value);
                }}
                value={whitelistValues?.whitelistQuantity}
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
                disabled={isPreview}
                onChange={(e) => {
                  updateWhitelist(
                    "whitelistReservedTokensCount",
                    e.target.value
                  );
                }}
                value={whitelistValues?.whitelistReservedTokensCount}
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
                wrapperClass="md:w-1/2"
                disabled={isPreview}
                onChange={(e) => {
                  updateWhitelist(
                    "whitelistMaxMintPerWhitelistWallet",
                    e.target.value
                  );
                }}
                value={whitelistValues?.whitelistMaxMintPerWhitelistWallet}
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
                disabled={isPreview}
                onChange={(e) => {
                  updateWhitelist(
                    "whitelistMaxMintPerWhitelistTransaction",
                    e.target.value
                  );
                }}
                value={whitelistValues?.whitelistMaxMintPerWhitelistTransaction}
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
                wrapperClass="md:w-1/2"
                disabled={isPreview}
                onChange={(e) => {
                  updateWhitelist("whitelistMaxMintPerWallet", e.target.value);
                }}
                value={whitelistValues?.whitelistMaxMintPerWallet}
              />
            </div>
          </article>
        </ContractFormRowSection>
      </div>
      <button id="showWhitelistValues" className="hidden" onClick={(e) => displayValues(e)}></button>
    </form>
  );
};

export default WhitelistForm;
