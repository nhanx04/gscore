import type { ReactNode } from "react";
import type { TabKey } from "@/types/score";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  activeTab: TabKey;
  children: ReactNode;
  onChangeTab: (tab: TabKey) => void;
};

export default function DashboardLayout({
  activeTab,
  children,
  onChangeTab,
}: Props) {
  return (
    <div className="app-shell page-shell">
      <Sidebar activeTab={activeTab} onChangeTab={onChangeTab} />
      <main className="app-main main">
        <Header activeTab={activeTab} />
        <div className="app-content content">{children}</div>
      </main>
    </div>
  );
}
