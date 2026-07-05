import type { StudentScore } from "@/types/score";

const fields: Array<[keyof StudentScore, string]> = [
  ["registration_number", "Số báo danh"],
  ["math", "Toán"],
  ["literature", "Ngữ văn"],
  ["foreign_language", "Ngoại ngữ"],
  ["physics", "Vật lý"],
  ["chemistry", "Hóa học"],
  ["biology", "Sinh học"],
  ["history", "Lịch sử"],
  ["geography", "Địa lý"],
  ["civic_education", "GDCD"],
  ["foreign_language_code", "Mã ngoại ngữ"],
];

export default function ScoreResultCard({ score }: { score: StudentScore }) {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: 20 }}>
        <h2>Kết quả tra cứu</h2>
        <p className="muted">
          Thông tin học sinh được trình bày theo cấu trúc dễ đọc.
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <tbody>
            {fields.map(([key, label]) => (
              <tr key={String(key)}>
                <th>{label}</th>
                <td>{score[key] ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
