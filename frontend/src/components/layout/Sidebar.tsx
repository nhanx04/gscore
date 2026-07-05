import { FiAward, FiBarChart2, FiBookOpen, FiSearch } from "react-icons/fi";
import type { ReactNode } from "react";
import type { TabKey } from "@/types/score";

type Props = {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
};

const items: Array<{ key: TabKey; label: string; icon: ReactNode }> = [
  { key: "search", label: "Tra cứu điểm", icon: <FiSearch /> },
  { key: "statistics", label: "Thống kê", icon: <FiBarChart2 /> },
  { key: "topA", label: "Top khối A", icon: <FiAward /> },
];

export default function Sidebar({ activeTab, onChangeTab }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">
          <FiBookOpen />
        </div>
        <div>
          <h1>G-Scores</h1>
          <p>THPT 2024</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Điều hướng chính">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sidebar-nav-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => onChangeTab(item.key)}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
