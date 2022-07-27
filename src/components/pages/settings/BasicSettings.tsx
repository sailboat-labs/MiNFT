import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getConfiguration } from "redux/reducers/selectors/configuration";
import { setConfiguration } from "redux/reducers/slices/configuration";

import BaseRadio from "@/components/input-controls/BaseRadio";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";

const BasicSettings = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(getConfiguration);

  return (
    <div className="py-12">
      <h4>Blockchain</h4>
      <p>Select the format to use when exporting metadata</p>
      {/* radio group */}
      <div className="mt-6 flex gap-x-6">
        <BaseRadio
          className="flex-1"
          checked={configuration[enumNFTGenConfig.BLOCKCHAIN] === "solana"}
          onClick={() => toast("Support for Solana will be added soon")}
        >
          <div className="p-5 font-semibold">Solana</div>
        </BaseRadio>
        <BaseRadio
          className="flex-1"
          checked={configuration[enumNFTGenConfig.BLOCKCHAIN] === "ethereum"}
          onClick={() => {
            dispatch(
              setConfiguration({
                key: enumNFTGenConfig.FAMILY,
                value: "ethereum",
              })
            );
          }}
        >
          <div className="p-5 font-semibold">Ethereum</div>
        </BaseRadio>
        <BaseRadio
          className="flex-1"
          checked={configuration[enumNFTGenConfig.BLOCKCHAIN] === "polygon"}
          onClick={() => toast("Support for Polygon will be added soon")}
        >
          <div className="p-5 font-semibold">Polygon</div>
        </BaseRadio>
      </div>
    </div>
  );
};

export default BasicSettings;
