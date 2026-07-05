from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from scores.selectors import get_student_score_by_registration_number
from scores.serializers import StudentScoreSerializer
from scores.services import ScoreReportService


@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok"})


@api_view(["GET"])
def check_score(request):
    registration_number = request.query_params.get("registration_number", "").strip()
    if not registration_number:
        return Response(
            {"detail": "registration_number is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if not registration_number.isdigit():
        return Response(
            {"detail": "registration_number must be numeric."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    student_score = get_student_score_by_registration_number(registration_number)
    serializer = StudentScoreSerializer(student_score)
    return Response(serializer.data)


@api_view(["GET"])
def score_levels_report(request):
    return Response({"results": ScoreReportService.get_score_levels_report()})


@api_view(["GET"])
def top_group_a(request):
    serializer = StudentScoreSerializer(ScoreReportService.get_top_group_a(limit=10), many=True)
    return Response({"results": serializer.data})

