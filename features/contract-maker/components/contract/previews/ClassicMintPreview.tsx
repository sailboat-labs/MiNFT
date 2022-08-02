import React, { useEffect } from "react";
import { useStore } from "react-redux";

import BaseSelect from "@/components/controls/BaseSelect";
import BaseTimezoneSelector from "@/components/controls/BaseTimezoneSelector";
import ContractFormRowSection from "@/components/layout/ContractRowSection";

interface AppProps {
  values: any;
}

const ClassicMintPreview = ({values}) => {
  const store = useStore();

  useEffect(() => {
    setTimeout(() => {
      console.log("Form in preview");
      console.log(
        "Current store state",
        store.getState().contractReducer.classicMint
      );
    }, 500);
  });
  const values2 = store.getState().contractReducer.classicMint;

  console.log("Values are:", values);

  // if (isPreview) {
  //   setTimeout(() => {
  //     console.log("Form in preview");
  //     console.log("Current store", store.getState());
  //   }, 1000);
  //   return;
  // }

  return (
    <div className="pt-6">
      <form>
        <section className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2 2xl:grid-cols-3">
          <ContractFormRowSection
            headingClass="font-semibold text-base"
            name="Quantity of collection"
            className="mb-5 flex items-center"
          >
            <input
              type="number"
              disabled
              value={values.quantityOfCollection}
              className="w-40 text-black"
            />
          </ContractFormRowSection>
          <ContractFormRowSection
            headingClass="font-semibold text-base"
            name="Mint Price"
            className="mb-5 flex items-center "
          >
            <input
              disabled
              type="number"
              className="w-40"
              value={values.mintPrice}
            />
          </ContractFormRowSection>
          <ContractFormRowSection
            headingClass="font-semibold text-base"
            name="Number of tokens to reserve"
            className="mb-5 flex items-center"
          >
            <input
              disabled
              type="number"
              className="w-40"
              value={values.reservedTokens}
            />
          </ContractFormRowSection>
          <ContractFormRowSection
            headingClass="font-semibold text-base"
            name="Maximum mint per wallet"
            className="mb-5 flex items-center"
          >
            <input
              disabled
              type="number"
              className="w-40"
              value={values.maxMintPerWallet}
            />
          </ContractFormRowSection>
          <ContractFormRowSection
            headingClass="font-semibold text-base"
            name="Maximum mint per transaction"
            className="mb-5 flex items-center"
          >
            <input
              disabled
              type="number"
              className="w-40"
              value={values.maxMintPerTransaction}
            />
          </ContractFormRowSection>
        </section>
        <h4 className="mt-10 ">Timing</h4>
        <section className="mb-10 mt-3">
          <div className="flex w-1/2 flex-col">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex flex-col">
                <span className="my-3 font-bold">Start date</span>
                <input
                  type="datetime-local"
                  className="border-gray-600"
                  disabled
                  value={values.startDate}
                />
              </div>
              <div className="flex flex-col">
                <span className="my-3 font-bold">End date</span>
                <input
                  type="datetime-local"
                  className="border-gray-600"
                  disabled
                  value={values.endDate}
                />
              </div>
            </div>
            <div className="mt-8">
              <span className="my-3 font-bold">Timezone</span>
              <BaseTimezoneSelector disabled onChange={() => ({})} />
            </div>
          </div>
          <div className="mt-10 w-1/2 max-w-[250px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
            <strong>Minutes</strong>
            <BaseSelect
              disabled
              options={Array(60)
                .fill(null)
                .map((_, index) => ({ name: index + 1 }))}
              buttonClass="!bg-white ring-1 mt-1 ring-gray-200 !text-gray-800"
              selectorIconColor="black"
              defaultValue={values.minutes}
            />
          </div>
        </section>
        <input id="form-submit" type="submit" className="hidden" />
      </form>
    </div>
  );
};

export default ClassicMintPreview;
