import uuid
from django.db import models
from companies.models import Company


class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, related_name='departments', on_delete=models.PROTECT)
    name = models.CharField(max_length=100)
    employees_count = models.PositiveIntegerField(default=0)


class Meta:
    unique_together = ('company', 'name')
    def __str__(self):
        return f"{self.name} ({self.company.name})"