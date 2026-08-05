import { useState } from "react";
import { companion } from "./data/onboarding-fake-data";

interface StepWelcomeProps {
  onNext: () => void;
}

const goldButton = "inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95";
const goldButtonStyle = { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" };
const envelopeStyle = {
  backgroundImage: "url(/onboarding/red-letter.png)",
  backgroundPosition: "center 46.5%",
  backgroundSize: "169.74% 359.09%",
};

export function StepWelcome({ onNext }: StepWelcomeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openLetter = () => {
    window.scrollTo({ top: 0 });
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <div className="flex min-h-full w-full flex-col items-center justify-center gap-4 py-3 text-center sm:gap-5 sm:py-6">
        <p className="text-xs font-bold tracking-[0.2em]" style={{ color: "rgb(196,168,139)" }}>
          NHILE TEAM
        </p>
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: "rgb(61,32,8)" }}>
          Chào mừng bạn đến với{" "}
          <span className="italic" style={{ color: "rgb(180,130,30)" }}>NhiLe Team.</span>
        </h1>
        <div>
          <p className="text-sm" style={{ color: "rgb(196,168,139)" }}>
            Có một bức thư dành riêng cho bạn ✉️
          </p>
          <p className="mt-1 text-xs" style={{ color: "rgb(139,115,85)" }}>
            Nhấn vào phong thư để mở ra nhé.
          </p>
        </div>

        <button
          type="button"
          onClick={openLetter}
          aria-label="Mở thư chào mừng từ NhiLe Team"
          className="group aspect-[499/352] w-[min(86vw,34rem)] rounded-sm bg-no-repeat drop-shadow-2xl transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(138,96,32)]"
          style={envelopeStyle}
        />

        <button type="button" onClick={openLetter} className={goldButton} style={goldButtonStyle}>
          Mở thư →
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl flex flex-col items-center gap-3 sm:gap-4 animate-in fade-in zoom-in duration-300 my-auto">
      <div
        className="w-full rounded-lg pl-[48px] pr-[56px] pt-[40px] pb-[55px] sm:pl-[180px] sm:pr-[205px] sm:pt-[76px] sm:pb-[104px]"
        style={{ backgroundImage: "url(/onboarding/N-letter-background.png)", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}
      >
        <h2 className="text-base sm:text-lg mb-3 sm:mb-4 text-center" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, color: "rgb(61,32,8)" }}>
          Chào mừng bạn đến với NhiLe Team,
        </h2>

        <div
          className="onboarding-letter space-y-2 text-left text-xs leading-relaxed sm:text-sm"
          style={{ color: "rgb(90,58,24)", fontWeight: 500 }}
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
