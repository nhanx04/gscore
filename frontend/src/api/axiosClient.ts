import axios from 'axios';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

export const axiosClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { detail?: string } | undefined)?.detail ||
      error.response?.statusText ||
      error.message ||
      'Có lỗi xảy ra khi gọi API.'
    );
  }

  return 'Có lỗi xảy ra khi gọi API.';
}

