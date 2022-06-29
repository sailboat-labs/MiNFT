import { useState } from "react";

import ContractStepHeader from "./StepHeader";

const ContractTypeStep = () => {
  const [selected, setSelected] = useState();
  return (
    <section>
      <ContractStepHeader
        selectOptions={[]}
        title="Contract maker"
        onChange={(value) => setSelected(value)}
      />
    </section>
  );
};

export default ContractTypeStep;
