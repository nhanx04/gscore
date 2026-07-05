from decimal import Decimal

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="StudentScore",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("registration_number", models.CharField(max_length=20, unique=True, db_index=True)),
                ("math", models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, db_index=True)),
                ("literature", models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, db_index=True)),
                ("foreign_language", models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, db_index=True)),
                ("physics", models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, db_index=True)),
                ("chemistry", models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, db_index=True)),
                ("biology", models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, db_index=True)),
                ("history", models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, db_index=True)),
                ("geography", models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, db_index=True)),
                ("civic_education", models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, db_index=True)),
                ("foreign_language_code", models.CharField(blank=True, max_length=20, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "indexes": [
                    models.Index(fields=["registration_number"], name="scores_stud_regist_6a2b4d_idx"),
                    models.Index(fields=["math"], name="scores_stud_math_3d5e68_idx"),
                    models.Index(fields=["literature"], name="scores_stud_literat_3ed1a8_idx"),
                    models.Index(fields=["foreign_language"], name="scores_stud_foreign_8d0be0_idx"),
                    models.Index(fields=["physics"], name="scores_stud_physics_4c56f0_idx"),
                    models.Index(fields=["chemistry"], name="scores_stud_chemist_6f2e1f_idx"),
                    models.Index(fields=["biology"], name="scores_stud_biology_4a6d4c_idx"),
                    models.Index(fields=["history"], name="scores_stud_history_8a1f61_idx"),
                    models.Index(fields=["geography"], name="scores_stud_geograph_ae0f29_idx"),
                    models.Index(fields=["civic_education"], name="scores_stud_civic_e_3bf721_idx"),
                ],
            },
        ),
    ]

