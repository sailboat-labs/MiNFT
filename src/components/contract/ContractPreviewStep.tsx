import React, { useState } from "react";

import ContractSettingsStep from "./ContractSettingsStep";
import ContractStepHeader from "./StepHeader";

const ContractPreviewStep = () => {
  const [selected, setSelected] = useState();

  return (
    <section className="mx-auto max-w-4xl">
      <ContractStepHeader
        title="Confirmation"
        selectOptions={[{ name: "Admin" }]}
        onChange={(value: any) => console.log(value)}
      />
      <ContractSettingsStep isPreview />
    </section>
  );
};

export default ContractPreviewStep;
