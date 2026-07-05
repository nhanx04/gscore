import { useState } from 'react';
import { fetchStudentScore } from '@/api/scoreApi';
import { getApiErrorMessage } from '@/api/axiosClient';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import type { StudentScore } from '@/types/score';
import ScoreResultCard from './ScoreResultCard';

export default function ScoreSearch() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<StudentScore | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = registrationNumber.trim();
    if (!value) return setError('Vui lòng nhập số báo danh.');
    if (!/^[0-9]+$/.test(value)) return setError('Số báo danh chỉ được chứa chữ số.');

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await fetchStudentScore(value);
      setResult(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Tra cứu điểm theo số báo danh</h2>
      <form onSubmit={handleSubmit} className="form-row">
        <input
          className="input"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          placeholder="Nhập số báo danh"
          inputMode="numeric"
        />
        <button className="btn" disabled={loading} type="submit">
          {loading ? 'Đang tra cứu...' : 'Tra cứu'}
        </button>
      </form>
      <div style={{ marginTop: 16 }}>{loading ? <LoadingSpinner /> : null}</div>
      <div style={{ marginTop: 16 }}>{error ? <ErrorMessage message={error} /> : null}</div>
      <div style={{ marginTop: 16 }}>{result ? <ScoreResultCard score={result} /> : null}</div>
    </section>
  );
}

