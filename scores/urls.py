from django.urls import path

from .views import check_score, health_check, score_levels_report, top_group_a

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("scores/check/", check_score, name="check-score"),
    path("reports/score-levels/", score_levels_report, name="score-levels-report"),
    path("reports/top-group-a/", top_group_a, name="top-group-a"),
]

