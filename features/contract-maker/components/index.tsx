import { doc, onSnapshot } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import { IProject } from "@/interfaces";
import { firestore } from "@/pages/dashboard";

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

  function scrollUp() {
    document.getElementById("contractMakerForms")?.scrollIntoView();
  }

  const project = useSelector(getProjectState) as IProject;

  useLayoutEffect(() => {
    const _doc = doc(
      firestore,
      `Projects/${project.slug}/Contract-Maker/draft`
    );
    const unsubscribe = onSnapshot(_doc, async (snapshot) => {
      const values = await snapshot.data();

      setTimeout((values: any) => {
        values?.contractType ? setActiveStep(1) : setActiveStep(2);
      });
    });
    return () => {
      unsubscribe();
    };
  }, [project.slug]);

  return (
    <main className="flex-1 " id="contractMakerForms">
      {/* <Stepper
        stepLabels={["Contract type", "Contract settings", "Preview"]}
        stepsCount={3}
        activeStep={activeStep}
        onStep={nextStep}
      /> */}
      <div className="py-5 px-10 pb-14">
        {STEPS[activeStep]}
        <section className="flex items-center justify-center gap-6 py-16">
          {activeStep == 2 && (
            <button
              onClick={() => {
                nextStep(-1);
                scrollUp();
                alert('The data from your previous contract will be preserved and used to prefill your next contract. Reset data fields to latest values for accuracy.')
              }}
              className="rounded-md border  border-indigo-800 px-10 py-2 text-indigo-800 transition-all duration-150"
            >
              Start a new contract
            </button>
          )}
          {activeStep == 3 && (
            <button
              onClick={() => {
                nextStep(-1);
                scrollUp();
              }}
              className="rounded-md border  border-indigo-800 px-10 py-2 text-indigo-800 transition-all duration-150"
            >
              Edit Contract
            </button>
          )}
          {activeStep < 3 && (
            <button
              onClick={() => {
                nextStep();
                scrollUp();
              }}
              className="rounded-md bg-indigo-800 px-10 py-2 text-white transition-all duration-150 hover:bg-indigo-900 dark:text-gray-700"
            >
              Next
            </button>
          )}
          {activeStep === 3 && (
            <button
              onClick={() => {
                document.getElementById("showValues")?.click();
                document.getElementById("showWhitelistValues")?.click();
                scrollUp();
              }}
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
