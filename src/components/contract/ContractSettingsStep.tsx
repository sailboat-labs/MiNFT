import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getContract } from "redux/reducers/selectors/contract";
import { updateWhitelistDetails } from "redux/reducers/slices/contract";

import ContractStepHeader from "./StepHeader";
import ClassicMint from "./templates/ClassicMint";
import DutchAuction from "./templates/DutchAuction";
import FairDutchAuction from "./templates/FairDuctchAuction";
import WhitelistForm from "./templates/Whitelist";

const TEMPLATES: {
  [key: string]: JSX.Element;
} = {
  "Classic Mint": <ClassicMint />,
  "Dutch Auction": <DutchAuction />,
  "Fair Dutch Auction": <FairDutchAuction />,
};

const ContractSettingsStep = () => {
  const [selected, setSelected] = useState();
  const { type, whitelisted } = useSelector(getContract);

  useEffect(() => {
    if (whitelisted) {
      updateWhitelistDetails(null);
    }
  }, [whitelisted]);

  return (
    <section>
      <ContractStepHeader
        title={type}
        selectOptions={[{ name: "Admin" }]}
        onChange={(value: any) => console.log(value)}
      />
      <div className="divide-y divide-indigo-800">
        {TEMPLATES[type]}
        <div>
          {type.toLowerCase().trim() !== "pure whitelist" && (
            <h2 className="pt-8 text-xl text-indigo-800">Whitelist</h2>
          )}
          {whitelisted && <WhitelistForm />}
        </div>
      </div>
    </section>
  );
};

export default ContractSettingsStep;
