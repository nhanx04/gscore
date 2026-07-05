from decimal import Decimal

from django.core.exceptions import ValidationError
from django.db import models


class StudentScore(models.Model):
    registration_number = models.CharField(max_length=20, unique=True, db_index=True)
    # Subject score fields are intentionally not indexed to reduce storage usage for large CSV imports.
    # The main lookup field is registration_number.
    math = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    literature = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    foreign_language = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    physics = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    chemistry = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    biology = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    history = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    geography = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    civic_education = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    foreign_language_code = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        super().clean()
        for field_name in [
            "math",
            "literature",
            "foreign_language",
            "physics",
            "chemistry",
            "biology",
            "history",
            "geography",
            "civic_education",
        ]:
            value = getattr(self, field_name)
            if value is None:
                continue
            if not (Decimal("0") <= value <= Decimal("10")):
                raise ValidationError({field_name: "Score must be between 0 and 10."})

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.registration_number

