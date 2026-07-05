import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScoreLevelChartPage from "@/components/scores/ScoreLevelChartPage";
import ScoreSearchPage from "@/components/scores/ScoreSearchPage";
import TopGroupAPage from "@/components/scores/TopGroupAPage";
import { useScoreLevelReport } from "@/hooks/useScoreLevelReport";
import { useTopGroupA } from "@/hooks/useTopGroupA";
import { useScoreSearch } from "@/hooks/useScoreSearch";
import type { TabKey } from "@/types/score";

const routeToTab: Record<string, TabKey> = {
  "/search": "search",
  "/statistics": "statistics",
  "/top-a": "topA",
};

const tabToPath: Record<TabKey, string> = {
  search: "/search",
  statistics: "/statistics",
  topA: "/top-a",
};

function getTabFromPath(pathname: string): TabKey {
  return routeToTab[pathname] ?? "search";
}

function AppShell() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const activeTab = getTabFromPath(pathname);

  const search = useScoreSearch(activeTab === "search");
  const report = useScoreLevelReport(activeTab === "statistics");
  const topGroupA = useTopGroupA(activeTab === "topA");

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title =
      activeTab === "search"
        ? "G-Scores | Tra cứu điểm"
        : activeTab === "statistics"
          ? "G-Scores | Thống kê"
          : "G-Scores | Top khối A";
  }, [activeTab]);

  const handleChangeTab = (tab: TabKey) => {
    const nextPath = tabToPath[tab];
    if (nextPath === window.location.pathname) return;
    window.history.pushState({}, "", nextPath);
    setPathname(nextPath);
  };

  const isLoading =
    (activeTab === "statistics" && report.loading) ||
    (activeTab === "topA" && topGroupA.loading) ||
    (activeTab === "search" && search.loading);

  return (
    <DashboardLayout
      activeTab={activeTab}
      onChangeTab={handleChangeTab}
      isLoading={isLoading}
    >
      {activeTab === "search" ? <ScoreSearchPage /> : null}
      {activeTab === "statistics" ? <ScoreLevelChartPage /> : null}
      {activeTab === "topA" ? <TopGroupAPage /> : null}
    </DashboardLayout>
  );
}

export default function App() {
  return <AppShell />;
}
