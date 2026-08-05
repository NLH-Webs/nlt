import { useEffect, useState } from "react";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { StepWelcome } from "@/components/onboarding/step-welcome";
import { StepTeamDiscovery } from "@/components/onboarding/step-team-discovery";
import { CULTURE_PROGRESS_STORAGE_KEY, StepCulture } from "@/components/onboarding/step-culture";
import { StepTeamDecision } from "@/components/onboarding/step-team-decision";
import { StepFinalTeamChoice } from "@/components/onboarding/step-final-team-choice";
import { InterviewConfirmationLetter } from "@/components/onboarding/interview-confirmation-letter";
import { StepScheduleInterview } from "@/components/onboarding/step-schedule-interview";
import { Leaf } from "lucide-react";

const TEAM_TOUR_STORAGE_KEY = "nlt-onboarding-team-tour";

function hasInProgressCultureVideos() {
  if (typeof window === "undefined") return false;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CULTURE_PROGRESS_STORAGE_KEY) || "");
    return (Number(parsed.videoIndex) || 0) > 0 || (Array.isArray(parsed.completedVideoIndexes) && parsed.completedVideoIndexes.length > 0);
  } catch {
    return false;
  }
}

function readSavedTeamTour(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(TEAM_TOUR_STORAGE_KEY) || "");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(() => (hasInProgressCultureVideos() ? 4 : 1));
  const [registeredTeamIds, setRegisteredTeamIds] = useState<string[]>(readSavedTeamTour);
  const [hasSeenTeamDecision, setHasSeenTeamDecision] = useState(false);
  const [recommendedTeamIds, setRecommendedTeamIds] = useState<string[]>([]);
  const [finalTeamId, setFinalTeamId] = useState<string | null>(null);
  const [interviewConfirmed, setInterviewConfirmed] = useState(false);
  const [wantsInterview, setWantsInterview] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentStep]);

  useEffect(() => {
    try {
      window.localStorage.setItem(TEAM_TOUR_STORAGE_KEY, JSON.stringify(registeredTeamIds));
    } catch {
      // Keep the in-memory demo flow usable when storage is unavailable.
    }
  }, [registeredTeamIds]);

  const goToStep = (step: number) => setCurrentStep(step);

  const declineInterview = () => {
    try {
      window.localStorage.removeItem(CULTURE_PROGRESS_STORAGE_KEY);
      window.localStorage.removeItem(TEAM_TOUR_STORAGE_KEY);
    } catch {
      // Storage can be blocked in private/restricted browsers; reset in-memory state anyway.
    }
    setRegisteredTeamIds([]);
    setHasSeenTeamDecision(false);
    setRecommendedTeamIds([]);
    setFinalTeamId(null);
    setWantsInterview(false);
    setInterviewConfirmed(true);
  };

  return (
    <OnboardingLayout currentStep={currentStep} onStepClick={goToStep}>
      {currentStep === 1 && <StepWelcome onNext={() => goToStep(2)} />}

      {currentStep === 2 && (
        <StepTeamDiscovery
          onBack={() => goToStep(1)}
          onShowDecision={(teamIds) => {
            setRecommendedTeamIds(teamIds);
            goToStep(3);
          }}
          onContinueToCulture={() => goToStep(4)}
          registeredTeamIds={registeredTeamIds}
          recommendedTeamIds={recommendedTeamIds}
          startOnMap={hasSeenTeamDecision}
          onRegisteredSlot={(teamId) => setRegisteredTeamIds((prev) => (prev.includes(teamId) ? prev : [...prev, teamId]))}
        />
      )}

      {currentStep === 3 && (
        <StepTeamDecision
          recommendedTeamIds={recommendedTeamIds}
          onBack={() => {
            setHasSeenTeamDecision(false);
            goToStep(2);
          }}
          onExploreMap={() => {
            setHasSeenTeamDecision(true);
            goToStep(2);
          }}
        />
      )}

      {currentStep === 4 && (
        <StepCulture
          registeredTeamIds={registeredTeamIds}
          onBack={() => goToStep(2)}
          onNext={() => goToStep(5)}
        />
      )}

      {currentStep === 5 && (
        <StepFinalTeamChoice
          candidateTeamIds={registeredTeamIds}
          onConfirm={(teamId) => {
            setFinalTeamId(teamId);
            goToStep(6);
          }}
        />
      )}

      {currentStep === 6 && !interviewConfirmed && (
        <InterviewConfirmationLetter onConfirm={() => setInterviewConfirmed(true)} onDecline={declineInterview} />
      )}

      {currentStep === 6 && interviewConfirmed && wantsInterview && (
        <StepScheduleInterview finalTeamId={finalTeamId} onBack={() => goToStep(5)} />
      )}

      {currentStep === 6 && interviewConfirmed && !wantsInterview && (
        <div className="flex flex-col items-center text-center gap-3">
          <Leaf className="h-12 w-12" style={{ color: "rgb(61,122,79)" }} aria-hidden="true" />
          <h2 className="text-2xl font-extrabold" style={{ color: "rgb(61,32,8)" }}>
            Cảm ơn bạn đã dành thời gian tìm hiểu
          </h2>
          <p className="text-sm max-w-sm leading-relaxed" style={{ color: "rgb(120,95,70)" }}>
            Không sao cả, hãy cứ suy nghĩ thêm. Dữ liệu video demo đã được xóa và bạn có thể bắt đầu lại khi sẵn sàng.
          </p>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default Onboarding;
