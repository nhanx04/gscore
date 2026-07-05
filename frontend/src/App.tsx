import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScoreLevelChartPage from "@/components/scores/ScoreLevelChartPage";
import ScoreSearchPage from "@/components/scores/ScoreSearchPage";
import TopGroupAPage from "@/components/scores/TopGroupAPage";
import type { TabKey } from "@/types/score";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("search");

  return (
    <DashboardLayout activeTab={activeTab} onChangeTab={setActiveTab}>
      {activeTab === "search" ? <ScoreSearchPage /> : null}
      {activeTab === "statistics" ? <ScoreLevelChartPage /> : null}
      {activeTab === "topA" ? <TopGroupAPage /> : null}
    </DashboardLayout>
  );
}
