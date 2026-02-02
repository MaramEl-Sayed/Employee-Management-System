from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        MANAGER = 'MANAGER', 'Manager'
        EMPLOYEE = 'EMPLOYEE', 'Employee'


    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=Roles.choices)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']