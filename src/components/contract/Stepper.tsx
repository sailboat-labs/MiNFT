import React from "react";

interface AppProps {
  activeStep: number;
  stepsCount: number;
}

const Stepper = ({ activeStep, stepsCount }: AppProps) => {
  return (
    <div>
      {Array(stepsCount)
        .fill(null)
        .map((step: number, index: number) => (
          <span key={index}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1243 2.06901C10.7686 0.327778 13.2314 0.327776 13.8757 2.06901L15.7322 7.08616C15.9348 7.63359 16.3664 8.06522 16.9138 8.26779L21.931 10.1243C23.6722 10.7686 23.6722 13.2314 21.931 13.8757L16.9138 15.7322C16.3664 15.9348 15.9348 16.3664 15.7322 16.9138L13.8757 21.931C13.2314 23.6722 10.7686 23.6722 10.1243 21.931L8.26779 16.9138C8.06522 16.3664 7.63359 15.9348 7.08616 15.7322L2.06901 13.8757C0.327778 13.2314 0.327776 10.7686 2.06901 10.1243L7.08616 8.26779C7.63359 8.06522 8.06522 7.63359 8.26779 7.08616L10.1243 2.06901Z"
                fill="white"
              />
            </svg>
          </span>
        ))}
    </div>
  );
};

export default Stepper;
