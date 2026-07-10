import { onboardingSteps } from "./data/onboarding-fake-data";

interface OnboardingStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

// Step 3 ("Quyết định của bạn") auto-completes once a team is registered — it has no dedicated screen to navigate back to.
const STEPS_WITHOUT_SCREEN = [3];

export function OnboardingStepper({ currentStep, onStepClick }: OnboardingStepperProps) {
  return (
    <header
      className="sticky top-0 z-20 border-b"
      style={{ backgroundColor: "rgba(22,12,4,0.92)", borderColor: "rgb(66,40,21)", backdropFilter: "blur(4px)" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 overflow-x-auto px-4 py-1.5 sm:py-2 sm:gap-3 sm:px-6">
        {onboardingSteps.map((step, i) => {
          const isDone = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isClickable = step.id <= currentStep && !STEPS_WITHOUT_SCREEN.includes(step.id);

          return (
            <div key={step.id} className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.id)}
                className="flex items-center gap-2 whitespace-nowrap disabled:cursor-not-allowed"
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
                  className="hidden text-xs font-semibold sm:inline"
                  style={{ color: isActive ? "rgb(255,253,249)" : isDone ? "rgb(196,168,139)" : "rgb(90,74,60)" }}
                >
                  {step.label}
                </span>
              </button>
              {i < onboardingSteps.length - 1 && (
                <span className="h-px w-4 sm:w-8" style={{ background: "linear-gradient(90deg, rgb(201,151,58), rgb(160,116,40))" }} />
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
}
