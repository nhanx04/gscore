import { axiosClient } from "./axiosClient";
import type {
  ScoreLevelReport,
  StudentScore,
  TopGroupAStudent,
} from "@/types/score";

export async function fetchStudentScore(
  registrationNumber: string,
): Promise<StudentScore> {
  const { data } = await axiosClient.get<StudentScore>("/scores/check/", {
    params: { registration_number: registrationNumber },
  });
  return data;
}

type ScoreLevelReportResponse = {
  results: ScoreLevelReport[];
};

export async function fetchScoreLevelReport(): Promise<ScoreLevelReport[]> {
  const { data } = await axiosClient.get<ScoreLevelReportResponse>(
    "/reports/score-levels/",
  );
  return data.results ?? [];
}

export async function fetchTopGroupA(): Promise<TopGroupAStudent[]> {
  const { data } = await axiosClient.get<{ results: TopGroupAStudent[] }>(
    "/reports/top-group-a/",
  );
  return data.results;
}
