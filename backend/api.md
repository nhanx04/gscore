# Scores API Documentation

Base URL: `/api`

## 1) Health check

### GET `/health/`

Checks whether the backend is running.

#### Response

```json
{
  "status": "ok"
}
```

#### Example

```bash
curl http://localhost:8000/api/health/
```

---

## 2) Check a student's score

### GET `/scores/check/?registration_number=1000001`

Returns a student score record by registration number.

#### Query parameters

- `registration_number` (required): numeric registration number

#### Validation

- Missing `registration_number` -> `400 Bad Request`
- Non-numeric `registration_number` -> `400 Bad Request`
- Not found -> `404 Not Found`

#### Response example

```json
{
  "registration_number": "1000001",
  "math": "8.50",
  "literature": "7.25",
  "foreign_language": null,
  "physics": "6.00",
  "chemistry": "7.75",
  "biology": null,
  "history": "5.00",
  "geography": "6.50",
  "civic_education": "9.00",
  "foreign_language_code": null,
  "created_at": "2026-07-05T10:00:00Z",
  "updated_at": "2026-07-05T10:00:00Z"
}
```

#### Error examples

```json
{
  "detail": "registration_number is required."
}
```

```json
{
  "detail": "registration_number must be numeric."
}
```

#### Example

```bash
curl "http://localhost:8000/api/scores/check/?registration_number=1000001"
```

---

## 3) Score levels report

### GET `/reports/score-levels/`

Returns the count of students by subject and score level. Intended for charts.

#### Score levels

- `excellent`: score >= 8
- `good`: score >= 6 and < 8
- `average`: score >= 4 and < 6
- `poor`: score < 4

#### Notes

- NULL scores are ignored
- Response is grouped by subject

#### Response example

```json
{
  "results": [
    {
      "subject": "math",
      "subject_name": "Math",
      "levels": [
        { "key": "excellent", "name": "Excellent", "count": 1200 },
        { "key": "good", "name": "Good", "count": 2500 },
        { "key": "average", "name": "Average", "count": 1800 },
        { "key": "poor", "name": "Poor", "count": 450 }
      ]
    }
  ]
}
```

#### Example

```bash
curl http://localhost:8000/api/reports/score-levels/
```

---

## 4) Top Group A report

### GET `/reports/top-group-a/`

Returns the top 10 students in Group A.

#### Group A formula

- `total_score = math + physics + chemistry`

#### Rules

- Only students with all 3 scores not null are included
- Sorted by `total_score` descending
- Limited to top 10

#### Response example

```json
{
  "results": [
    {
      "registration_number": "1000001",
      "math": "9.50",
      "physics": "9.25",
      "chemistry": "9.00",
      "literature": "7.25",
      "foreign_language": null,
      "biology": null,
      "history": "6.50",
      "geography": "7.00",
      "civic_education": "8.00",
      "foreign_language_code": null,
      "created_at": "2026-07-05T10:00:00Z",
      "updated_at": "2026-07-05T10:00:00Z"
    }
  ]
}
```

#### Example

```bash
curl http://localhost:8000/api/reports/top-group-a/
```

---

## 5) CSV import command

### Command

```bash
python manage.py import_scores data/diem_thi_thpt_2024.csv
```

### Supported CSV columns

- `sbd` -> registration number
- `toan` -> math
- `ngu_van` -> literature
- `ngoai_ngu` -> foreign_language
- `vat_li` -> physics
- `hoa_hoc` -> chemistry
- `sinh_hoc` -> biology
- `lich_su` -> history
- `dia_li` -> geography
- `gdcd` -> civic_education
- `ma_ngoai_ngu` -> foreign_language_code

### Notes

- Empty score cells are treated as `null`
- Scores must be between 0 and 10
- Duplicate registration numbers are skipped
