import React from "react";

interface StepperProps {
  stepsCount: number[];
  currentStep: number;
  handleStep: (step: number) => void;
  completedSteps: number[]; // This can be removed if it's no longer needed
}

const Stepper: React.FC<StepperProps> = ({
  stepsCount,
  currentStep,
  handleStep,
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-0 lg:hidden py-4">
      <ul aria-label="Steps" className="flex items-center">
        {stepsCount.map((item, idx) => (
          <li
            key={item}
            aria-current={currentStep === idx + 1 ? "step" : undefined}
            className="flex-1 last:flex-none flex items-center"
            onClick={() => handleStep(item)} // Allow navigation to any step
          >
            <div
              className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center
                ${currentStep > idx + 1
                  ? "bg-indigo-600 border-indigo-600"
                  : currentStep === idx + 1
                    ? "border-indigo-600"
                    : ""
                }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full bg-indigo-600 ${currentStep !== idx + 1 ? "hidden" : ""
                  }`}
              ></span>
              {currentStep > idx + 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </div>
            <hr
              className={`w-24 border ${idx + 1 === stepsCount.length
                ? "hidden"
                : currentStep > idx + 1
                  ? "border-indigo-600"
                  : ""
                }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stepper;
