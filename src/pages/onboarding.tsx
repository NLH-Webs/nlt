import { useEffect, useState } from "react";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { StepWelcome } from "@/components/onboarding/step-welcome";
import { StepTeamDiscovery } from "@/components/onboarding/step-team-discovery";
import { StepCulture } from "@/components/onboarding/step-culture";
import { StepScheduleInterview } from "@/components/onboarding/step-schedule-interview";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wantsInterview, setWantsInterview] = useState(true);
  const [registeredTeamIds, setRegisteredTeamIds] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentStep]);

  const goToStep = (step: number) => setCurrentStep(step);

  return (
    <OnboardingLayout currentStep={currentStep} onStepClick={goToStep}>
      {currentStep === 1 && <StepWelcome onNext={() => goToStep(2)} />}

      {currentStep === 2 && (
        <StepTeamDiscovery
          onBack={() => goToStep(1)}
          onNext={() => goToStep(4)}
          registeredTeamIds={registeredTeamIds}
          onRegisteredSlot={(teamId) => setRegisteredTeamIds((prev) => (prev.includes(teamId) ? prev : [...prev, teamId]))}
        />
      )}

      {currentStep === 4 && (
        <StepCulture
          onBack={() => goToStep(2)}
          onNext={(interested) => {
            setWantsInterview(interested);
            goToStep(5);
          }}
        />
      )}

      {currentStep === 5 && wantsInterview && <StepScheduleInterview onBack={() => goToStep(4)} />}

      {currentStep === 5 && !wantsInterview && (
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-6xl">🌱</span>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" }}>
            Cảm ơn bạn đã dành thời gian tìm hiểu
          </h2>
          <p className="text-sm max-w-sm" style={{ color: "rgb(196,168,139)" }}>
            Không sao cả — hãy cứ suy nghĩ thêm nhé. Buổi tham quan Zoom bạn đã đăng ký vẫn được giữ nguyên, Minh Thư
            sẽ nhắc bạn qua email khi gần đến ngày hẹn.
          </p>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default Onboarding;
