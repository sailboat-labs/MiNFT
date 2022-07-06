import { useState } from "react";
import { useSelector } from "react-redux";
import { getContract } from "redux/reducers/selectors/contract";

import ContractStepHeader from "./StepHeader";
import ContractTypeRadio from "../controls/ContractTypeRadio";

const contractTypes = [
  {
    name: "Classic Mint",
    whitelist: false,
  },
  {
    name: "Classic Mint",
    whitelist: true,
  },

  {
    name: "Dutch Auction",
    whitelist: false,
  },
  {
    name: "Dutch Auction",
    whitelist: true,
  },
  {
    name: "Fair Dutch Auction",
    whitelist: false,
  },
  {
    name: "Fair Dutch Auction",
    whitelist: true,
  },
  {
    name: "Pure Whitelist",
    whitelist: true,
  },
];

const ContractTypeStep = () => {
  const [selected, setSelected] = useState();
  const contractState = useSelector(getContract);

  return (
    <section className="mx-auto max-w-5xl">
      <ContractStepHeader
        selectOptions={[{ name: "Admin" }]}
        title="Contract maker"
        onChange={(value) => setSelected(value)}
      />
      <div
        className="mt-8 grid gap-8"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {contractTypes.map((contract, index) => (
          <ContractTypeRadio
            type={contract.name}
            checked={
              new RegExp(`^${contractState.type}$`, "ig").test(contract.name) &&
              contract.whitelist === contractState.whitelisted
            }
            whitelist={contract.whitelist}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ContractTypeStep;
