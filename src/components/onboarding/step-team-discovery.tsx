import { useEffect, useState } from "react";
import { discoveryQuizQuestions, onboardingTeams, quizRecommendedTeamIds, teamFullLabel, type OnboardingTeam } from "./data/onboarding-fake-data";
import { TeamMap } from "./team-map";
import { TeamDetailModal } from "./team-detail-modal";

interface StepTeamDiscoveryProps {
  onNext: () => void;
  onBack: () => void;
  registeredTeamIds: string[];
  onRegisteredSlot: (teamId: string) => void;
}

const goldButton = "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95";
const goldButtonStyle = { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" };
const headingStyle = { fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" };

export function StepTeamDiscovery({ onNext, onBack, registeredTeamIds, onRegisteredSlot }: StepTeamDiscoveryProps) {
  // If a team was already registered on a previous visit, jump straight back to the map instead of restarting the quiz.
  const [phase, setPhase] = useState<"intro" | "quiz" | "result" | "map">(registeredTeamIds.length > 0 ? "map" : "intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<OnboardingTeam | null>(null);
  const [showMapIntro, setShowMapIntro] = useState(registeredTeamIds.length === 0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [phase]);

  const currentQuestion = discoveryQuizQuestions[questionIndex];
  const recommendedTeams = onboardingTeams.filter((t) => quizRecommendedTeamIds.includes(t.id));

  const handleAnswer = () => {
    if (questionIndex < discoveryQuizQuestions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setPhase("result");
    }
  };

  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center text-center gap-5 my-auto">
        <span className="text-5xl">🧭</span>
        <h2 className="text-2xl font-bold" style={headingStyle}>
          Khám phá bản thân trước nhé
        </h2>
        <p className="text-sm max-w-sm" style={{ color: "rgb(196,168,139)" }}>
          Bài test ngắn sẽ giúp bạn hiểu mình phù hợp với team nào — chỉ mất khoảng 3-5 phút thôi.
        </p>
        <div className="flex gap-3 w-full max-w-sm">
          <button type="button" onClick={onBack} className="flex-1 rounded-xl border py-3 text-sm font-bold" style={{ borderColor: "rgb(90,64,42)", color: "rgb(196,168,139)" }}>
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
      <div className="w-full flex flex-col gap-6 my-auto">
        <div className="flex items-center justify-between text-xs font-bold" style={{ color: "rgb(196,168,139)" }}>
          <span>Câu {questionIndex + 1}/{discoveryQuizQuestions.length}</span>
        </div>
        <h3 className="text-lg font-bold" style={headingStyle}>
          {currentQuestion.question}
        </h3>
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={handleAnswer}
              className="w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors hover:border-[rgb(212,164,62)]"
              style={{ borderColor: "rgb(66,40,21)", color: "rgb(255,253,249)", backgroundColor: "rgba(22,12,4,0.9)" }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="flex flex-col items-center text-center gap-5 my-auto">
        <span className="text-4xl">✨</span>
        <h2 className="text-2xl font-bold" style={headingStyle}>
          Kết quả bài test của bạn
        </h2>
        <p className="text-sm" style={{ color: "rgb(196,168,139)" }}>
          Dựa trên bài test, những team này có thể phù hợp với bạn:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {recommendedTeams.map((team) => (
            <span
              key={team.id}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold"
              style={{ backgroundColor: "rgba(34,20,10,0.98)", color: "rgb(240,200,112)" }}
            >
              {team.icon} {teamFullLabel(team)}
            </span>
          ))}
        </div>
        <p className="text-xs max-w-sm" style={{ color: "rgb(139,115,85)" }}>
          Bạn vẫn có thể tự do khám phá tất cả các team — đây chỉ là gợi ý nhé!
        </p>
        <button type="button" onClick={() => setPhase("map")} className={goldButton} style={goldButtonStyle}>
          Khám phá bản đồ team →
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

      <TeamMap registeredTeamIds={registeredTeamIds} starredTeamIds={quizRecommendedTeamIds} onSelectTeam={setSelectedTeam} />

      {showMapIntro && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border p-6" style={{ backgroundColor: "rgba(22,12,4,0.97)", borderColor: "rgb(66,40,21)" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl">🗺️</p>
                <h3 className="text-lg font-bold" style={{ color: "rgb(255,253,249)" }}>
                  Khám phá các team
                </h3>
                <p className="text-xs" style={{ color: "rgb(139,115,85)" }}>
                  Hành trình NhiLe Team
                </p>
              </div>
              <button type="button" onClick={() => setShowMapIntro(false)} className="shrink-0 text-lg" style={{ color: "rgb(196,168,139)" }}>
                ✕
              </button>
            </div>

            <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "rgb(66,40,21)" }}>
              <p className="text-xs font-bold tracking-wide" style={{ color: "rgb(139,115,85)" }}>
                THÔNG TIN
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgb(196,168,139)" }}>
                Mỗi team tại NhiLe là một mảnh ghép và đâu đó trong bức tranh này, có một chỗ đang chờ bạn.
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgb(196,168,139)" }}>
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
          onContinueToCulture={() => {
            setSelectedTeam(null);
            onNext();
          }}
        />
      )}
    </div>
  );
}
