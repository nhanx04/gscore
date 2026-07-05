import { useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiSearch } from "react-icons/fi";
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
    <section className="page stack">
      {/* <div className="search-panel panel"> */}
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="hero-icon">
          <FiSearch />
        </div>
        <div className="input-shell">
          <input
            className="form-control input"
            inputMode="numeric"
            placeholder="Nhập số báo danh"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {fieldError ? (
            <div className="inline-alert">
              <FiAlertCircle />
              <span>{fieldError}</span>
            </div>
          ) : null}
        </div>
        <Button type="submit" isLoading={loading}>
          Tra cứu
        </Button>
      </form>
      {/* </div> */}

      <div className="panel">
        <div className="section-head">
          <div>
            <h3>Kết quả tra cứu</h3>
          </div>
          <span className="section-badge">
            <FiCheckCircle />
            Kết quả tham chiếu
          </span>
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
