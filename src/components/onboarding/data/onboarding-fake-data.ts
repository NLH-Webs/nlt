// Fake/mock data for the /onboarding prototype flow. No backend calls — UI-only.
// Team map hotspot positions and N-Edu bio are copied verbatim from the reference site;
// other team bios and quiz/culture question wording are written in the same tone as prototype placeholders.

export interface OnboardingTeam {
  id: string;
  name: string;
  icon: string;
  image: string;
  about: string;
  dateSlots: string[];
  /** Position of the room label on top of the team-map illustration, in % of the map container. */
  mapPosition: { top: string; left: string };
}

export const onboardingTeams: OnboardingTeam[] = [
  {
    id: "n-edu",
    name: "N-Edu",
    icon: "🎓",
    image: "/onboarding/team/N-edu.png",
    about:
      "Nedu là đội ngũ đứng sau các khóa học của Neducation — nơi NhiLe Holding dạy kỹ năng cho cộng đồng bên ngoài. Tất cả cùng một mục tiêu: đảm bảo học viên tiếp cận được kiến thức khoa học chính thống từ chị Nhi — để phát triển bản thân và cảm nhận được sự gắn kết từ cộng đồng. Nedu là môi trường dành cho những ai muốn toàn tâm toàn ý lan toả kiến thức đến mọi người.",
    dateSlots: ["Thứ Hai 15/7 lúc 14:00", "Thứ Tư 17/7 lúc 18:00"],
    mapPosition: { top: "14%", left: "13%" },
  },
  {
    id: "it",
    name: "IT Team",
    icon: "💻",
    image: "/onboarding/team/IT.png",
    about:
      "IT Team xây dựng và vận hành toàn bộ sản phẩm công nghệ nội bộ của NhiLe Holding — từ web, app cho tới hệ thống dữ liệu. Đây là nơi dành cho những ai thích giải quyết vấn đề bằng code và muốn sản phẩm mình làm ra phục vụ trực tiếp cho cả cộng đồng.",
    dateSlots: ["Thứ Ba 16/7 lúc 10:00", "Thứ Năm 18/7 lúc 16:00"],
    mapPosition: { top: "11%", left: "42%" },
  },
  {
    id: "editor",
    name: "Editor",
    icon: "🎬",
    image: "/onboarding/team/Edit.png",
    about:
      "Editor chịu trách nhiệm kể câu chuyện của NhiLe Team qua hình ảnh, video và nội dung truyền thông. Phù hợp với người có con mắt thẩm mỹ, thích dựng phim, chụp ảnh và biến những khoảnh khắc đời thường thành nội dung chạm được tới người xem.",
    dateSlots: ["Thứ Hai 15/7 lúc 16:00", "Thứ Sáu 19/7 lúc 14:00"],
    mapPosition: { top: "14%", left: "83%" },
  },
  {
    id: "academy",
    name: "Academy",
    icon: "📚",
    image: "/onboarding/team/Academy.png",
    about:
      "Academy phụ trách đào tạo nội bộ — giúp mỗi thành viên NhiLe Team phát triển năng lực chuyên môn và kỹ năng mềm theo lộ trình rõ ràng. Hợp với người thích giảng dạy, xây chương trình học và đồng hành cùng sự trưởng thành của người khác.",
    dateSlots: ["Thứ Ba 16/7 lúc 14:00", "Thứ Bảy 20/7 lúc 10:00"],
    mapPosition: { top: "56%", left: "20%" },
  },
  {
    id: "hr",
    name: "HR",
    icon: "🤝",
    image: "/onboarding/team/HR.png",
    about:
      "HR chăm lo con người và văn hóa của cả NhiLe Team — từ tuyển dụng, onboarding cho tới giữ lửa gắn kết nội bộ. Phù hợp với người tinh tế trong giao tiếp, thích lắng nghe và muốn mỗi thành viên đều cảm thấy được thuộc về.",
    dateSlots: ["Thứ Tư 17/7 lúc 10:00", "Thứ Sáu 19/7 lúc 18:00"],
    mapPosition: { top: "49%", left: "49%" },
  },
  {
    id: "admin",
    name: "Admin",
    icon: "🗂️",
    image: "/onboarding/team/Admin.png",
    about:
      "Admin vận hành hậu cần, hành chính và các đầu việc nền tảng giữ cho cả bộ máy NhiLe Team chạy trơn tru mỗi ngày. Hợp với người tỉ mỉ, có tổ chức, thích sắp xếp mọi thứ vào đúng chỗ của nó.",
    dateSlots: ["Thứ Hai 15/7 lúc 10:00", "Thứ Năm 18/7 lúc 14:00"],
    mapPosition: { top: "44%", left: "90%" },
  },
  {
    id: "design",
    name: "Design",
    icon: "🎨",
    image: "/onboarding/team/Design.png",
    about:
      "Mọi thứ đẹp ở NLT đều có dấu tay của Design. Team truyền đạt kiến thức và tinh thần, thông điệp của NLT qua hình ảnh như ảnh bìa video, hình đăng mạng xã hội, poster cho các hoạt động, sự kiện... – để mọi lứa tuổi đều tiếp cận được kiến thức và giá trị tích cực của NhiLe.",
    dateSlots: ["Thứ Tư 17/7 lúc 16:00", "Thứ Bảy 20/7 lúc 10:00"],
    mapPosition: { top: "70%", left: "36%" },
  },
  {
    id: "social-event",
    name: "Social Event",
    icon: "🎉",
    image: "/onboarding/team/Social-Event.png",
    about:
      "Social Event tổ chức các sự kiện và hoạt động cộng đồng gắn kết cả NhiLe Team. Hợp với người năng lượng cao, thích tổ chức, MC và tạo ra những khoảnh khắc đáng nhớ cho tập thể.",
    dateSlots: ["Thứ Tư 17/7 lúc 16:00", "Thứ Sáu 19/7 lúc 10:00"],
    mapPosition: { top: "69%", left: "67%" },
  },
];

