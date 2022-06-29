import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBlockchainType } from "redux/reducers/selectors/settings";
import { setBlockchain } from "redux/reducers/slices/settings";

import BaseRadio from "@/components/input-controls/BaseRadio";

const BasicSettings = () => {
  const dispatch = useDispatch();
  const selectedBlockChain = useSelector(getBlockchainType);

  return (
    <div className="py-12">
      <h3 className="mb-2 text-3xl font-bold">Generator Settings</h3>
      <h4>Blockchain</h4>
      <p>Select the format to use when exporting metadata</p>
      {/* radio group */}
      <div className="mt-6 flex gap-x-6">
        <BaseRadio
          className="flex-1"
          checked={selectedBlockChain === "solana"}
          onClick={() => dispatch(setBlockchain("solana"))}
        >
          <div className="p-5 font-semibold">Solana</div>
        </BaseRadio>
        <BaseRadio
          className="flex-1"
          checked={selectedBlockChain === "ethereum"}
          onClick={() => dispatch(setBlockchain("ethereum"))}
        >
          <div className="p-5 font-semibold">Ethereum</div>
        </BaseRadio>
        <BaseRadio
          className="flex-1"
          checked={selectedBlockChain === "polygon"}
          onClick={() => dispatch(setBlockchain("polygon"))}
        >
          <div className="p-5 font-semibold">Polygon</div>
        </BaseRadio>
      </div>
    </div>
  );
};

export default BasicSettings;
