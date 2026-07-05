import { useEffect, useState } from "react";
import { fetchScoreLevelReport } from "@/api/scoreApi";
import type { ScoreLevelReport } from "@/types/score";

export function useScoreLevelReport(enabled = true) {
  const [data, setData] = useState<ScoreLevelReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) return;
    let mounted = true;

    async function loadReport() {
      try {
        setLoading(true);
        setError("");
        const response = await fetchScoreLevelReport();
        if (!mounted) return;
        setData(response);
      } catch {
        if (!mounted) return;
        setError("Không thể tải dữ liệu thống kê.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadReport();

    return () => {
      mounted = false;
    };
  }, [enabled]);

  return { data, loading, error };
}
