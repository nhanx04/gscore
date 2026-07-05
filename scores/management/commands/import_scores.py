import csv
from decimal import Decimal, InvalidOperation
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import IntegrityError, transaction

from scores.constants import CSV_TO_MODEL_FIELD, SUBJECTS
from scores.models import StudentScore


SCORE_MODEL_FIELDS = {subject.model_field for subject in SUBJECTS}


class Command(BaseCommand):
    help = "Import student scores from a CSV file."

    def add_arguments(self, parser):
        parser.add_argument("csv_path", type=str)

    def handle(self, *args, **options):
        csv_path = Path(options["csv_path"])
        if not csv_path.exists():
            raise CommandError(f"CSV file not found: {csv_path}")

        imported_count = 0
        skipped_count = 0
        seen_registration_numbers = set()
        objects_to_create = []

        with csv_path.open("r", encoding="utf-8", newline="") as csv_file:
            reader = csv.DictReader(csv_file)
            for row_number, row in enumerate(reader, start=2):
                try:
                    student_score = self._row_to_instance(row, seen_registration_numbers)
                    if student_score is None:
                        skipped_count += 1
                        continue
                    objects_to_create.append(student_score)
                    if len(objects_to_create) >= 1000:
                        imported_count += self._bulk_create_unique(objects_to_create)
                        objects_to_create = []
                except ValueError as exc:
                    skipped_count += 1
                    self.stdout.write(self.style.WARNING(f"Row {row_number}: {exc}"))

        if objects_to_create:
            imported_count += self._bulk_create_unique(objects_to_create)

        self.stdout.write(self.style.SUCCESS(f"Imported: {imported_count}"))
        self.stdout.write(self.style.SUCCESS(f"Skipped: {skipped_count}"))

    def _row_to_instance(self, row, seen_registration_numbers):
        registration_number = (row.get("sbd") or "").strip()
        if not registration_number:
            raise ValueError("Missing registration number (sbd).")
        if registration_number in seen_registration_numbers:
            return None

        instance_kwargs = {"registration_number": registration_number}
        for csv_column, model_field in CSV_TO_MODEL_FIELD.items():
            value = (row.get(csv_column) or "").strip()
            if model_field in SCORE_MODEL_FIELDS:
                instance_kwargs[model_field] = self._parse_score(value, csv_column)
            elif model_field == "foreign_language_code":
                instance_kwargs[model_field] = value or None

        instance = StudentScore(**instance_kwargs)
        instance.clean()
        seen_registration_numbers.add(registration_number)
        return instance

    def _parse_score(self, value, field_name):
        if value == "":
            return None
        try:
            score = Decimal(value)
        except InvalidOperation as exc:
            raise ValueError(f"Invalid score in column '{field_name}': {value}") from exc
        if score < Decimal("0") or score > Decimal("10"):
            raise ValueError(f"Score out of range in column '{field_name}': {value}")
        return score

    def _bulk_create_unique(self, objects):
        try:
            with transaction.atomic():
                existing_numbers = set(
                    StudentScore.objects.filter(
                        registration_number__in=[obj.registration_number for obj in objects]
                    ).values_list("registration_number", flat=True)
                )
                unique_objects = [
                    obj for obj in objects if obj.registration_number not in existing_numbers
                ]
                created_objects = StudentScore.objects.bulk_create(
                    unique_objects, batch_size=1000
                )
                return len(created_objects)
        except IntegrityError as exc:
            raise CommandError(f"Database error while importing scores: {exc}") from exc

