interface InterviewConfirmationLetterProps {
  onConfirm: () => void;
  onDecline: () => void;
}

const goldButton = "inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95";
const goldButtonStyle = { background: "linear-gradient(135deg, rgb(212,164,62), rgb(138,96,32))" };

export function InterviewConfirmationLetter({ onConfirm, onDecline }: InterviewConfirmationLetterProps) {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center py-1">
      <div className="w-full max-w-xl rounded-3xl border p-4 shadow-2xl sm:p-6" style={{ backgroundColor: "rgb(255,251,242)", borderColor: "rgb(224,204,176)" }}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base" style={{ backgroundColor: "rgb(252,214,224)" }} aria-hidden="true">
            💗
          </span>
          <div>
            <h2 className="text-base font-extrabold leading-tight sm:text-lg" style={{ fontFamily: "'Playfair Display', serif", color: "rgb(61,32,8)" }}>
              Gửi bạn thân mến,
            </h2>
            <p className="text-[11px] font-semibold" style={{ color: "rgb(139,115,85)" }}>Một lá thư từ Minh Thư</p>
          </div>
        </div>

        <div className="mt-2.5 space-y-1.5 text-xs leading-snug sm:text-[13px]" style={{ color: "rgb(90,70,50)" }}>
          <p>
            Bạn vừa hoàn thành một hành trình không phải ai cũng đi đến cuối và <strong>Minh Thư</strong> muốn bạn biết rằng, điều đó thật sự có ý nghĩa.
          </p>
          <p>Bạn đã dành thời gian và cả sự dũng cảm để tìm hiểu từng team, để lắng nghe xem nơi nào thật sự gọi tên mình.</p>
          <p>Bây giờ, trước khi tiếp tục, chúng mình muốn nói thật với bạn một điều: NhiLe không phải nơi dành cho tất cả mọi người và điều đó hoàn toàn ổn.</p>
          <p>Nếu sau những buổi tham quan, bạn vẫn muốn tiếp tục, bước tiếp theo hãy đặt lịch cùng phỏng vấn với chúng mình để tham gia vào NhiLe Team.</p>
          <p>
            Nhưng nếu bạn cảm thấy chưa thật sự thấy mình ở đây, hãy trân trọng sự trung thực đó của bản thân.
            <br />
            Đây là quyết định của bạn và chúng mình tôn trọng bất kỳ lựa chọn nào bạn đưa ra.
          </p>
          <p>
            Trân trọng,
            <br />
            <span className="italic">Minh Thư &amp; NhiLe Team</span>
          </p>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={onConfirm} className={goldButton} style={goldButtonStyle}>
            Mình muốn phỏng vấn
          </button>
          <button type="button" onClick={onDecline} className="flex-1 rounded-xl border py-2.5 text-xs font-bold" style={{ borderColor: "rgb(90,64,42)", color: "rgb(90,58,24)" }}>
            Mình cần suy nghĩ thêm
          </button>
        </div>
      </div>
    </section>
  );
}
