import React, { FC } from "react";
import { useSelector } from "react-redux";
import TimezoneSelect from "react-timezone-select";
import { getContractByField } from "redux/reducers/selectors/contract";

import BaseInput from "@/components/controls/BaseInput";
import ContractFormRowSection from "@/components/layout/ContractRowSection";

interface AppProps {
  form: any;
}

const WhitelistForm: FC<AppProps> = ({ form }) => {
  const contractType = useSelector(getContractByField("type"));

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
                {...form.getFieldProps("same")}
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
                {...form.getFieldProps("same")}
                className="mt-1"
                value="special"
              />
              <label htmlFor="special-time" className="ml-1">
                Special Time
              </label>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-10 rounded-md px-6 ring-gray-200">
              <div className="flex flex-col gap-2">
                <strong>Start date & time</strong>
                <div>
                  <input
                    className="w-full rounded-md border-gray-200"
                    type="datetime-local"
                  />
                  <TimezoneSelect
                    value={form.getFieldProps("startDateTimeZone") as any}
                    onChange={(value) =>
                      form.setFieldValue("startDateTimezone", value)
                    }
                    placeholder="Select timezone..."
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <strong>End date & time</strong>
                <div>
                  <input
                    className="w-full rounded-md border-gray-200"
                    type="datetime-local"
                  />
                  <TimezoneSelect
                    value={form.getFieldProps("endDateTimeZone") as any}
                    onChange={(value) =>
                      form.setFieldValue("endDateTimezone", value)
                    }
                    placeholder="Select timezone..."
                  />
                </div>
              </div>
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
                type="radio"
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
                type="radio"
                className="mt-1"
                value="Special price"
              />
              <label htmlFor="special-price" className="ml-1">
                Special price
              </label>
            </div>
            <BaseInput
              type="number"
              wrapperClass="mt-3 md:w-1/2"
              {...form.getFieldProps("mintPrice")}
              error={
                form.touched.mintPrice && form.errors.mintPrice ? (
                  <p className="text-base text-red-500">
                    {form.errors.mintPrice}
                  </p>
                ) : null
              }
              postfix={<span className="font-semibold ">ETH</span>}
            />
            <div className="mt-6 flex flex-col gap-2">
              <label className="font-semibold">Total whitelist quantity</label>
              <BaseInput
                wrapperClass="mt-3 md:w-1/2"
                {...form.getFieldProps("totalQuantity")}
                error={
                  form.touched.totalQuantity && form.errors.totalQuantity ? (
                    <p className="text-base text-red-500">
                      {form.errors.totalQuantity}
                    </p>
                  ) : null
                }
                type="number"
              />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <label className="font-semibold">{contractType} quantity</label>
              <BaseInput
                wrapperClass="mt-3 md:w-1/2"
                {...form.getFieldProps("quantity")}
                error={
                  form.touched.quantity && form.errors.quantity ? (
                    <p className="text-base text-red-500">
                      {form.errors.quantity}
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
          <article className="grid gap-10 md:grid-cols-2 2xl:grid-cols-4">
            <div className="mt-6 flex flex-col gap-2">
              <label className="font-semibold">
                Number of tokens to reserve
              </label>
              <BaseInput
                {...form.getFieldProps("reservedTokensCount")}
                error={
                  form.touched.reservedTokensCount &&
                  form.errors.reservedTokensCount ? (
                    <p className="text-base text-red-500">
                      {form.errors.reservedTokensCount}
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
                {...form.getFieldProps("maxMintPerWhitelistWallet")}
                error={
                  form.touched.maxMintPerWhitelistWallet &&
                  form.errors.maxMintPerWhitelistWallet ? (
                    <p className="text-base text-red-500">
                      {form.errors.maxMintPerWhitelistWallet}
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
              </div>
              <BaseInput
                {...form.getFieldProps("maxMintPerTransaction")}
                error={
                  form.touched.maxMintPerTransaction &&
                  form.errors.maxMintPerTransaction ? (
                    <p className="text-base text-red-500">
                      {form.errors.maxMintPerTransaction}
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
                {...form.getFieldProps("maxMintPerWallet")}
                error={
                  form.touched.maxMintPerWallet &&
                  form.errors.maxMintPerWallet ? (
                    <p className="text-base text-red-500">
                      {form.errors.maxMintPerWallet}
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
