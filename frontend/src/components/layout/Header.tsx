import { FiShield } from "react-icons/fi";
import type { TabKey } from "@/types/score";

type Props = {
  activeTab: TabKey;
  isLoading?: boolean;
};

export default function Header({ activeTab, isLoading = false }: Props) {
  const title =
    activeTab === "search"
      ? "Tra cứu điểm"
      : activeTab === "statistics"
        ? "Thống kê mức điểm"
        : "Top khối A";

  return (
    <header className="app-header header">
      <div className="header-content">
        <div>
          <h1 className="header-title">{title}</h1>
        </div>
      </div>
    </header>
  );
}
