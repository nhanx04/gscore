"""Query helpers for the scores app."""

from django.shortcuts import get_object_or_404

from scores.models import StudentScore


def get_student_score_by_registration_number(registration_number: str) -> StudentScore:
    return get_object_or_404(StudentScore, registration_number=registration_number)

