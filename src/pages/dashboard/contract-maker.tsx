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
    <main className="flex-1">
      {/* <Stepper stepsCount={6} activeStep={3} /> */}
      <div className="my-10 rounded-md bg-indigo-50 p-6">
        {STEPS[activeStep]}
        <section className="flex items-center justify-center gap-3 pt-16">
          {activeStep > 1 && (
            <button
              onClick={() => nextStep(-1)}
              className="min-w-[150px] rounded-md bg-indigo-800 py-2 text-white transition-all duration-150 hover:bg-indigo-900"
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
        </section>
      </div>
    </main>
  );
};

export default ContractMakerView;
