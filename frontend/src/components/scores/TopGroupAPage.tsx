import ErrorState from "@/components/common/ErrorState";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useTopGroupA } from "@/hooks/useTopGroupA";
import { FiAward, FiTrendingUp } from "react-icons/fi";

export default function TopGroupAPage() {
  const { data, loading, error } = useTopGroupA();

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
          <span className="section-badge">
            <FiTrendingUp />
            Cập nhật xếp hạng
          </span>
        </div>

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
              {data.map((item, index) => (
                <tr
                  key={item.registration_number}
                  className={index < 3 ? "row-emphasize" : undefined}
                >
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
      </div>
    </section>
  );
}
