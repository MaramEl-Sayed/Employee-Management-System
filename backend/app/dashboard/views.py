from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from companies.models import Company
from departments.models import Department
from employees.models import Employee


class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            "companies": Company.objects.count(),
            "departments": Department.objects.count(),
            "employees": Employee.objects.count(),
            "hired_employees": Employee.objects.filter(
                status="HIRED"
            ).count(),
        }

        return Response(data)