/** Team display label with a guaranteed trailing "Team" (avoids doubling it for names like "IT Team"). */
export function teamFullLabel(team: OnboardingTeam): string {
  return team.name.endsWith("Team") ? team.name : `${team.name} Team`;
}

export interface QuizOption {
  id: string;
  label: string;
  teamIds?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

// TODO: real content — placeholder self-discovery quiz (3-5 min); reference site's exact question bank wasn't reachable during extraction.
export const discoveryQuizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Bạn thích làm việc theo cách nào nhất?",
    options: [
      { id: "a", label: "Lên kế hoạch chi tiết trước khi bắt tay vào làm", teamIds: ["admin", "academy"] },
      { id: "b", label: "Bắt tay vào làm rồi điều chỉnh dần", teamIds: ["it", "editor"] },
      { id: "c", label: "Trao đổi với mọi người để tìm hướng đi chung", teamIds: ["hr", "social-event"] },
      { id: "d", label: "Tự mình thử nghiệm và khám phá", teamIds: ["design", "n-edu"] },
    ],
  },
  {
    id: "q2",
    question: "Điều gì khiến bạn có động lực nhất khi làm việc nhóm?",
    options: [
      { id: "a", label: "Nhìn thấy kết quả cụ thể, đo lường được", teamIds: ["it", "admin"] },
      { id: "b", label: "Được sáng tạo và thử điều mới", teamIds: ["design", "editor"] },
      { id: "c", label: "Cảm giác kết nối, gắn bó với đồng đội", teamIds: ["hr", "social-event"] },
      { id: "d", label: "Giúp đỡ và hỗ trợ người khác phát triển", teamIds: ["n-edu", "academy"] },
    ],
  },
  {
    id: "q3",
    question: "Khi gặp một vấn đề khó, bạn thường làm gì đầu tiên?",
    options: [
      { id: "a", label: "Phân tích dữ liệu, tìm quy luật", teamIds: ["it", "academy"] },
      { id: "b", label: "Hỏi ý kiến người có kinh nghiệm", teamIds: ["hr", "n-edu"] },
      { id: "c", label: "Thử nhiều cách khác nhau cho đến khi ra kết quả", teamIds: ["editor", "social-event"] },
      { id: "d", label: "Vẽ sơ đồ, hình dung tổng thể vấn đề", teamIds: ["design", "admin"] },
    ],
  },
];

export interface CultureVideo {
  index: number;
  title: string;
  question: string;
  feedback: string;
}

