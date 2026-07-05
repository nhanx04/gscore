import { useEffect, useState } from 'react';
import { fetchScoreLevelReport } from '@/api/scoreApi';
import type { ScoreLevelReport } from '@/types/score';

export function useScoreLevelReport() {
  const [data, setData] = useState<ScoreLevelReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    fetchScoreLevelReport()
      .then((res) => mounted && setData(res))
      .catch(() => mounted && setError('Không thể tải dữ liệu thống kê.'))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}

