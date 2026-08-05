interface CultureCompletionModalProps {
  pendingTeamCount: number;
  onBackToTour: () => void;
  onEndTourAndDecide: () => void;
}

const goldButton = "inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95";
const goldButtonStyle = { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" };

export function CultureCompletionModal({ pendingTeamCount, onBackToTour, onEndTourAndDecide }: CultureCompletionModalProps) {
  // No real "attended the Zoom tour" tracking in this prototype — a candidate is "still waiting"
  // on every team they registered for, so the pending count is just how many they registered.
  const hasMultiplePending = pendingTeamCount >= 2;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="culture-completion-title"
        className="w-full max-w-md rounded-3xl p-8 text-center shadow-2xl"
        style={{ backgroundColor: "rgb(255,251,242)" }}
      >
        <span className="text-4xl" aria-hidden="true">🎉</span>
        <h3 id="culture-completion-title" className="mt-4 text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" }}>
          Chúc mừng bạn đã hoàn thành việc tìm hiểu về văn hóa của NhiLe Team
        </h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgb(120,95,70)" }}>
          Những bài học và nguyên tắc này chính là chiếc la bàn giúp chúng mình hiểu nhau và đi cùng nhau thật xa.
        </p>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgb(120,95,70)" }}>
          {hasMultiplePending
            ? `Hiện tại, bạn vẫn còn ${pendingTeamCount} buổi tham quan team đang đợi. Hãy mang theo một tâm thế cởi mở, chuẩn bị sẵn giấy bút và tận hưởng những trải nghiệm sắp tới qua Zoom nha!`
            : "Hiện tại, bạn đang có 1 buổi tham quan team đang đợi lịch diễn ra. Bạn có muốn đặt lịch tham quan các team khác không?"}
        </p>

        {hasMultiplePending ? (
          <button type="button" onClick={onBackToTour} className={`mt-6 ${goldButton}`} style={goldButtonStyle}>
            Trở lại tham quan team
          </button>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            <button type="button" onClick={onEndTourAndDecide} className={goldButton} style={goldButtonStyle}>
              Không, mình muốn kết thúc tham quan
            </button>
            <button type="button" onClick={onBackToTour} className="w-full rounded-xl border py-3 text-sm font-bold" style={{ borderColor: "rgb(210,190,160)", color: "rgb(90,58,24)" }}>
              Có, mình muốn đặt lịch
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
