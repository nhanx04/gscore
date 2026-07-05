import { FiClock } from "react-icons/fi";
import type { TabKey } from "@/types/score";

const meta: Record<TabKey, { title: string; description: string }> = {
  search: {
    title: "Tra cứu điểm",
    description: "Nhập số báo danh để xem kết quả điểm thi THPT 2024.",
  },
  statistics: {
    title: "Thống kê mức điểm",
    description:
      "Biểu đồ số lượng học sinh theo từng mức điểm của mỗi môn học.",
  },
  topA: {
    title: "Top khối A",
    description:
      "Danh sách 10 học sinh có tổng điểm Toán, Vật lý, Hóa học cao nhất.",
  },
};

type Props = {
  activeTab: TabKey;
};

export default function Header({ activeTab }: Props) {
  const current = meta[activeTab];

  return (
    <header className="header">
      <div>
        <div className="header-kicker">
          <FiClock />
          <span>G-Scores Admin</span>
        </div>
        <h1 className="header-title">{current.title}</h1>
        <p className="header-subtitle">{current.description}</p>
      </div>
    </header>
  );
}
