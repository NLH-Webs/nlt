import { ChevronRight } from "lucide-react";
import { onboardingTeams, teamFullLabel } from "./data/onboarding-fake-data";

interface StepFinalTeamChoiceProps {
  candidateTeamIds: string[];
  onConfirm: (teamId: string) => void;
}

const cardStyle = { backgroundColor: "rgba(255,251,242,0.96)", borderColor: "rgb(224,204,176)" };

export function StepFinalTeamChoice({ candidateTeamIds, onConfirm }: StepFinalTeamChoiceProps) {
  const candidateTeams = onboardingTeams.filter((team) => candidateTeamIds.includes(team.id));
  const teams = candidateTeams.length > 0 ? candidateTeams : onboardingTeams;

  return (
    <section className="flex min-h-full w-full flex-col items-center justify-center gap-6 py-6 text-center">
      <span className="text-4xl" aria-hidden="true">🤔</span>

      <div className="max-w-xl space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "rgb(139,115,85)" }}>
          Đã đến lúc đưa ra quyết định
        </p>
        <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl" style={{ color: "rgb(61,32,8)" }}>
          Dựa trên những gì bạn đã trải nghiệm, hãy chọn ra 1 team mà bạn muốn ứng tuyển nhất.
        </h2>
      </div>

      <div className="flex w-full max-w-xl flex-col gap-3">
        {teams.map((team) => (
          <button
            key={team.id}
            type="button"
            onClick={() => onConfirm(team.id)}
            className="flex items-center gap-4 rounded-2xl border p-4 text-left shadow-lg transition-transform hover:-translate-y-0.5"
            style={cardStyle}
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl"
              style={{ backgroundColor: "rgb(250,222,196)" }}
            >
              {team.icon}
            </span>
            <span className="flex-1 text-base font-extrabold" style={{ color: "rgb(61,32,8)" }}>
              {teamFullLabel(team)}
            </span>
            <ChevronRight className="h-5 w-5 shrink-0" style={{ color: "rgb(150,125,95)" }} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
