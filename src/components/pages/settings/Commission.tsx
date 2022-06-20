import { capitalize } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getBlockchainType } from "redux/reducers/selectors/settings";

const CommissionSettings = () => {
  const selectedBlockChain = useSelector(getBlockchainType);

  return (
    <div className="py-12">
      <h4>Commission</h4>
      <p>Secondary market fees and treasury account</p>
      <form action="#" className="mt-6">
        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="total-fee">
              Total Fee
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full flex-1 appearance-none rounded-lg pr-8"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 transform">
                %
              </span>
            </div>
            <p>1 BPS = 0.01%</p>
          </div>
        </div>
        <div className="mt-6 flex items-start gap-x-6">
          <div className="w-[120px]">
            <label htmlFor="free-share" className="mb-2 block font-medium">
              Free Share
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full flex-1 appearance-none rounded-lg pr-8"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 transform">
                %
              </span>
            </div>
          </div>
          <div className="flex-1 font-medium">
            <label htmlFor="address">
              {capitalize(selectedBlockChain)} Address
            </label>
            <input type="text" className="mt-2 block w-full  rounded-lg" />
          </div>
        </div>
        <p className="mt-2">Polygon only supports one commission recipient.</p>
      </form>
    </div>
  );
};

export default CommissionSettings;
