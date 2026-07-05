import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ErrorState from '@/components/common/ErrorState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useScoreLevelReport } from '@/hooks/useScoreLevelReport';

export default function ScoreLevelChartPage() {
  const { data, loading, error } = useScoreLevelReport();

  return (
    <section className="stack">
      <div className="card">
        <h2>Thống kê mức điểm</h2>
        <p className="muted">Biểu đồ thống kê số lượng học sinh theo từng mức điểm của mỗi môn học.</p>
      </div>

      <div className="card">
        {loading ? <LoadingSpinner /> : error ? <ErrorState title="Không thể tải dữ liệu" description={error} /> : (
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject_name" interval={0} angle={-20} textAnchor="end" height={70} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="excellent" fill="#16a34a" name="Giỏi" />
                <Bar dataKey="good" fill="#2563eb" name="Khá" />
                <Bar dataKey="average" fill="#d97706" name="Trung bình" />
                <Bar dataKey="poor" fill="#dc2626" name="Yếu" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
}

