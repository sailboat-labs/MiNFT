import React from "react";
import { useSelector } from "react-redux";
import { getActiveStep } from "redux/reducers/selectors/contract";

import ContractPreviewStep from "./contract/ContractPreviewStep";
import ContractSettingsStep from "./contract/ContractSettingsStep";
import ContractTypeStep from "./contract/ContractTypeStep";

const ContractMakerView = () => {
  const activeStep = useSelector(getActiveStep);

  const STEPS: { [key: number]: JSX.Element } = {
    1: <ContractTypeStep />,
    2: <ContractSettingsStep />,
    3: <ContractPreviewStep />,
  };

  return (
    <main className=" flex-1 ">
      {/* <Stepper
        stepLabels={["Contract type", "Contract settings", "Preview"]}
        stepsCount={3}
        activeStep={activeStep}
        onStep={nextStep}
      /> */}
      <div className="my-10 px-10 pb-14">{STEPS[activeStep]}</div>
    </main>
  );
};

export default ContractMakerView;
