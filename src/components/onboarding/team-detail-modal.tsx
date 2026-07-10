import { useState } from "react";
import { teamFullLabel, type OnboardingTeam } from "./data/onboarding-fake-data";

interface TeamDetailModalProps {
  team: OnboardingTeam;
  onClose: () => void;
  onContinueToCulture: () => void;
  onBrowseOtherTeams: () => void;
  onRegisteredSlot: (teamId: string) => void;
}

const creamCard = { backgroundColor: "rgb(255,251,242)" };

export function TeamDetailModal({ team, onClose, onContinueToCulture, onBrowseOtherTeams, onRegisteredSlot }: TeamDetailModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  if (isRegistered) {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-8 text-center shadow-2xl" style={creamCard}>
          <span className="text-4xl">🎥</span>
          <h3 className="mt-4 text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" }}>
            Đăng ký thành công!
          </h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgb(120,95,70)" }}>
            Trong lúc chờ đến ngày tham quan, hãy cùng tìm hiểu về văn hóa &amp; nguyên tắc của NhiLe Team nhé.
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgb(120,95,70)" }}>
            Việc này giúp bạn hiểu hơn về cộng đồng bạn chuẩn bị tham gia đó.
          </p>

          <button
            type="button"
            onClick={onContinueToCulture}
            className="mt-6 w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" }}
          >
            Xem video văn hóa ngay →
          </button>
          <button
            type="button"
            onClick={onBrowseOtherTeams}
            className="mt-3 w-full rounded-xl border py-3 text-sm font-bold"
            style={{ borderColor: "rgb(210,190,160)", color: "rgb(90,58,24)" }}
          >
            Đăng ký thêm team khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
      <div className="grid w-full max-w-3xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto" style={creamCard}>
        <div
          className="flex h-40 items-center justify-center md:h-auto"
          style={{ background: "linear-gradient(135deg, rgb(250,235,215), rgb(240,218,190))" }}
        >
          <img src={team.image} alt={team.name} className="h-full w-full object-contain p-6 drop-shadow-xl" />
        </div>

        <div className="flex flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base"
                style={{ backgroundColor: "rgb(250,222,196)" }}
              >
                {team.icon}
              </span>
              <div>
                <h3 className="text-base font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" }}>
                  {teamFullLabel(team)}
                </h3>
                <p className="text-[11px]" style={{ color: "rgb(150,125,95)" }}>
                  Hành trình NhiLe Team
                </p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="shrink-0 text-lg leading-none" style={{ color: "rgb(150,125,95)" }}>
              ✕
            </button>
          </div>

          <div className="mt-3">
            <p className="text-[11px] font-bold tracking-wide" style={{ color: "rgb(150,125,95)" }}>
              VỀ TEAM NÀY
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "rgb(90,70,50)" }}>
              {team.about}
            </p>
          </div>

          <div className="mt-3">
            <p className="text-[11px] font-bold tracking-wide" style={{ color: "rgb(150,125,95)" }}>
              📅 CHỌN BUỔI THAM QUAN
            </p>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {team.dateSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className="rounded-lg border px-3 py-1.5 text-left text-xs font-semibold transition-colors"
                  style={
                    selectedSlot === slot
                      ? { borderColor: "rgb(212,164,62)", backgroundColor: "rgba(212,164,62,0.15)", color: "rgb(61,32,8)" }
                      : { borderColor: "rgb(224,204,176)", color: "rgb(90,58,24)", backgroundColor: "rgb(250,240,224)" }
                  }
                >
                  📅 {slot}
                </button>
              ))}
            </div>
          </div>

          <div
            className="mt-3 rounded-lg px-3 py-1.5 text-[11px]"
            style={{ backgroundColor: "rgb(224,242,229)", color: "rgb(40,90,60)" }}
          >
            📩 Link Zoom sẽ được gửi qua email của bạn sau khi đăng ký.
          </div>

          <button
            type="button"
            disabled={!selectedSlot}
            onClick={() => {
              setIsRegistered(true);
              onRegisteredSlot(team.id);
            }}
            className="mt-3 w-full rounded-xl py-2.5 text-xs font-bold text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" }}
          >
            {selectedSlot ? `Đăng ký buổi ${selectedSlot}` : "Chọn một buổi để đăng ký"}
          </button>

          <button type="button" onClick={onBrowseOtherTeams} className="mt-2 text-[11px] font-semibold underline" style={{ color: "rgb(150,125,95)" }}>
            Xem team khác trước
          </button>
        </div>
      </div>
    </div>
  );
}
