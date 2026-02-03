import uuid
from django.db import models
from django.utils.timezone import now
from companies.models import Company
from departments.models import Department


class Employee(models.Model):
    class Status(models.TextChoices):
        APPLICATION_RECEIVED = 'APPLICATION_RECEIVED', 'Application Received'
        INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED', 'Interview Scheduled'
        HIRED = 'HIRED', 'Hired'
        NOT_ACCEPTED = 'NOT_ACCEPTED', 'Not Accepted'


    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.PROTECT, related_name='employees')
    department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name='employees')


    status = models.CharField(max_length=30, choices = Status.choices, default=Status.APPLICATION_RECEIVED)


    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=20)
    address = models.TextField()
    designation = models.CharField(max_length=255)


    hired_on = models.DateField(null=True, blank=True)
    days_employed = models.PositiveIntegerField(default=0)


    created_at = models.DateTimeField(auto_now_add=True)


    def calculate_days_employed(self):
        if self.status == self.Status.HIRED and self.hired_on:
            self.days_employed = (now().date() - self.hired_on).days
        else:
            self.days_employed = 0