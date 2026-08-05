import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, History, Video } from "lucide-react";
import { cultureVideos } from "./data/onboarding-fake-data";
import { CultureCompletionModal } from "./culture-completion-modal";

interface StepCultureProps {
  registeredTeamIds: string[];
  onNext: () => void;
  onBack: () => void;
}

interface CultureProgress {
  videoIndex: number;
  answers: Record<string, string>;
  submittedVideoIndexes: number[];
  completedVideoIndexes: number[];
}

export const CULTURE_PROGRESS_STORAGE_KEY = "nlt-onboarding-culture-progress";

const goldButtonStyle = { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" };
const panelStyle = { backgroundColor: "rgb(255,251,242)", borderColor: "rgb(224,204,176)" };

function defaultProgress(): CultureProgress {
  return { videoIndex: 0, answers: {}, submittedVideoIndexes: [], completedVideoIndexes: [] };
}

function readSavedProgress(): CultureProgress {
  if (typeof window === "undefined") return defaultProgress();

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CULTURE_PROGRESS_STORAGE_KEY) || "");
    return {
      videoIndex: Math.min(Math.max(Number(parsed.videoIndex) || 0, 0), cultureVideos.length - 1),
      answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
      submittedVideoIndexes: Array.isArray(parsed.submittedVideoIndexes) ? parsed.submittedVideoIndexes : [],
      completedVideoIndexes: Array.isArray(parsed.completedVideoIndexes) ? parsed.completedVideoIndexes : [],
    };
  } catch {
    return defaultProgress();
  }
}

function withUniqueIndex(indexes: number[], index: number) {
  return indexes.includes(index) ? indexes : [...indexes, index];
}

