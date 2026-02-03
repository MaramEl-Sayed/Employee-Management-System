from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsManager
from .models import Department
from .serializers import DepartmentSerializer


class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.select_related('company')
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated & IsManager]