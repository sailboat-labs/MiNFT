import React, { useState } from "react";

import ContractPreviewStep from "./contract/ContractPreviewStep";
import ContractSettingsStep from "./contract/ContractSettingsStep";
import ContractTypeStep from "./contract/ContractTypeStep";

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
    <main className=" flex-1 ">
      {/* <Stepper
        stepLabels={["Contract type", "Contract settings", "Preview"]}
        stepsCount={3}
        activeStep={activeStep}
        onStep={nextStep}
      /> */}
      <div className="my-10 px-10 pb-14">
        {STEPS[activeStep]}
        <section className="flex items-center justify-center gap-6 py-16">
          {activeStep > 1 && (
            <button
              onClick={() => nextStep(-1)}
              className="rounded-md border  border-indigo-800 px-10 py-2 text-indigo-800 transition-all duration-150"
            >
              Back
            </button>
          )}
          {activeStep < 3 && (
            <button
              // onClick={() => {
              //   nextStep();
              // }}
              onClick={() => {
                if (activeStep == 2) {
                  document.getElementById("form-submit")?.click();
                  nextStep();
                } else nextStep();
              }}
              type="submit"
              className="rounded-md bg-indigo-800 px-10 py-2 text-white transition-all duration-150 hover:bg-indigo-900 dark:text-gray-700"
            >
              Next
            </button>
          )}
          {activeStep === 3 && (
            <button
              // onClick={() => nextStep()}
              className="rounded-md bg-indigo-800 px-10 py-2 text-white transition-all duration-150 hover:bg-indigo-900"
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
