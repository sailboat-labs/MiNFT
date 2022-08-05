import React from "react";

interface AppProps {
  activeStep: number;
  stepsCount: number;
  onStep: (step?: number) => void;
  stepLabels: string[];
}

const Stepper = ({
  activeStep = 1,
  stepsCount,
  onStep,
  stepLabels,
}: AppProps) => {
  /**
   *
   * @param {Number} index - index to compare with
   * @returns {Boolean} - whether step ahs been reached or not
   */
  function completedStep(index: number): boolean {
    return index + 1 <= activeStep;
  }

  return (
    <div className="relative mx-auto mb-10 mt-14 flex  items-center justify-between">
      <button
        className="group h-6 w-6 rounded-full bg-white fill-indigo-800 disabled:cursor-not-allowed disabled:!fill-gray-300 dark:bg-[color:var(--dark)]"
        disabled={activeStep === 1}
        onClick={() => onStep(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transform transition-transform group-hover:-translate-x-2 group-hover:disabled:-translate-x-0"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {Array(stepsCount)
        .fill(null)
        .map((_, index: number) => (
          <span key={index} className="relative">
            <svg
              width="24"
              height="24"
              style={{ fill: completedStep(index) ? "#3730A3" : "#eaeaea" }}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1243 2.06901C10.7686 0.327778 13.2314 0.327776 13.8757 2.06901L15.7322 7.08616C15.9348 7.63359 16.3664 8.06522 16.9138 8.26779L21.931 10.1243C23.6722 10.7686 23.6722 13.2314 21.931 13.8757L16.9138 15.7322C16.3664 15.9348 15.9348 16.3664 15.7322 16.9138L13.8757 21.931C13.2314 23.6722 10.7686 23.6722 10.1243 21.931L8.26779 16.9138C8.06522 16.3664 7.63359 15.9348 7.08616 15.7322L2.06901 13.8757C0.327778 13.2314 0.327776 10.7686 2.06901 10.1243L7.08616 8.26779C7.63359 8.06522 8.06522 7.63359 8.26779 7.08616L10.1243 2.06901Z"
                // fill={index + 1 <= activeStep ? "#3730A3" : "red"}
              />
            </svg>
            <strong
              className={`absolute bottom-[length:calc(100%+6px)] left-1/2 min-w-[200px] -translate-x-1/2 transform text-center ${
                completedStep(index) ? "text-indigo-800" : "text-gray-300"
              }`}
            >
              {stepLabels[index]}
            </strong>
          </span>
        ))}
      <div className="absolute top-1/2 -z-10 h-[1px]  w-full -translate-y-1/2 transform bg-indigo-800"></div>
      <button
        className="group h-6 w-6 rounded-full bg-white fill-indigo-800 disabled:cursor-not-allowed disabled:!fill-gray-300 dark:bg-[color:var(--dark)]"
        onClick={() => onStep()}
        disabled={activeStep === stepsCount}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transform transition-transform group-hover:translate-x-2"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Stepper;
