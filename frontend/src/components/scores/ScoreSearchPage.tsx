import { useState } from "react";
import { FiAlertCircle, FiSearch } from "react-icons/fi";
import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import ScoreResultTable from "./ScoreResultTable";
import { useScoreSearch } from "@/hooks/useScoreSearch";

const REGISTRATION_NUMBER_REGEX = /^\d{8}$/;

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

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    const trimmed = value.trim();

    setValue(trimmed);

    if (!trimmed) {
      setFieldError("Vui lòng nhập số báo danh.");
      return;
    }

    if (!REGISTRATION_NUMBER_REGEX.test(trimmed)) {
      setFieldError("Số báo danh phải gồm đúng 8 chữ số.");
      return;
    }

    setFieldError("");
    await search(trimmed);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value.replace(/\D/g, "").slice(0, 8);

    setValue(nextValue);

    if (fieldError) {
      setFieldError("");
    }
  };

  return (
    <section className="page stack">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="hero-icon">
          <FiSearch />
        </div>

        <div className="input-shell">
          <input
            className={`form-control input ${fieldError ? "input-error" : ""}`}
            inputMode="numeric"
            placeholder="Nhập số báo danh (Bao gồm 8 chữ số)"
            value={value}
            onChange={handleChange}
            maxLength={8}
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

      <div className="panel">
        <div className="section-head">
          <div>
            <h3>Kết quả tra cứu</h3>
          </div>
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
