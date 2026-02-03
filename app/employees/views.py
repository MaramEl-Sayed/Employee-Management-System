from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsManager
from .models import Employee
from .serializers import EmployeeSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.select_related('company', 'department')
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated & IsManager]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['company', 'department', 'status']
    search_fields = ['name', 'email', 'designation']
    ordering_fields = ['created_at', 'days_employed']