// TODO: real content — video playback isn't live on the reference site either ("Video đang được cập nhật");
// titles/questions below follow the same "văn hóa & nguyên tắc" framing seen on the live placeholder.
export const cultureVideos: CultureVideo[] = [
  {
    index: 1,
    title: "Tên & avatar rõ ràng — Tôn trọng mọi người",
    question: "Ảnh đại diện và tên hiển thị hiện tại của bạn là gì? Bạn nghĩ nó phản ánh bạn chính xác chưa?",
    feedback: "Câu hỏi nhỏ nhưng ý nghĩa lớn. Ở NhiLe, sự hiện diện rõ ràng là nền tảng của tin tưởng – và bạn vừa bắt đầu đúng chỗ rồi đó."
  },
  {
    index: 2,
    title: "Chủ động lên tiếng khi cần hỗ trợ",
    question: "Lần gần nhất bạn chủ động nhờ ai đó giúp đỡ trong công việc là khi nào?",
    feedback: "Chủ động nhờ giúp đỡ không phải là yếu đuối, mà là sự dũng cảm để làm mọi việc tốt hơn cùng nhau. Cảm ơn chia sẻ của bạn."
  },
  {
    index: 3,
    title: "Deadline là lời hứa với đồng đội",
    question: "Nếu bạn lỡ trễ deadline, theo bạn nên làm gì trước tiên?",
    feedback: "Đúng vậy, sự minh bạch và tôn trọng thời gian của đồng nghiệp chính là nguyên tắc vàng để duy trì sự gắn kết trong nhóm."
  },
  {
    index: 4,
    title: "Phản hồi thẳng thắn, tôn trọng",
    question: "Bạn cảm thấy thế nào khi nhận được góp ý thẳng thắn từ đồng đội?",
    feedback: "Nhận phản hồi với tinh thần học hỏi giúp chúng ta tiến xa hơn. Sự thẳng thắn đi kèm sự tôn trọng luôn được khuyến khích tại NhiLe."
  },
  {
    index: 5,
    title: "Ghi nhận đóng góp của nhau",
    question: "Bạn thường ghi nhận nỗ lực của người khác bằng cách nào?",
    feedback: "Ghi nhận và trân trọng đồng đội giúp xây dựng môi trường làm việc hạnh phúc. Cảm ơn góc nhìn rất nhân văn của bạn."
  },
  {
    index: 6,
    title: "Họp hiệu quả, đúng giờ",
    question: "Điều gì khiến một cuộc họp trở nên lãng phí thời gian với bạn?",
    feedback: "Họp đúng giờ và tập trung vào giải pháp là cách chúng ta tôn trọng thời gian của nhau. NhiLe luôn hướng tới sự hiệu quả."
  },
  {
    index: 7,
    title: "Chia sẻ kiến thức trong team",
    question: "Bạn có kỹ năng gì sẵn sàng chia sẻ lại cho đồng đội?",
    feedback: "Chia sẻ kiến thức giúp cả team cùng đi lên. Chúng mình rất mong chờ được học hỏi thêm từ những kỹ năng độc đáo của bạn!"
  },
  {
    index: 8,
    title: "Giữ cam kết với chính mình",
    question: "Bạn giữ mình có kỷ luật với các cam kết cá nhân bằng cách nào?",
    feedback: "Kỷ luật tự giác là chìa khóa của tự do và hiệu suất cao. Giữ cam kết với chính mình giúp bạn xây dựng uy tín cá nhân vững chắc."
  },
  {
    index: 9,
    title: "Không gian an toàn để mắc lỗi",
    question: "Bạn cần điều gì để cảm thấy an toàn khi thử điều mới và có thể sai?",
    feedback: "Một môi trường an toàn sẽ chấp nhận những sai sót trong quá trình thử nghiệm. Chỉ cần chúng ta học hỏi từ lỗi sai đó."
  },
  {
    index: 10,
    title: "Cùng nhau viết tiếp câu chuyện NhiLe Team",
    question: "Điều gì khiến bạn muốn gắn bó lâu dài với một tập thể?",
    feedback: "Gắn bó lâu dài bắt nguồn từ sự chia sẻ giá trị chung và cơ hội cùng nhau phát triển. Rất mong bạn sẽ là một phần của câu chuyện ấy."
  }
];

export interface InterviewDateSlot {
  id: string;
  label: string;
}

export const interviewDateSlots: InterviewDateSlot[] = [
  { id: "mon-15-7", label: "Thứ Hai 15/7" },
  { id: "tue-16-7", label: "Thứ Ba 16/7" },
  { id: "wed-17-7", label: "Thứ Tư 17/7" },
  { id: "thu-18-7", label: "Thứ Năm 18/7" },
  { id: "fri-19-7", label: "Thứ Sáu 19/7" },
  { id: "sat-20-7", label: "Thứ Bảy 20/7" },
];

export const interviewTimeSlots: string[] = ["10:00 AM", "14:00 PM", "16:00 PM", "18:00 PM"];

export const companion = {
  name: "Minh Thư",
  avatar: "👩",
  role: "Người đồng hành của bạn",
};

export const onboardingSteps = [
  { id: 1, label: "Chào mừng" },
  { id: 2, label: "Khám phá team" },
  { id: 3, label: "Quyết định của bạn" },
  { id: 4, label: "Hiểu về văn hóa NhiLe Team" },
  { id: 5, label: "Chốt team ứng tuyển" },
  { id: 6, label: "Đặt lịch phỏng vấn" },
] as const;
