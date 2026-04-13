export const personalInfo = {
  name: "Nguyễn Bá Hoài Nam",
  role: "Fullstack Developer | AI Integration",
  bio: "Tôi xây dựng các ứng dụng web hiệu suất cao và tích hợp AI giúp tối ưu trải nghiệm người dùng. Tập trung vào giá trị thực tế, tốc độ và khả năng mở rộng.",
  email: "nguyennam25101999@gmail.com",
  phone: "0355114961",
  zalo: "0869371612",
  github: "https://github.com/nam25101999",
  linkedin: "https://www.linkedin.com/in/nam-nguy%E1%BB%85n-194529366/",
  website: "https://portfolio-by-me-pi.vercel.app/",
  cvUrl: "/cv.pdf",
};

export const stats = [
  { label: "Năm Kinh Nghiệm", value: 1, suffix: "+" },
  { label: "Dự Án Hoàn Thành", value: 10, suffix: "+" },
  { label: "Intern @ EAGODI", value: 100, suffix: "%" },
  { label: "AI Integration", value: 10, suffix: "+" },
];

export const skillsGroups = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "PHP", level: 75 },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "ReactJS", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Spring Boot", level: 80 },
      { name: "Express.js", level: 85 },
      { name: "RESTful API", level: 90 },
    ],
  },
  {
    category: "Mobile",
    skills: [
      { name: "Flutter", level: 80 },
      { name: "Dart", level: 75 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 80 },
    ],
  },
  {
    category: "Tools / AI",
    skills: [
      { name: "Gemini API", level: 90 },
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
    ],
  },
];

export const experience = [
  {
    company: "CÔNG TY CỔ PHẦN EAGODI",
    role: "Fullstack Developer (Intern)",
    period: "05/2025 - 08/2025",
    description: "Tối ưu hóa hiệu suất ứng dụng web giáo dục bằng cách tái cấu trúc logic Frontend với React.js/TypeScript, giảm 20% thời gian phản hồi giao diện. Triển khai hệ thống xác thực bảo mật JWT và RESTful API với Spring Boot, phục vụ đồng thời cho các ứng dụng trắc nghiệm và quản lý. Phối hợp thiết kế Database Schema (MongoDB/MySQL) linh hoạt, hỗ trợ mở rộng tính năng trắc nghiệm động.",
  },
  {
    company: "Gia sư tự do",
    role: "Gia sư (Toán)",
    period: "2022 - Nay",
    description: "Giảng dạy và hỗ trợ học tập cho học sinh khối 6-9. Phát triển kỹ năng truyền đạt kiến thức phức tạp một cách đơn giản, rèn luyện tính kiên nhẫn và khả năng quản lý thời gian.",
  },
];

export const education = [
  {
    school: "Đại học Đông Á",
    degree: "Chuyên ngành Kỹ thuật Phần mềm (Level 3/4)",
    period: "2022 - Nay",
    description: "Tập trung nghiên cứu Kiến trúc Phần mềm và Trí tuệ Nhân tạo. GPA chuyên ngành duy trì mức Giỏi, tích cực tham gia các dự án Open Source và Workshop AI.",
  },
];

export const projects = [
  {
    slug: "edu-project",
    github: "https://github.com/nam25101999/edu-project",
    demo: "https://edu-project-demo.vercel.app",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL"],
    tag: "Fullstack System",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
    results: ["Tái cấu trúc hệ thống giúp giảm 30% thời gian tải trang", "Số hóa 1000+ câu hỏi trắc nghiệm tự động", "Tích hợp AI hỗ trợ chấm điểm và phân tích kết quả"]
  },
  {
    slug: "portfolio-by-me",
    github: "https://github.com/nam25101999/portfolio-by-me",
    demo: "https://hoainam.dev",
    tech: ["Next.js", "Tailwind CSS", "Three.js", "Framer Motion"],
    tag: "Senior UI/UX",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    results: ["Tối ưu hóa hiệu ứng 3D mượt mà trên mọi thiết bị", "Tích hợp Command Palette (Ctrl+K) tăng trải nghiệm điều hướng", "Đạt 95+ điểm Performance trên Google Lighthouse"]
  }
];

export const achievements = [
  {
    id: "algo_master",
    name: "Algorithm Elite",
    strength: 92,
    tier: "Gold",
    icon: "Cpu"
  },
  {
    id: "ai_architect",
    name: "Neural Architect",
    strength: 88,
    tier: "Cyan",
    icon: "Brain"
  },
  {
    id: "fullstack_pioneer",
    name: "Next.js Pioneer",
    strength: 95,
    tier: "Silver",
    icon: "Layers"
  },
  {
    id: "open_work",
    name: "Open to Work",
    strength: 100,
    tier: "Red",
    icon: "Briefcase"
  }
];
