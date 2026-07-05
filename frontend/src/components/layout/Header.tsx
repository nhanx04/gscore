import { FiClock, FiShield } from "react-icons/fi";
import type { TabKey } from "@/types/score";

const meta: Record<TabKey, { title: string }> = {
  search: {
    title: "Tra cứu điểm",
  },
  statistics: {
    title: "Thống kê mức điểm",
  },
  topA: {
    title: "Top khối A",
  },
};

type Props = {
  activeTab: TabKey;
};

export default function Header({ activeTab }: Props) {
  const current = meta[activeTab];

  return (
    <header className="app-header header">
      <div className="header-content">
        <div>
          {/* <div className="header-kicker">
            <FiShield />
            <span>G-Scores Admin</span>
          </div> */}
          <h1 className="header-title">{current.title}</h1>
          {/* <p className="header-subtitle">{current.description}</p> */}
        </div>
        <div className="header-actions">
          {/* <div className="status-badge">
            <FiClock />
            <span>Hệ thống trực tuyến</span>
          </div> */}
        </div>
      </div>
    </header>
  );
}
