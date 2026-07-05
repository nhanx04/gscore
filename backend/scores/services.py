"""Service layer for the scores app."""

from django.db.models import Case, Count, DecimalField, F, IntegerField, Sum, Value, When
from django.db.models.functions import Coalesce

from scores.constants import SCORE_LEVELS, SUBJECTS
from scores.models import StudentScore


class ScoreReportService:
    @staticmethod
    def get_score_levels_report():
        report = []
        for subject in SUBJECTS:
            level_counts = {}
            for level in SCORE_LEVELS:
                if level.key == "excellent":
                    condition = {f"{subject.model_field}__gte": level.min_score}
                elif level.key in {"good", "average"}:
                    condition = {
                        f"{subject.model_field}__gte": level.min_score,
                        f"{subject.model_field}__lt": level.max_score,
                    }
                else:
                    condition = {f"{subject.model_field}__lt": level.max_score}

                level_counts[level.key] = Count(
                    Case(
                        When(**condition, then=1),
                        output_field=IntegerField(),
                    )
                )

            aggregated = StudentScore.objects.aggregate(**level_counts)
            report.append(
                {
                    "subject": subject.key,
                    "subject_name": subject.name,
                    "levels": [
                        {"key": level.key, "name": level.name, "count": aggregated[level.key]}
                        for level in SCORE_LEVELS
                    ],
                }
            )
        return report

    @staticmethod
    def get_top_group_a(limit=10):
        queryset = (
            StudentScore.objects.filter(
                math__isnull=False,
                physics__isnull=False,
                chemistry__isnull=False,
            )
            .annotate(
                total_score=F("math") + F("physics") + F("chemistry")
            )
            .order_by("-total_score", "registration_number")[:limit]
        )
        return queryset