export function StepCulture({ registeredTeamIds, onNext, onBack }: StepCultureProps) {
  const [progress, setProgress] = useState<CultureProgress>(() => readSavedProgress());
  const [countdown, setCountdown] = useState(5);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  const videoIndex = Math.min(progress.videoIndex, cultureVideos.length - 1);
  const currentVideo = cultureVideos[videoIndex];
  const currentVideoId = currentVideo.index;
  const isLastVideo = videoIndex === cultureVideos.length - 1;
  const answer = progress.answers[currentVideoId] || "";
  const isSubmitted = progress.submittedVideoIndexes.includes(currentVideoId);
  const videoCompleted = progress.completedVideoIndexes.includes(currentVideoId);
  const progressPct = ((videoIndex + 1) / cultureVideos.length) * 100;

  const watchedVideos = useMemo(
    () => cultureVideos.filter((video) => progress.completedVideoIndexes.includes(video.index)),
    [progress.completedVideoIndexes],
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(CULTURE_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Keep the in-memory demo flow usable when storage is unavailable.
    }
  }, [progress]);

  useEffect(() => {
    if (videoCompleted) {
      setCountdown(0);
      return;
    }

    setCountdown(5);
    const interval = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setProgress((current) => ({
            ...current,
            completedVideoIndexes: withUniqueIndex(current.completedVideoIndexes, currentVideoId),
          }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [currentVideoId, videoCompleted]);

  useEffect(() => {
    if (videoCompleted && inputAreaRef.current) {
      window.setTimeout(() => inputAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    }
  }, [videoCompleted]);

  const updateAnswer = (value: string) => {
    setProgress((current) => ({ ...current, answers: { ...current.answers, [currentVideoId]: value } }));
  };

  const submitAnswer = () => {
    setProgress((current) => ({
      ...current,
      submittedVideoIndexes: withUniqueIndex(current.submittedVideoIndexes, currentVideoId),
    }));
  };

  const goToNextVideo = () => {
    if (isLastVideo) {
      setShowCompletionModal(true);
      return;
    }
    setProgress((current) => ({ ...current, videoIndex: videoIndex + 1 }));
  };

  return (
    <div className="flex h-full w-full max-w-3xl flex-col gap-2 py-2">
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-xs font-bold whitespace-nowrap" style={{ color: "rgb(139,115,85)" }}>
          Video {currentVideo.index}/{cultureVideos.length}
        </span>
        <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: "rgba(196,168,139,0.25)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, rgb(201,151,58), rgb(160,116,40))" }} />
        </div>
      </div>

      <button type="button" onClick={onBack} className="self-start shrink-0 rounded-full border px-4 py-2 text-xs font-bold" style={{ backgroundColor: "rgb(255,251,242)", borderColor: "rgb(224,204,176)", color: "rgb(90,58,24)" }}>
        <ChevronLeft className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
        Trở về Bản đồ Team
      </button>

      <div className="shrink-0">
        <p className="text-xs font-bold tracking-wide" style={{ color: "rgb(139,115,85)" }}>VĂN HÓA &amp; NGUYÊN TẮC</p>
        <h2 className="mt-1 text-xl font-extrabold leading-snug" style={{ color: "rgb(61,32,8)" }}>{currentVideo.title}</h2>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="relative mx-auto flex aspect-video w-full max-w-2xl max-h-full items-center justify-center overflow-hidden rounded-xl border" style={panelStyle}>
          <div className="flex flex-col items-center gap-1 px-5 text-center">
            <Video className="h-9 w-9" style={{ color: "rgb(138,96,32)" }} aria-hidden="true" />
            <p className="text-sm font-semibold" style={{ color: "rgb(138,96,32)" }}>
              {videoCompleted ? "Video đã phát xong" : `Đang phát video... (${countdown}s)`}
            </p>
            <p className="max-w-sm text-xs leading-relaxed" style={{ color: "rgb(120,95,70)" }}>
              {videoCompleted ? "Bạn có thể trả lời câu hỏi bên dưới." : "Xem hết video để mở câu hỏi."}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 h-1.5 w-full" style={{ backgroundColor: "rgba(196,168,139,0.25)" }}>
            <div className="h-full bg-gradient-to-r from-[rgb(212,164,62)] to-[rgb(138,96,32)] transition-all duration-1000 ease-linear" style={{ width: `${videoCompleted ? 100 : ((5 - countdown) / 5) * 100}%` }} />
          </div>
        </div>
      </div>

      {watchedVideos.length > 0 && !videoCompleted && (
        <div className="mx-auto w-full max-w-2xl shrink-0 rounded-xl border px-4 py-2" style={panelStyle}>
          <div className="mb-1.5 flex items-center gap-2 text-xs font-bold" style={{ color: "rgb(138,96,32)" }}>
            <History className="h-4 w-4" aria-hidden="true" />
            Lịch sử video đã lưu
          </div>
          <div className="flex flex-wrap gap-2">
            {watchedVideos.map((video) => (
              <span key={video.index} className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ backgroundColor: "rgb(250,222,196)", color: "rgb(90,58,24)" }}>
                {video.index}. {progress.submittedVideoIndexes.includes(video.index) ? "Đã trả lời" : "Đã xem"}
              </span>
            ))}
          </div>
        </div>
      )}

      {videoCompleted && (
        <div ref={inputAreaRef} className="mx-auto w-full max-w-2xl shrink-0 rounded-xl border p-2.5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={panelStyle}>
          <label htmlFor="culture-answer" className="text-xs font-bold" style={{ color: "rgb(61,32,8)" }}>
            {currentVideo.question}
          </label>
          {!isSubmitted ? (
            <>
              <textarea
                id="culture-answer"
                value={answer}
                onChange={(event) => updateAnswer(event.target.value)}
                placeholder="Chia sẻ ngắn gọn suy nghĩ của bạn..."
                rows={2}
                className="mt-1.5 w-full resize-none rounded-lg border bg-transparent px-3 py-1.5 text-xs outline-none transition-colors placeholder:text-[rgb(139,115,85)] focus:border-[rgb(212,164,62)]"
                style={{ borderColor: "rgb(224,204,176)", color: "rgb(61,32,8)" }}
              />
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <p className="text-[11px]" style={{ color: "rgb(139,115,85)" }}>Dữ liệu demo sẽ được lưu lại nếu bạn quay về sau.</p>
                <button type="button" disabled={!answer.trim()} onClick={submitAnswer} className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40" style={goldButtonStyle}>
                  Gửi
                </button>
              </div>
            </>
          ) : (
            <div className="mt-1.5 space-y-1.5">
              <p className="break-words rounded-lg px-3 py-1.5 text-xs" style={{ background: "linear-gradient(135deg, rgb(61,122,79), rgb(27,67,50))", color: "rgb(255,253,249)" }}>
                {answer}
              </p>
              <p className="rounded-lg px-3 py-1.5 text-xs leading-relaxed" style={{ backgroundColor: "rgb(250,240,224)", color: "rgb(120,95,70)" }}>
                {currentVideo.feedback}
              </p>
              <button type="button" onClick={goToNextVideo} className="w-full rounded-xl px-6 py-2 text-xs font-bold text-white shadow-lg transition-transform active:scale-95" style={goldButtonStyle}>
                {isLastVideo ? "Hoàn tất xem và quyết định" : "Video tiếp theo"}
              </button>
            </div>
          )}
        </div>
      )}

      {showCompletionModal && (
        <CultureCompletionModal
          pendingTeamCount={registeredTeamIds.length}
          onBackToTour={onBack}
          onEndTourAndDecide={onNext}
        />
      )}
    </div>
  );
}
