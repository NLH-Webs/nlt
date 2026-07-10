import { useState } from "react";
import { interviewDateSlots, interviewTimeSlots } from "./data/onboarding-fake-data";

interface StepScheduleInterviewProps {
  onBack: () => void;
}

const pillStyle = (active: boolean) =>
  active
    ? { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))", color: "rgb(255,253,249)", borderColor: "transparent" }
    : { backgroundColor: "rgba(253,244,224,0.05)", color: "rgb(138,96,32)", borderColor: "rgb(66,40,21)" };

export function StepScheduleInterview({ onBack }: StepScheduleInterviewProps) {
  const [dateId, setDateId] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isConfirmed) {
    const selectedDate = interviewDateSlots.find((d) => d.id === dateId);
    return (
      <div className="flex flex-col items-center text-center gap-3 animate-in fade-in zoom-in duration-300 my-auto">
        <span className="text-8xl leading-none">🎁</span>
        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" }}>
          Lịch của bạn đã được ghi nhận
        </h2>
        <p className="text-sm max-w-sm" style={{ color: "rgb(196,168,139)" }}>
          Buổi phỏng vấn: <span className="font-bold">{selectedDate?.label}</span> lúc{" "}
          <span className="font-bold">{time}</span>. Chi tiết và link Zoom sẽ được gửi qua email trong vòng 2 giờ.
        </p>
        <p className="text-xs" style={{ color: "rgb(139,115,85)" }}>
          Cần đổi lịch? Liên hệ HR qua Telegram{" "}
          <a href="https://t.me/HRNhiLeTeam02" className="font-semibold underline">
            @HRNhiLeTeam02
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 my-auto">
      <div className="text-center">
        <span className="text-4xl">🗓️</span>
        <h2 className="text-2xl font-bold mt-2" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" }}>
          Đặt lịch phỏng vấn
        </h2>
        <p className="text-sm mt-1" style={{ color: "rgb(196,168,139)" }}>
          Chọn ngày và giờ phù hợp với bạn
        </p>
      </div>

      <div>
        <p className="text-xs font-bold mb-2" style={{ color: "rgb(139,115,85)" }}>
          Chọn ngày
        </p>
        <div className="grid grid-cols-3 gap-2">
          {interviewDateSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => setDateId(slot.id)}
              className="rounded-xl border px-2 py-2 text-xs font-semibold transition-colors"
              style={pillStyle(dateId === slot.id)}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold mb-2" style={{ color: "rgb(139,115,85)" }}>
          Chọn giờ
        </p>
        <div className="grid grid-cols-4 gap-2">
          {interviewTimeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setTime(slot)}
              className="rounded-xl border px-2 py-2 text-xs font-bold transition-colors"
              style={pillStyle(time === slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 rounded-xl border py-3 text-sm font-bold" style={{ borderColor: "rgb(90,64,42)", color: "rgb(196,168,139)" }}>
          Quay lại
        </button>
        <button
          type="button"
          disabled={!dateId || !time}
          onClick={() => setIsConfirmed(true)}
          className="flex-[2] rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" }}
        >
          Đồng ý đặt lịch này ✓
        </button>
      </div>
    </div>
  );
}
