import ErrorState from '@/components/common/ErrorState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTopGroupA } from '@/hooks/useTopGroupA';

export default function TopGroupAPage() {
  const { data, loading, error } = useTopGroupA();

  return (
    <section className="stack">
      <div className="card">
        <h2>Top khối A</h2>
        <p className="muted">Danh sách 10 học sinh có tổng điểm Toán, Vật lý, Hóa học cao nhất.</p>
      </div>

      <div className="card">
        {loading ? <LoadingSpinner /> : error ? <ErrorState title="Không thể tải dữ liệu" description={error} /> : (
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
                {data.map((item, index) => (
                  <tr key={item.registration_number} className={index < 3 ? 'top-rank' : ''}>
                    <td>{index + 1}</td>
                    <td>{item.registration_number}</td>
                    <td>{item.math}</td>
                    <td>{item.physics}</td>
                    <td>{item.chemistry}</td>
                    <td>{item.total_score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

