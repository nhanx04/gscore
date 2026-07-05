import { useEffect, useState } from "react";
import { fetchTopGroupA } from "@/api/scoreApi";
import type { TopGroupAStudent } from "@/types/score";

export function useTopGroupA(enabled = true) {
  const [data, setData] = useState<TopGroupAStudent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) return;
    let mounted = true;

    fetchTopGroupA()
      .then((res) => mounted && setData(res))
      .catch(() => mounted && setError("Không thể tải danh sách top khối A."))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [enabled]);

  return { data, loading, error };
}
