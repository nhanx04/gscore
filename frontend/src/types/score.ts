export type StudentScore = {
  registration_number: string;
  math: string | null;
  literature: string | null;
  foreign_language: string | null;
  physics: string | null;
  chemistry: string | null;
  biology: string | null;
  history: string | null;
  geography: string | null;
  civic_education: string | null;
  foreign_language_code: string | null;
};

export type ScoreLevelReport = {
  subject_key: string;
  subject_name: string;
  excellent: number;
  good: number;
  average: number;
  poor: number;
};

export type TopGroupAStudent = {
  registration_number: string;
  math: string;
  physics: string;
  chemistry: string;
  total_score: string;
};

export type TabKey = "search" | "statistics" | "topA";
