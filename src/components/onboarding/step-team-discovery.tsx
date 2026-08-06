import { useEffect, useState } from "react";
import { onboardingTeams, type OnboardingTeam } from "./data/onboarding-fake-data";
import { TeamMap } from "./team-map";
import { TeamDetailModal } from "./team-detail-modal";

const EXTERNAL_TEST_URL = "https://test.nhi.sg/";

function pickRandomTeamIds(count = 3) {
  const shuffled = [...onboardingTeams].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((team) => team.id);
}

interface StepTeamDiscoveryProps {
  onBack: () => void;
  onShowDecision: (teamIds: string[]) => void;
  onContinueToCulture: () => void;
  registeredTeamIds: string[];
  recommendedTeamIds: string[];
  startOnMap: boolean;
  onRegisteredSlot: (teamId: string) => void;
  onUnregisteredSlot: (teamId: string) => void;
}

const goldButton = "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95";
const goldButtonStyle = { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" };
const headingStyle = { fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" };

export function StepTeamDiscovery({
  onBack,
  onShowDecision,
  onContinueToCulture,
  registeredTeamIds,
  recommendedTeamIds,
  startOnMap,
  onRegisteredSlot,
  onUnregisteredSlot,
}: StepTeamDiscoveryProps) {
  // If a team was already registered on a previous visit, jump straight back to the map instead of restarting the quiz.
  const [phase, setPhase] = useState<"intro" | "quiz" | "map">(startOnMap || registeredTeamIds.length > 0 ? "map" : "intro");
  const [selectedTeam, setSelectedTeam] = useState<OnboardingTeam | null>(null);
  const [showMapIntro, setShowMapIntro] = useState(registeredTeamIds.length === 0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [phase]);

  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center text-center gap-5 my-auto">
        <h2 className="text-2xl font-extrabold" style={headingStyle}>
          Khám phá bản thân trước nhé
        </h2>
        <p className="text-sm max-w-sm" style={{ color: "rgb(120,95,70)" }}>
          Bài test ngắn sẽ giúp bạn hiểu mình phù hợp với team nào — chỉ mất khoảng 3-5 phút thôi.
        </p>
        <div className="flex gap-3 w-full max-w-sm">
          <button type="button" onClick={onBack} className="flex-1 rounded-xl border py-3 text-sm font-bold" style={{ borderColor: "rgb(90,64,42)", color: "rgb(90,58,24)" }}>
            Quay lại
          </button>
          <button type="button" onClick={() => setPhase("quiz")} className={`flex-[2] ${goldButton}`} style={goldButtonStyle}>
            Làm bài test ngay →
          </button>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 my-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold" style={headingStyle}>
            Làm bài test
          </h3>
          <button type="button" onClick={() => setPhase("intro")} className="text-xs font-semibold underline" style={{ color: "rgb(120,95,70)" }}>
            Quay lại
          </button>
        </div>
        <div className="w-full overflow-hidden rounded-2xl border" style={{ borderColor: "rgb(66,40,21)" }}>
          <iframe
            src={EXTERNAL_TEST_URL}
            title="Bài test khám phá bản thân"
            className="h-[65vh] w-full sm:h-[70vh]"
            style={{ backgroundColor: "rgb(255,253,249)" }}
          />
        </div>
        <button
          type="button"
          onClick={() => onShowDecision(pickRandomTeamIds())}
          className={`w-full ${goldButton}`}
          style={goldButtonStyle}
        >
          Tôi đã làm xong bài test →
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 my-auto">
      <div className="text-center">
        <h2 className="text-xl font-bold" style={headingStyle}>
          Khám phá các team
        </h2>
        <p className="text-xs mt-1" style={{ color: "rgb(139,115,85)" }}>
          Chọn một phòng để xem thông tin và đặt lịch tham quan qua Zoom.
        </p>
      </div>

      <TeamMap registeredTeamIds={registeredTeamIds} starredTeamIds={recommendedTeamIds} onSelectTeam={setSelectedTeam} />

      {showMapIntro && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-map-intro-title"
            className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{ backgroundColor: "rgb(255,251,242)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl">🗺️</p>
                <h3 id="team-map-intro-title" className="text-lg font-bold" style={{ color: "rgb(61,32,8)" }}>
                  Khám phá các team
                </h3>
                <p className="text-xs" style={{ color: "rgb(139,115,85)" }}>
                  Hành trình NhiLe Team
                </p>
              </div>
              <button type="button" aria-label="Đóng hướng dẫn bản đồ team" onClick={() => setShowMapIntro(false)} className="shrink-0 text-lg" style={{ color: "rgb(150,125,95)" }}>
                ✕
              </button>
            </div>

            <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "rgb(224,204,176)" }}>
              <p className="text-xs font-bold tracking-wide" style={{ color: "rgb(139,115,85)" }}>
                THÔNG TIN
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgb(90,70,50)" }}>
                Mỗi team tại NhiLe là một mảnh ghép và đâu đó trong bức tranh này, có một chỗ đang chờ bạn.
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgb(90,70,50)" }}>
                Hãy dành thời gian tìm hiểu tối thiểu 1 và tối đa 3 team mà bạn cảm thấy gần gũi nhất với bản thân.
                Bạn có tối đa 3 cơ hội tham quan trực tiếp qua Zoom. Vì vậy hãy lắng nghe chính mình thật kỹ trước khi
                lựa chọn nhé!
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowMapIntro(false)}
              className="mt-4 w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg"
              style={goldButtonStyle}
            >
              Hiểu rồi, bắt đầu thôi!
            </button>
          </div>
        </div>
      )}

      {selectedTeam && (
        <TeamDetailModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onBrowseOtherTeams={() => setSelectedTeam(null)}
          onRegisteredSlot={onRegisteredSlot}
          onUnregisteredSlot={onUnregisteredSlot}
          registeredTeamIds={registeredTeamIds}
          onContinueToCulture={() => {
            setSelectedTeam(null);
            onContinueToCulture();
          }}
        />
      )}
    </div>
  );
}
