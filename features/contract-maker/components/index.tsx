// import { doc, onSnapshot } from "firebase/firestore";
import React, { useState } from "react";

// import { useSelector } from "react-redux";
// import { getProjectState } from "redux/reducers/selectors/project";
// import { IProject } from "@/interfaces";
// import { firestore } from "@/pages/dashboard";
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

  // const project = useSelector(getProjectState) as IProject;

  // useLayoutEffect(() => {
  //   const _doc = doc(
  //     firestore,
  //     `Projects/${project.slug}/Contract-Maker/draft`
  //   );
  //   const unsubscribe = onSnapshot(_doc, (snapshot) => {
  //     const values = snapshot.data();
  //     setTimeout(() => {
  //       values?.contractType ? setActiveStep(2) : setActiveStep(1);
  //     });
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <main className="flex-1 pb-16" id="contractMakerForms">
      <div className="mr-5 flex justify-end pt-5">
        <button
          onClick={() => {
            setActiveStep(1);
            scrollUp();
            alert(
              "The data from your previous contract will be preserved and used to prefill your new contract. Don't worry, you can overwrite the data by changing the fields accordingly."
            );
          }}
          className="rounded-md bg-indigo-800 px-5 py-3 text-white transition-all duration-150 hover:bg-indigo-900 dark:text-gray-700"
        >
          Start a new contract
        </button>
      </div>
      <div className=" px-10 pb-14">
        {STEPS[activeStep]}
        <section className="flex items-center justify-center gap-6 pb-14 pt-14">
          {activeStep == 2 && (
            <button
              onClick={() => {
                nextStep(-1);
                scrollUp();
                alert(
                  "The data from your previous contract will be preserved and used to prefill your new contract."
                );
              }}
              className="rounded-md border border-indigo-800 px-10 py-2 text-indigo-800 transition-all duration-150 2xl:mr-10"
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
              className="rounded-md border border-indigo-800 px-10 py-2 text-indigo-800 transition-all duration-150 2xl:mr-10"
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
              className="rounded-md bg-indigo-800 px-10 py-2 text-white transition-all duration-150 hover:scale-105 hover:bg-indigo-900 dark:text-gray-700"
            >
              Next
            </button>
          )}
          {activeStep === 3 && (
            <button
              onClick={() => {
                document.getElementById("showValues")?.click();
                //document.getElementById("showWhitelistValues")?.click();
                scrollUp();
                alert("Your contract was saved successfully!");
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
