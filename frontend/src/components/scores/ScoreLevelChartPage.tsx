import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ErrorState from "@/components/common/ErrorState";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { FiLayers } from "react-icons/fi";
import { useScoreLevelReport } from "@/hooks/useScoreLevelReport";
import type { ScoreLevelReport } from "@/types/score";

type ChartRow = {
  subjectName: string;
  excellent: number;
  good: number;
  average: number;
  poor: number;
};

type ScoreLevel = {
  key: string;
  count?: number | string | null;
};

const SCORE_LEVELS = [
  {
    key: "excellent",
    name: "Giỏi",
    color: "#16A34A",
  },
  {
    key: "good",
    name: "Khá",
    color: "#2563EB",
  },
  {
    key: "average",
    name: "Trung bình",
    color: "#D97706",
  },
  {
    key: "poor",
    name: "Yếu",
    color: "#DC2626",
  },
] as const;

const chartData = (data: ScoreLevelReport[] = []): ChartRow[] =>
  data.map((item) => {
    const rawItem = item as ScoreLevelReport & {
      levels?: ScoreLevel[];
      subject?: string;
      excellent?: number | string | null;
      good?: number | string | null;
      average?: number | string | null;
      poor?: number | string | null;
    };

    const levels: ScoreLevel[] = Array.isArray(rawItem.levels)
      ? rawItem.levels
      : [];

    const normalized = levels.reduce<Record<string, number>>((acc, level) => {
      acc[level.key] = Number(level.count ?? 0);
      return acc;
    }, {});

    return {
      subjectName:
        item.subject_name || item.subject_key || rawItem.subject || "",
      excellent: normalized.excellent ?? Number(rawItem.excellent ?? 0),
      good: normalized.good ?? Number(rawItem.good ?? 0),
      average: normalized.average ?? Number(rawItem.average ?? 0),
      poor: normalized.poor ?? Number(rawItem.poor ?? 0),
    };
  });

const pieDataBySubject = (item: ChartRow) => {
  const total = item.excellent + item.good + item.average + item.poor;

  return SCORE_LEVELS.map((level) => {
    const value = item[level.key];
    const percent = total > 0 ? (value / total) * 100 : 0;

    return {
      name: level.name,
      value,
      percent,
      color: level.color,
    };
  }).filter((level) => level.value > 0);
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">{label}</div>
      {payload.map((item: any) => (
        <div key={item.name} className="chart-tooltip-row">
          <span
            className="chart-tooltip-dot"
            style={{ background: item.color }}
          />
          <span>{item.name}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

function CustomPieTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const data = item.payload;

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">{data.name}</div>

      <div className="chart-tooltip-row">
        <span
          className="chart-tooltip-dot"
          style={{ background: data.color }}
        />
        <span>Số lượng</span>
        <strong>{data.value}</strong>
      </div>

      <div className="chart-tooltip-row">
        <span>Tỷ lệ</span>
        <strong>{data.percent.toFixed(1)}%</strong>
      </div>
    </div>
  );
}

export default function ScoreLevelChartPage() {
  const { data = [], loading, error } = useScoreLevelReport();
  const items = chartData(data);
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
        </div>

        {error ? (
          <ErrorState title="Không thể tải dữ liệu" description={error} />
        ) : loading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div className="empty-state">Không có dữ liệu thống kê.</div>
        ) : (
          <div className="stack">
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={items}
                  margin={{ top: 24, right: 24, left: 8, bottom: 24 }}
                  barGap={4}
                  barCategoryGap="18%"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                  />

                  <XAxis
                    dataKey="subjectName"
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    axisLine={{ stroke: "#CBD5E1" }}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip content={<CustomTooltip />} />
                  <Legend />

                  <Bar
                    name="Giỏi"
                    dataKey="excellent"
                    fill="#16A34A"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                    isAnimationActive
                    animationDuration={900}
                    animationEasing="ease-out"
                  />

                  <Bar
                    name="Khá"
                    dataKey="good"
                    fill="#2563EB"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                    isAnimationActive
                    animationDuration={900}
                    animationEasing="ease-out"
                  />

                  <Bar
                    name="Trung bình"
                    dataKey="average"
                    fill="#D97706"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                    isAnimationActive
                    animationDuration={900}
                    animationEasing="ease-out"
                  />

                  <Bar
                    name="Yếu"
                    dataKey="poor"
                    fill="#DC2626"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                    isAnimationActive
                    animationDuration={900}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pie-chart-section">
              <div className="section-head">
                <div>
                  <h3>Tỷ lệ mức điểm theo từng môn</h3>
                  <p className="muted">
                    Mỗi biểu đồ tròn thể hiện tỷ lệ Giỏi, Khá, Trung bình và Yếu
                    của một môn.
                  </p>
                </div>
              </div>

              <div className="pie-chart-grid">
                {items.map((item) => {
                  const pieData = pieDataBySubject(item);

                  return (
                    <div key={item.subjectName} className="pie-chart-card">
                      <h4>{item.subjectName || "Không rõ môn"}</h4>

                      {pieData.length === 0 ? (
                        <div className="empty-state small">
                          Không có dữ liệu cho môn này.
                        </div>
                      ) : (
                        <div className="pie-chart-box">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={42}
                                outerRadius={76}
                                paddingAngle={3}
                                label={({ percent }) =>
                                  `${((percent ?? 0) * 100).toFixed(0)}%`
                                }
                                isAnimationActive
                                animationDuration={900}
                                animationEasing="ease-out"
                              >
                                {pieData.map((entry) => (
                                  <Cell key={entry.name} fill={entry.color} />
                                ))}
                              </Pie>

                              <Tooltip content={<CustomPieTooltip />} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
