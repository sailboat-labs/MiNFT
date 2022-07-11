import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { getContract } from "redux/reducers/selectors/contract";
import { updateWhitelistDetails } from "redux/reducers/slices/contract";

import ContractStepHeader from "./StepHeader";
import ClassicMint from "./templates/ClassicMint";
import DutchAuction from "./templates/DutchAuction";
import FairDutchAuction from "./templates/FairDuctchAuction";
import PureWhitelist from "./templates/PureWhitelist";
import WhitelistForm from "./templates/Whitelist";

const TEMPLATES: {
  [key: string]: JSX.Element;
} = {
  "Classic Mint": <ClassicMint />,
  "Pure Whitelist": <PureWhitelist />,
  "Dutch Auction": <DutchAuction />,
  "Fair Dutch Auction": <FairDutchAuction />,
};

const GRAPHS: any = {
  "classic mint": "/svg/classic-mint-graph.svg",
  "pure whitelist": "/svg/classic-mint-graph.svg",
  "dutch auction": "/svg/dutch-graph.svg",
  "fair dutch auction": "/svg/dutch-graph.svg",
};

const GAS_FEES: any = {
  "classic mint": {
    from: "Medium",
    to: "High",
  },
  "dutch auction": {
    from: "Low",
    to: "Medium",
  },
  "fair dutch auction": {
    from: "Low",
    to: "Medium",
  },
  "pure whitelist": {
    from: "Low",
    to: null,
  },
};

interface AppProps {
  isPreview?: boolean;
}

const ContractSettingsStep: FC<AppProps> = ({ isPreview = false }) => {
  const { type, whitelisted } = useSelector(getContract);

  useEffect(() => {
    if (whitelisted) {
      updateWhitelistDetails(null);
    }
  }, [whitelisted]);

  useEffect(() => {
    if (isPreview) {
      // todo: load data from store and feed form
      console.log("prefilling");
    }
  }, [isPreview]);

  const gasFee = GAS_FEES[type.trim().toLowerCase()];

  return (
    <section className="mx-auto max-w-4xl">
      {isPreview ? (
        <>
          <article className="-mb-4 flex gap-8 pt-10 pb-8">
            <div className="w-[200px]">
              <img src={GRAPHS[type.trim().toLowerCase()]} alt="" />
            </div>
            <div className="flex-1">
              <strong className="text-sm text-indigo-800">{type}</strong>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius,
                et. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <br />
              <strong className="text-sm text-indigo-800">Gas Fees</strong>
              <p className="flex items-center gap-2">
                <span>{gasFee.from}</span>

                {gasFee.to && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                    <span>{gasFee.to}</span>
                  </>
                )}
              </p>
            </div>
          </article>
          <br />
          <hr className="border-indigo-800" />
        </>
      ) : (
        <ContractStepHeader
          title={type}
          selectOptions={[{ name: "Admin" }]}
          onChange={(value: any) => console.log(value)}
        />
      )}

      <div className="divide-y divide-indigo-800">
        {TEMPLATES[type]}
        {type.toLowerCase().trim() !== "pure whitelist" && whitelisted && (
          <div>
            <h2 className="pt-8 text-xl text-indigo-800">Whitelist</h2>
            {whitelisted && <WhitelistForm />}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContractSettingsStep;
