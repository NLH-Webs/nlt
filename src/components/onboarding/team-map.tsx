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
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold shadow-lg transition-transform hover:scale-105"
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
            {!showRegisteredState && isStarred && " ⭐"}
          </button>
        );
      })}
    </div>
  );
}
