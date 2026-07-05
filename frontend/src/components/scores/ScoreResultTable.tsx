import { FiMinus } from "react-icons/fi";
import EmptyValue from "@/components/common/EmptyValue";
import type { StudentScore } from "@/types/score";

type Props = {
  score: StudentScore;
};

const rows: Array<{ label: string; key: keyof StudentScore }> = [
  { label: "Số báo danh", key: "registration_number" },
  { label: "Toán", key: "math" },
  { label: "Ngữ văn", key: "literature" },
  { label: "Ngoại ngữ", key: "foreign_language" },
  { label: "Vật lý", key: "physics" },
  { label: "Hóa học", key: "chemistry" },
  { label: "Sinh học", key: "biology" },
  { label: "Lịch sử", key: "history" },
  { label: "Địa lý", key: "geography" },
  { label: "GDCD", key: "civic_education" },
  { label: "Mã ngoại ngữ", key: "foreign_language_code" },
];

export default function ScoreResultTable({ score }: Props) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Trường</th>
            <th>Giá trị</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>{row.label}</td>
              <td>
                <span className="table-value">
                  <FiMinus />
                  <EmptyValue value={String(score[row.key] ?? "")} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
