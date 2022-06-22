import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getBlockchainType } from "redux/reducers/selectors/settings";

import BaseRadio from "@/components/input-controls/BaseRadio";
import SettingsLayout from "@/components/layout/Settings";

const WeightingSettingsPage = () => {
  const dispatch = useDispatch();
  const selectedBlockChain = useSelector(getBlockchainType);

  return (
    <section className="flex-1 overflow-y-auto bg-gray-100">
      <div className="container mx-auto max-w-2xl flex-1 divide-y divide-gray-200 bg-gray-100">
        <div className="py-12">
          <h3 className="mb-2 text-4xl font-bold">Traits</h3>
          <div className="mt-8 flex gap-x-6">
            <BaseRadio
              className="flex-1"
              checked={selectedBlockChain === "saved-designed"}
              // onClick={() => dispatch(setBlockchain("saved-designed"))}
            >
              <div className="p-5 font-semibold">
                <strong>Include saved designs</strong>
                <p className="text-sm">
                  Any saved designs are guaranteed to be generated
                </p>
              </div>
            </BaseRadio>
            <BaseRadio
              className="flex-1"
              checked={selectedBlockChain === "random"}
              // onClick={() => dispatch(setBlockchain("random"))}
            >
              <div className="p-5 font-semibold">
                <strong>Completely random</strong>
                <p className="text-sm">
                  Traits and variations will be generated at random
                </p>
              </div>
            </BaseRadio>
          </div>
        </div>
      </div>
    </section>
  );
};

WeightingSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default WeightingSettingsPage;
