import { Sparkles } from "lucide-react";
import { onboardingTeams, type OnboardingTeam } from "./data/onboarding-fake-data";

interface TeamMapProps {
  registeredTeamIds: string[];
  starredTeamIds: string[];
  onSelectTeam: (team: OnboardingTeam) => void;
}

export function TeamMap({ registeredTeamIds, starredTeamIds, onSelectTeam }: TeamMapProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border" style={{ borderColor: "rgb(66,40,21)" }}>
      <img src="/onboarding/site-final-flow.png" alt="Bản đồ các team NhiLe Team" className="w-full" />

      {onboardingTeams.map((team) => {
        const isRegistered = registeredTeamIds.includes(team.id);
        const isStarred = starredTeamIds.includes(team.id);
        const showRegisteredState = isRegistered && team.id !== "social-event";

        return (
          <button
            key={team.id}
            type="button"
            onClick={() => onSelectTeam(team)}
            className="absolute min-h-11 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold shadow-lg transition-transform hover:scale-105"
            style={{
              top: team.mapPosition.top,
              left: team.mapPosition.left,
              backgroundColor: "rgba(22,12,4,0.9)",
              borderColor: showRegisteredState ? "rgb(74,222,128)" : "rgb(212,164,62)",
              color: showRegisteredState ? "rgb(134,239,172)" : "rgb(255,253,249)",
            }}
          >
            {team.name}
            {showRegisteredState && " ✓"}
            {isStarred && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]"
                style={{ backgroundColor: "rgb(224,242,229)", color: "rgb(40,90,60)" }}
              >
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Team phù hợp
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
