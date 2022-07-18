import { useState } from "react";
import { useSelector } from "react-redux";
import { getContract } from "redux/reducers/selectors/contract";

import StepperFooter from "./StepperFooter";
import ContractTypeRadio from "../controls/ContractTypeRadio";

const contractTypes = [
  {
    name: "Classic Mint",
    whitelist: false,
  },
  {
    name: "Classic Mint",
    whitelist: true,
    description:
      "In a Classic Mint, the price is fixed throughout the duration of the minting period. There are no restrictions on wallets that can purchase the NFTs, sale is open to all wallets.",
  },

  {
    name: "Dutch Auction",
    whitelist: false,
  },
  {
    name: "Dutch Auction",
    whitelist: true,
    description:
      "In a Dutch Auction, the price of an NFT starts at an initial price (ceiling) and drops by a small amount periodically (e.g. 0.1 ETH every 10 minutes) until it hits the lowest price it will go (the resting price).",
  },
  {
    name: "Fair Dutch Auction",
    whitelist: false,
  },
  {
    name: "Fair Dutch Auction",
    whitelist: true,
    description:
      "In a Fair Dutch Auction, the pricing format is similar to the Dutch Auction.This contract has a refund policy, which means wallets only pay the lowest bid price that the auction sells out at. Any difference will be refunded to the wallet.",
  },
  {
    name: "Pure Whitelist",
    whitelist: true,
    description:
      "In a Pure Whitelist, the price is fixed throughout the duration of the minting period. There are restrictions on which wallets can purchase the NFTs. Specific wallets are given access to purchase the NFTs by the contract owner.",
  },
];

const ContractTypeStep = () => {
  const [selected, setSelected] = useState();
  const contractState = useSelector(getContract);

  return (
    <section className="">
      {/* <ContractStepHeader
        selectOptions={[{ name: "Admin" }]}
        title=""
        onChange={(value) => setSelected(value)}
      /> */}
      <h1 className="text-3xl">Contract Type</h1>
      <p>Select your preferred contract type</p>
      <div
        className="4xl:grid-cols-4 mt-8 grid gap-8 lg:grid-cols-2 2xl:grid-cols-3"
        // style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {contractTypes.map((contract, index) => (
          <ContractTypeRadio
            type={contract.name}
            description={contract.description}
            checked={
              new RegExp(`^${contractState.type}$`, "ig").test(contract.name) &&
              contract.whitelist === contractState.whitelisted
            }
            whitelist={contract.whitelist}
            key={index}
          />
        ))}
      </div>
      <StepperFooter />
    </section>
  );
};

export default ContractTypeStep;
