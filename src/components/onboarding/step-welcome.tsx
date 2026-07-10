import { useState } from "react";
import { companion } from "./data/onboarding-fake-data";

interface StepWelcomeProps {
  onNext: () => void;
}

const goldButton = "inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95";
const goldButtonStyle = { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" };

export function StepWelcome({ onNext }: StepWelcomeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openLetter = () => {
    window.scrollTo({ top: 0 });
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="text-xs font-bold tracking-[0.2em]" style={{ color: "rgb(196,168,139)" }}>
          NHILE TEAM
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" }}>
          Chào mừng bạn đến với{" "}
          <span style={{ fontFamily: "'Dancing Script', cursive", color: "rgb(180,130,30)" }}>NhiLe Team.</span>
        </h1>
        <div>
          <p className="text-sm" style={{ color: "rgb(196,168,139)" }}>
            Có một bức thư dành riêng cho bạn ✉️
          </p>
          <p className="text-xs mt-1" style={{ color: "rgb(139,115,85)" }}>
            Nhấn vào để mở ra nhé.
          </p>
        </div>

        <button type="button" onClick={() => openLetter()} className="group">
          <img
            src="/onboarding/red-letter.png"
            alt="Phong thư NhiLe Team"
            className="w-44 sm:w-52 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        <button type="button" onClick={() => openLetter()} className={goldButton} style={goldButtonStyle}>
          Mở thư →
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-3 sm:gap-4 animate-in fade-in zoom-in duration-300 my-auto">
      <div
        className="w-full rounded-lg pl-[55px] pr-[65px] pt-[45px] pb-[65px] sm:pl-[210px] sm:pr-[240px] sm:pt-[85px] sm:pb-[120px]"
        style={{ backgroundImage: "url(/onboarding/N-letter-background.png)", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}
      >
        <h2 className="text-base sm:text-lg mb-3 sm:mb-4 text-center" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, color: "rgb(61,32,8)" }}>
          Chào mừng bạn đến với NhiLe Team,
        </h2>

        <div
          className="space-y-2 sm:space-y-3 text-left text-xs sm:text-[13px] leading-normal sm:leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700, color: "rgb(90,58,24)" }}
        >
          <p>Cảm ơn bạn đã dành thời gian ghé thăm và tìm hiểu về NhiLe Team.</p>
          <p>
            Chúng mình tin rằng không phải ngẫu nhiên mà bạn có mặt ở đây. Đây là bước đầu tiên của một hành
            trình mà bạn đang dành cho chính mình.
          </p>
          <p>
            Tại NhiLe Team, chúng mình không chỉ làm việc cùng nhau, chúng mình cùng nhau trưởng thành, cùng nhau
            tạo ra những điều có ý nghĩa, và cùng nhau viết nên một câu chuyện mà mỗi thành viên đều là một phần
            không thể thiếu.
          </p>
          <p>
            Người sẽ đồng hành cùng bạn trong hành trình khám phá này là{" "}
            <span>{companion.name}</span> — bạn ấy luôn ở đây nếu bạn có bất kỳ câu hỏi nào.
          </p>
          <p>Hãy tiếp tục khám phá, và hãy cứ là chính mình nhé!</p>
          <p className="pt-2">
            Yêu thương,
            <br />
            HR NhiLe Team.
          </p>
        </div>
      </div>

      <button type="button" onClick={onNext} className={goldButton} style={goldButtonStyle}>
        Khám phá bản thân
      </button>
    </div>
  );
}
