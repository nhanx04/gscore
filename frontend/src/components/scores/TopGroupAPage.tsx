import ErrorState from "@/components/common/ErrorState";
import { useTopGroupA } from "@/hooks/useTopGroupA";

export default function TopGroupAPage() {
  const { data = [], loading, error } = useTopGroupA();

  const items = data
    .map((item) => {
      const math = Number(item.math ?? 0);
      const physics = Number(item.physics ?? 0);
      const chemistry = Number(item.chemistry ?? 0);

      return {
        ...item,
        total_score: math + physics + chemistry,
      };
    })
    .sort((a, b) => b.total_score - a.total_score);

  const isWaitingData = loading || items.length === 0;

  return (
    <section className="stack">
      <div className="panel">
        <div className="section-head">
          <div>
            <h3>Bảng xếp hạng khối A</h3>
            <p className="muted">
              Top 10 học sinh theo tổng điểm ba môn nền tảng.
            </p>
          </div>
        </div>

        {error ? (
          <ErrorState title="Không thể tải dữ liệu" description={error} />
        ) : isWaitingData ? (
          <div className="empty-state-1">Đang tải dữ liệu...</div>
        ) : (
          <div className="table-wrap">
            <table className="data-table top-table">
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
                {items.map((item, index) => (
                  <tr
                    key={item.registration_number}
                    className={index < 3 ? "row-emphasize" : undefined}
                  >
                    <td>{index + 1}</td>
                    <td>{item.registration_number}</td>
                    <td>{item.math}</td>
                    <td>{item.physics}</td>
                    <td>{item.chemistry}</td>
                    <td>{item.total_score.toFixed(2)}</td>
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
