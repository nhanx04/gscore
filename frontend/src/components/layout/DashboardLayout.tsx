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
    <div className="page-shell">
      <Sidebar activeTab={activeTab} onChangeTab={onChangeTab} />
      <main className="main">
        <Header activeTab={activeTab} />
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
