import { onboardingSteps } from "./data/onboarding-fake-data";

interface OnboardingStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function OnboardingStepper({ currentStep, onStepClick }: OnboardingStepperProps) {
  return (
    <header
      className="sticky top-0 z-20 border-b"
      style={{ backgroundColor: "rgba(255,251,242,0.92)", borderColor: "rgb(224,204,176)", backdropFilter: "blur(4px)" }}
    >
      <div className="mx-auto grid w-full grid-cols-6 overflow-hidden px-3 py-1.5 sm:px-5 sm:py-2">
        {onboardingSteps.map((step, i) => {
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isClickable = step.id <= currentStep;

          return (
            <div key={step.id} className="relative flex min-w-0 flex-col items-center">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.id)}
                aria-label={`${step.id}. ${step.label}${isActive ? " - bước hiện tại" : ""}`}
                aria-current={isActive ? "step" : undefined}
                className="relative z-10 flex min-w-0 flex-col items-center gap-1 disabled:cursor-not-allowed"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
                  style={
                    isDone || isActive
                      ? { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))", color: "rgb(255,253,249)" }
                      : { border: "1px solid rgb(90,64,42)", color: "rgb(139,115,85)" }
                  }
                >
                  {isDone ? "✓" : step.id}
                </span>
                <span
                  className="hidden w-full truncate text-center text-xs font-semibold sm:block"
                  style={{ color: isActive ? "rgb(61,32,8)" : isDone ? "rgb(139,115,85)" : "rgb(196,180,160)" }}
                >
                  {step.label}
                </span>
              </button>
              {i < onboardingSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+14px)] right-[calc(-50%+14px)] top-3.5 z-0 h-px"
                  style={{ background: "linear-gradient(90deg, rgb(201,151,58), rgb(160,116,40))" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
}
