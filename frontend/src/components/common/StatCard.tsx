type Props = {
  label: string;
  value: string | number;
  hint?: string;
};

export default function StatCard({ label, value, hint }: Props) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {hint ? <div className="muted">{hint}</div> : null}
    </div>
  );
}

