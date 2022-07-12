import React, { useState } from "react";

import ContractPreviewStep from "@/components/contract/ContractPreviewStep";
import ContractSettingsStep from "@/components/contract/ContractSettingsStep";
import ContractTypeStep from "@/components/contract/ContractTypeStep";

const STEPS: { [key: number]: JSX.Element } = {
  1: <ContractTypeStep />,
  2: <ContractSettingsStep />,
  3: <ContractPreviewStep />,
};

const ContractMakerView = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  function nextStep(step = 1) {
    setActiveStep(activeStep + step);
  }

  return (
    <main className="h-[length:calc(100vh-60px)] flex-1 overflow-y-auto">
      {/* <Stepper
        stepLabels={["Contract type", "Contract settings", "Preview"]}
        stepsCount={3}
        activeStep={activeStep}
        onStep={nextStep}
      /> */}
      <div className="my-10 px-10 py-14">
        {STEPS[activeStep]}
        <section className="flex items-center justify-center gap-6 pt-16">
          {activeStep > 1 && (
            <button
              onClick={() => nextStep(-1)}
              className="min-w-[150px] rounded-md  border border-indigo-800 py-2 text-indigo-800 transition-all duration-150"
            >
              Back
            </button>
          )}
          {activeStep < 3 && (
            <button
              onClick={() => nextStep()}
              className="min-w-[150px] rounded-md bg-indigo-800 py-2 text-white transition-all duration-150 hover:bg-indigo-900"
            >
              Next
            </button>
          )}
          {activeStep === 3 && (
            <button
              // onClick={() => nextStep()}
              className="min-w-[150px] rounded-md bg-indigo-800 py-2 text-white transition-all duration-150 hover:bg-indigo-900"
            >
              Save
            </button>
          )}
        </section>
      </div>
    </main>
  );
};

export default ContractMakerView;
