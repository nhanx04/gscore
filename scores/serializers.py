"""Serializers for the scores app."""

from rest_framework import serializers

from scores.constants import SUBJECTS
from scores.models import StudentScore


class StudentScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentScore
        fields = [
            "registration_number",
            "foreign_language_code",
            "created_at",
            "updated_at",
            *[subject.model_field for subject in SUBJECTS],
        ]

