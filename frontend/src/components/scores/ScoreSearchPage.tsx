import { useState } from "react";
import { FiSearch, FiAlertCircle } from "react-icons/fi";
import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import ScoreResultTable from "./ScoreResultTable";
import { useScoreSearch } from "@/hooks/useScoreSearch";

export default function ScoreSearchPage() {
  const {
    value,
    setValue,
    result,
    loading,
    search,
    notFoundOpen,
    setNotFoundOpen,
  } = useScoreSearch();
  const [fieldError, setFieldError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    setValue(trimmed);
    if (!trimmed) return setFieldError("Vui lòng nhập số báo danh.");
    if (!/^[0-9]+$/.test(trimmed))
      return setFieldError("Số báo danh chỉ được chứa chữ số.");
    setFieldError("");
    await search(trimmed);
  };

  return (
    <section className="stack">
      <div className="card hero-card">
        <div className="hero-content">
          <div className="hero-icon">
            <FiSearch />
          </div>
          <div>
            <h2>Tra cứu điểm</h2>
            <p className="muted">
              Nhập số báo danh để xem kết quả điểm thi THPT 2024.
            </p>
          </div>
        </div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="input"
            inputMode="numeric"
            placeholder="Nhập số báo danh"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" isLoading={loading}>
            Tra cứu
          </Button>
        </form>
        {fieldError ? (
          <div className="inline-alert">
            <FiAlertCircle />
            <span>{fieldError}</span>
          </div>
        ) : null}
      </div>

      <div className="card">
        <div className="section-head">
          <h3>Kết quả tra cứu</h3>
          <span className="section-badge">Luôn hiển thị</span>
        </div>
        <ScoreResultTable score={result} />
      </div>

      <Dialog
        open={notFoundOpen}
        title="Không tìm thấy số báo danh"
        description="Số báo danh bạn nhập không tồn tại. Vui lòng kiểm tra lại."
        onClose={() => setNotFoundOpen(false)}
      />
    </section>
  );
}
