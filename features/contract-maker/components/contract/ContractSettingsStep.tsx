import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useStore } from "react-redux";
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

const PREVIEW_TEMPLATES: {
  [key: string]: JSX.Element;
} = {
  "Classic Mint": <ClassicMint isPreview />,
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

  const store = useStore();

  useEffect(() => {
    if (isPreview) {
      // todo: load data from store and feed form
      // console.log("prefilling");
      // console.log("Store is: ");
      // console.log(store);
    }
  }, [isPreview]);

  const gasFee = GAS_FEES[type.trim().toLowerCase()];

  // Choose message to show on the confirmation page
  const paragraphText = {
    "Classic Mint":
      "The price is fixed throughout the duration of the minting period. There are no restrictions on wallets that can purchase the NFTs, sale is open to all NFTs.",
    "Dutch Auction":
      "The price of an NFT starts at an initial price (ceiling) and drops by a small amount periodically (eg. 0.1 ETH every 10 minutes) until it hits its lowest price (the resting price).",
    "Fair Dutch Auction":
      "The price of an NFT starts at an initial price and drops by a small amount periodically until it hits its lowest price. The contract has a refund policy which means wallets pnly pay the lowest bid price that the auction sells out at. The difference is refunded back to the wallet.",
    "Pure Whitelist":
      "The price is fixed throughout the duration of the minting period. There are restrictions on which wallets can purchase the NFTs. Specific wallets are given access to purchase the NFTs by the contract owner.",
  };

  return (
    <section className="mx-auto">
      {isPreview ? (
        <>
          <article className="-mb-4 flex gap-8 pt-10 pb-8" id="previewHeader">
            <div className="w-[200px]">
              <img src={GRAPHS[type.trim().toLowerCase()]} alt="" />
            </div>
            <div className="flex-1">
              <strong className="text-sm text-indigo-800">{type}</strong>
              <p>{paragraphText[type]}</p>
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
        {isPreview ? PREVIEW_TEMPLATES[type] : TEMPLATES[type]}
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
