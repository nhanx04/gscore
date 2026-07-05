import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchScoreLevelReport } from '@/api/scoreApi';
import { getApiErrorMessage } from '@/api/axiosClient';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import type { ScoreLevelReport } from '@/types/score';

export default function ScoreLevelChart() {
  const [data, setData] = useState<ScoreLevelReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchScoreLevelReport()
      .then(setData)
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="card">
      <div className="section-title">
        <div>
          <h2>Thống kê mức điểm theo môn học</h2>
          <p className="muted">
            Excellent: &gt;= 8 | Good: &gt;= 6 và &lt; 8 | Average: &gt;= 4 và &lt; 6 | Poor: &lt; 4
          </p>
        </div>
      </div>
      {loading ? <LoadingSpinner /> : null}
      {error ? <ErrorMessage message={error} /> : null}
      {!loading && !error ? (
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject_name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="excellent" fill="#16a34a" radius={[6, 6, 0, 0]} />
              <Bar dataKey="good" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Bar dataKey="average" fill="#d97706" radius={[6, 6, 0, 0]} />
              <Bar dataKey="poor" fill="#dc2626" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </section>
  );
}

