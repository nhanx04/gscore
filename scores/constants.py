"""Constants and domain objects for the scores app."""

from dataclasses import dataclass
from decimal import Decimal
from typing import Optional


@dataclass(frozen=True)
class Subject:
    key: str
    name: str
    model_field: str
    csv_column: str


@dataclass(frozen=True)
class ScoreLevel:
    key: str
    name: str
    min_score: Optional[Decimal]
    max_score: Optional[Decimal]

    def contains(self, score: Optional[Decimal]) -> bool:
        if score is None:
            return False
        if self.min_score is not None and score < self.min_score:
            return False
        if self.max_score is not None and score >= self.max_score:
            return False
        return True


SUBJECTS = [
    Subject("math", "Math", "math", "toan"),
    Subject("literature", "Literature", "literature", "ngu_van"),
    Subject("foreign_language", "Foreign language", "foreign_language", "ngoai_ngu"),
    Subject("physics", "Physics", "physics", "vat_li"),
    Subject("chemistry", "Chemistry", "chemistry", "hoa_hoc"),
    Subject("biology", "Biology", "biology", "sinh_hoc"),
    Subject("history", "History", "history", "lich_su"),
    Subject("geography", "Geography", "geography", "dia_li"),
    Subject("civic_education", "Civic education", "civic_education", "gdcd"),
]

SCORE_LEVELS = [
    ScoreLevel("excellent", "Excellent", Decimal("8"), None),
    ScoreLevel("good", "Good", Decimal("6"), Decimal("8")),
    ScoreLevel("average", "Average", Decimal("4"), Decimal("6")),
    ScoreLevel("poor", "Poor", None, Decimal("4")),
]

CSV_TO_MODEL_FIELD = {subject.csv_column: subject.model_field for subject in SUBJECTS}
MODEL_FIELD_TO_SUBJECT = {subject.model_field: subject for subject in SUBJECTS}

