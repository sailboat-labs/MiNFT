import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveStep } from "redux/reducers/selectors/contract";
import { nextStep } from "redux/reducers/slices/contract";

interface AppProps {
  beforeStep: () => boolean;
}

const StepperFooter: FC<AppProps> = (props) => {
  const activeStep = useSelector(getActiveStep);
  const dispatch = useDispatch();

  function handleStep(step = 1) {
    console.log(step > 0, activeStep > 1, props.beforeStep());
    if (step > 0 && activeStep > 1 && props.beforeStep()) {
      console.log("go to next");
      dispatch(nextStep(step));
      return;
    }

    dispatch(nextStep(step));
  }

  return (
    <section className="flex items-center justify-center gap-6 pt-16">
      {activeStep > 1 && (
        <button
          onClick={() => handleStep(-1)}
          className="min-w-[150px] rounded-md  border border-indigo-800 py-2 text-indigo-800 transition-all duration-150"
        >
          Back
        </button>
      )}
      {activeStep < 3 && (
        <button
          onClick={() => handleStep(1)}
          className="min-w-[150px] rounded-md bg-indigo-800 py-2 text-white transition-all duration-150 hover:bg-indigo-900 dark:text-gray-700"
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
  );
};

export default StepperFooter;
