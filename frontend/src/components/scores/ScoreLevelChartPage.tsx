import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ErrorState from "@/components/common/ErrorState";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useScoreLevelReport } from "@/hooks/useScoreLevelReport";
import { FiBarChart2, FiLayers } from "react-icons/fi";

export default function ScoreLevelChartPage() {
  const { data, loading, error } = useScoreLevelReport();

  return (
    <section className="stack">
      <div className="panel">
        <div className="section-head">
          <div>
            <h3>Biểu đồ mức điểm</h3>
            <p className="muted">
              So sánh phân bố điểm giữa các môn theo 4 nhóm chính.
            </p>
          </div>
          <span className="section-badge">
            <FiLayers />
            Thống kê tổng hợp
          </span>
        </div>

        <div className="chart-box">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorState title="Không thể tải dữ liệu" description={error} />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="subject_name"
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={70}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="excellent" fill="#16a34a" name="Giỏi" />
                <Bar dataKey="good" fill="#2563eb" name="Khá" />
                <Bar dataKey="average" fill="#d97706" name="Trung bình" />
                <Bar dataKey="poor" fill="#dc2626" name="Yếu" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
}
