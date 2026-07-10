import { useEffect, useState, useRef } from "react";
import { cultureVideos } from "./data/onboarding-fake-data";

interface StepCultureProps {
  onNext: (wantsInterview: boolean) => void;
  onBack: () => void;
}

export function StepCulture({ onNext, onBack }: StepCultureProps) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVideoCompleted(false);
    setCountdown(5);
    setShowDecisionModal(false);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setVideoCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [videoIndex]);

  useEffect(() => {
    if (videoCompleted && inputAreaRef.current) {
      setTimeout(() => {
        inputAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }, [videoCompleted]);

  useEffect(() => {
    if (isSubmitted && inputAreaRef.current) {
      setTimeout(() => {
        inputAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }, [isSubmitted]);

  const currentVideo = cultureVideos[videoIndex];
  const isLastVideo = videoIndex === cultureVideos.length - 1;
  const progressPct = (currentVideo.index / cultureVideos.length) * 100;

  const handleNextVideo = () => {
    if (isLastVideo) {
      setShowDecisionModal(true);
      return;
    }
    setVideoIndex((i) => i + 1);
    setAnswer("");
    setIsSubmitted(false);
  };

  return (
    <div className="w-full flex flex-col gap-5 my-auto">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold whitespace-nowrap" style={{ color: "rgb(139,115,85)" }}>
          Video {currentVideo.index}/{cultureVideos.length}
        </span>
        <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: "rgba(196,168,139,0.25)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, rgb(201,151,58), rgb(160,116,40))" }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="self-start rounded-full px-4 py-2 text-xs font-bold"
        style={{ backgroundColor: "rgba(22,12,4,0.9)", color: "rgb(255,253,249)" }}
      >
        ← Trở về Bản đồ Team
      </button>

      <div>
        <p className="text-xs font-bold tracking-wide" style={{ color: "rgb(139,115,85)" }}>
          VĂN HÓA &amp; NGUYÊN TẮC
        </p>
        <h2 className="text-xl font-bold mt-1" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" }}>
          {currentVideo.title}
        </h2>
      </div>

      <div
        className="aspect-video w-full rounded-xl flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: "rgba(22,12,4,0.92)" }}
      >
        <div className="flex flex-col items-center gap-2 text-center px-6">
          <span className="text-3xl animate-bounce">🎬</span>
          <p className="text-sm font-semibold" style={{ color: "rgb(240,200,112)" }}>
            {videoCompleted ? "Video đã phát xong" : `Đang phát video... (${countdown}s)`}
          </p>
          <p className="text-xs max-w-sm mt-1" style={{ color: "rgb(196,168,139)" }}>
            {videoCompleted
              ? "Bạn có thể đọc nội dung câu hỏi bên dưới và chia sẻ cảm nhận."
              : "Vui lòng xem hết video để hiển thị câu hỏi và ô nhập câu trả lời."}
          </p>
        </div>

        {/* Simulated progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-[rgb(212,164,62)] to-[rgb(138,96,32)] transition-all duration-1000 ease-linear"
            style={{ width: `${((5 - countdown) / 5) * 100}%` }}
          />
        </div>
      </div>

      {videoCompleted && (
        <div ref={inputAreaRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full flex flex-col gap-5">
          {/* 1. Always show the Question box (left, brown) */}
          <div className="flex items-start gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
              style={{ background: "linear-gradient(135deg, rgb(61,122,79), rgb(27,67,50))" }}
            >
              🌱
            </span>
            <div className="rounded-xl rounded-tl-none px-4 py-3 text-sm" style={{ backgroundColor: "rgba(22,12,4,0.92)", color: "rgb(255,253,249)" }}>
              {currentVideo.question}
            </div>
          </div>

          {/* 2. Show Input area if NOT submitted */}
          {!isSubmitted && (
            <div className="rounded-xl p-1 border animate-in fade-in duration-300" style={{ backgroundColor: "rgba(22,12,4,0.92)", borderColor: "rgb(66,40,21)" }}>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Chia sẻ suy nghĩ của bạn..."
                rows={3}
                className="w-full resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-[rgb(139,115,85)]"
                style={{ color: "rgb(255,253,249)" }}
              />
              <div className="flex justify-end px-2 pb-2">
                <button
                  type="button"
                  disabled={!answer.trim()}
                  onClick={() => setIsSubmitted(true)}
                  className="rounded-lg px-4 py-2 text-xs font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" }}
                >
                  Gửi →
                </button>
              </div>
            </div>
          )}

          {/* 3. Show Chat flow elements if submitted */}
          {isSubmitted && (
            <div className="flex flex-col gap-5 w-full animate-in fade-in duration-300">
              {/* User Answer Bubble (right, green) */}
              <div className="flex justify-end w-full">
                <div className="rounded-xl rounded-tr-none px-4 py-3 text-sm max-w-[85%] text-left" style={{ background: "linear-gradient(135deg, rgb(61,122,79), rgb(27,67,50))", color: "rgb(255,253,249)" }}>
                  {answer}
                </div>
              </div>

              {/* HR Confirmation / Feedback Bubble (left, brown) */}
              <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
                  style={{ background: "linear-gradient(135deg, rgb(61,122,79), rgb(27,67,50))" }}
                >
                  🌱
                </span>
                <div className="rounded-xl rounded-tl-none px-4 py-3 text-sm" style={{ backgroundColor: "rgba(22,12,4,0.92)", color: "rgb(196,168,139)" }}>
                  {currentVideo.feedback}
                </div>
              </div>

              {/* Button to proceed */}
              <button
                type="button"
                onClick={handleNextVideo}
                className="self-center rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
                style={{ background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" }}
              >
                {isLastVideo ? "Hoàn tất & xem kết quả →" : "Video tiếp theo →"}
              </button>
            </div>
          )}

          {/* 4. Show Decision overlay POPUP modal if last video is submitted and decision phase reached */}
          {showDecisionModal && (
            <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
              <div className="w-full max-w-md rounded-2xl border p-6 animate-in fade-in zoom-in duration-300 text-left" style={{ backgroundColor: "rgba(22,12,4,0.97)", borderColor: "rgb(66,40,21)" }}>
                <div className="text-center">
                  <span className="text-4xl">🌱</span>
                  <h3 className="mt-3 text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(255,253,249)" }}>
                    Quyết định của bạn
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgb(196,168,139)" }}>
                    Sau khi tìm hiểu văn hóa NhiLe Team, bạn muốn bước tiếp theo là gì?
                  </p>
                </div>
                <div className="mt-5 w-full flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => onNext(true)}
                    className="w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
                    style={{ background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" }}
                  >
                    Mình muốn phỏng vấn
                  </button>
                  <button
                    type="button"
                    onClick={() => onNext(false)}
                    className="w-full rounded-xl border py-3 text-sm font-semibold transition-colors"
                    style={{ borderColor: "rgb(90,64,42)", color: "rgb(255,253,249)", backgroundColor: "rgba(22,12,4,0.9)" }}
                  >
                    Mình cần suy nghĩ thêm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
