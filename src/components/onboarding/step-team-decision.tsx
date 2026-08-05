import { Sparkles } from "lucide-react";
import { onboardingTeams, teamFullLabel } from "./data/onboarding-fake-data";

interface StepTeamDecisionProps {
  recommendedTeamIds: string[];
  onBack: () => void;
  onExploreMap: () => void;
}

const goldButton =
  "inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 sm:w-auto";
const goldButtonStyle = { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" };

export function StepTeamDecision({ recommendedTeamIds, onBack, onExploreMap }: StepTeamDecisionProps) {
  const recommendedTeams = onboardingTeams.filter((team) => recommendedTeamIds.includes(team.id));

  return (
    <section className="flex min-h-full w-full flex-col items-center justify-center gap-6 py-6 text-center">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ background: "linear-gradient(135deg, rgb(61,122,79), rgb(27,67,50))", color: "rgb(255,253,249)" }}
      >
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="max-w-xl space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "rgb(139,115,85)" }}>
          Gợi ý team
        </p>
        <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl" style={{ color: "rgb(61,32,8)" }}>
          Có vài team rất hợp với cách bạn tỏa sáng.
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed" style={{ color: "rgb(120,95,70)" }}>
          Đây là gợi ý từ bài test. Bạn vẫn có thể tự do khám phá toàn bộ bản đồ team trước khi chọn lịch tham quan.
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
        {recommendedTeams.map((team) => (
          <article
            key={team.id}
            className="rounded-2xl border p-4 text-left shadow-lg"
            style={{ backgroundColor: "rgba(255,251,242,0.96)", borderColor: "rgb(224,204,176)" }}
          >
            <div className="flex items-center gap-3">
              <img src={team.image} alt={teamFullLabel(team)} className="h-14 w-14 rounded-xl object-contain" />
              <div>
                <span
                  className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold"
                  style={{ backgroundColor: "rgb(224,242,229)", color: "rgb(40,90,60)" }}
                >
                  Team phù hợp
                </span>
                <h3 className="mt-1 text-base font-extrabold" style={{ color: "rgb(61,32,8)" }}>
                  {teamFullLabel(team)}
                </h3>
              </div>
            </div>
            <p className="mt-3 line-clamp-3 text-xs leading-relaxed" style={{ color: "rgb(90,70,50)" }}>
              {team.about}
            </p>
          </article>
        ))}
      </div>

      <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <button type="button" onClick={onBack} className="rounded-xl border px-6 py-3 text-sm font-bold" style={{ borderColor: "rgb(90,64,42)", color: "rgb(90,58,24)" }}>
          Làm lại bài test
        </button>
        <button type="button" onClick={onExploreMap} className={goldButton} style={goldButtonStyle}>
          Khám phá bản đồ team
        </button>
      </div>
    </section>
  );
}
