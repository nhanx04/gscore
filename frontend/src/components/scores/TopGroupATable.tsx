import { useEffect, useState } from 'react';
import { fetchTopGroupA } from '@/api/scoreApi';
import { getApiErrorMessage } from '@/api/axiosClient';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import type { TopGroupAStudent } from '@/types/score';

export default function TopGroupATable() {
  const [data, setData] = useState<TopGroupAStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTopGroupA()
      .then(setData)
      .catch((err) => setError(getApiErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="card">
      <h2>Top 10 học sinh khối A</h2>
      {loading ? <LoadingSpinner /> : null}
      {error ? <ErrorMessage message={error} /> : null}
      {!loading && !error ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Hạng</th>
                <th>Số báo danh</th>
                <th>Toán</th>
                <th>Vật lý</th>
                <th>Hóa học</th>
                <th>Tổng điểm</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => (
                <tr key={student.registration_number}>
                  <td>{index + 1}</td>
                  <td>{student.registration_number}</td>
                  <td>{student.math}</td>
                  <td>{student.physics}</td>
                  <td>{student.chemistry}</td>
                  <td>{student.total_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

