import { ReactNode } from "react";
import { OnboardingStepper } from "./onboarding-stepper";

interface OnboardingLayoutProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  children: ReactNode;
}

export function OnboardingLayout({ currentStep, onStepClick, children }: OnboardingLayoutProps) {
  const isCultureStep = currentStep === 4;
  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col font-['Be_Vietnam_Pro',sans-serif]" style={{ backgroundColor: "rgb(22,12,4)" }}>
      <OnboardingStepper currentStep={currentStep} onStepClick={onStepClick} />

      <main
        className="relative flex-1 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url(/onboarding/site-background_trang.png)" }}
      >
        <div className={`relative z-10 mx-auto flex h-full max-w-5xl items-start justify-center px-4 py-2 sm:py-3 sm:px-8 overflow-y-auto ${isCultureStep ? "" : "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
