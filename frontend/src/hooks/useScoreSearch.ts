import { useState } from 'react';
import { fetchStudentScore } from '@/api/scoreApi';
import type { StudentScore } from '@/types/score';

const emptyScore: StudentScore = {
  registration_number: '',
  math: null,
  literature: null,
  foreign_language: null,
  physics: null,
  chemistry: null,
  biology: null,
  history: null,
  geography: null,
  civic_education: null,
  foreign_language_code: null,
};

export function useScoreSearch() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<StudentScore>(emptyScore);
  const [loading, setLoading] = useState(false);
  const [notFoundOpen, setNotFoundOpen] = useState(false);

  const search = async (registrationNumber: string) => {
    setLoading(true);
    try {
      const data = await fetchStudentScore(registrationNumber);
      setResult(data);
      setNotFoundOpen(false);
      return { ok: true as const };
    } catch (error: any) {
      if (error?.response?.status === 404) {
        setNotFoundOpen(true);
        setResult(emptyScore);
        return { ok: false as const, notFound: true };
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { value, setValue, result, setResult, loading, search, notFoundOpen, setNotFoundOpen };
}

