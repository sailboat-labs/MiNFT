import React, { FC } from "react";
import TimezoneSelect from "react-timezone-select";

import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
import ContractFormRowSection from "@/components/layout/ContractRowSection";

interface AppProps {
  form: any;
}

const ClassicMintFormFields: FC<AppProps> = ({ form }) => {
  return (
    <div className="py-8">
      <section className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2 2xl:grid-cols-3">
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Quantity of collection"
        >
          <BaseInput
            {...form.getFieldProps("quantityOfCollection")}
            type="number"
            wrapperClass="w-full"
            placeholder="Quantity"
            error={
              form.touched.quantityOfCollection &&
              form.errors.quantityOfCollection ? (
                <div>{form.errors.quantityOfCollection}</div>
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
            {...form.getFieldProps("mintPrice")}
            error={
              form.touched.mintPrice && form.errors.mintPrice ? (
                <p className="text-base text-red-500">
                  {form.errors.mintPrice}
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
            {...form.getFieldProps("reservedTokens")}
            error={
              form.touched.reservedTokens && form.errors.reservedTokens ? (
                <p className="text-base text-red-500">
                  {form.errors.reservedTokens}
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
            {...form.getFieldProps("maxMintPerWallet")}
            error={
              form.touched.maxMintPerWallet && form.errors.maxMintPerWallet ? (
                <p className="text-base text-red-500">
                  {form.errors.maxMintPerWallet}
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
            wrapperClass="w-full"
          />
        </ContractFormRowSection>
      </section>
      <h4 className="mt-10 text-indigo-800">Timing</h4>
      <div className="mt-2 grid grid-cols-3 gap-x-12">
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Start date & time"
        >
          <input
            id="classic-mint-start-date"
            type="datetime-local"
            {...form.getFieldProps("startDate")}
            className="w-full rounded border-gray-200 font-dmsans"
          />
          <TimezoneSelect
            {...form.getFieldProps("startDateTimeZone")}
            placeholder="Select timezone..."
          />
          {form.touched.startDate && form.errors.startDate ? (
            <p className="text-base text-red-500">{form.errors.startDate}</p>
          ) : form.touched.startDateTimezone &&
            form.errors.startDateTimezone ? (
            <p className="text-base text-red-500">
              {form.errors.startDateTimezone}
            </p>
          ) : null}
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="End date & time"
        >
          <input
            id="classic-mint-end-date"
            type="datetime-local"
            {...form.getFieldProps("endDate")}
            className="w-full rounded border-gray-200 font-dmsans"
          />
          <TimezoneSelect
            {...form.getFieldProps("endDateTimeZone")}
            placeholder="Select timezone"
          />
          {form.touched.endDate && form.errors.endDate ? (
            <p className="text-base text-red-500">{form.errors.endDate}</p>
          ) : form.touched.endDateTimezone && form.errors.endDateTimezone ? (
            <p className="text-base text-red-500">
              {form.errors.endDateTimezone}
            </p>
          ) : null}
        </ContractFormRowSection>
        <ContractFormRowSection
          headingClass="font-semibold text-base"
          name="Decremental Time"
        >
          <div className="grid grid-cols-2 items-center gap-4">
            <BaseSelect
              options={Array(60)
                .fill(null)
                .map((_, index) => ({ name: index + 1 }))}
              buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
              selectorIconColor="black"
            />
            <span>minutes</span>
          </div>
        </ContractFormRowSection>
      </div>
    </div>
  );
};

export default ClassicMintFormFields;
