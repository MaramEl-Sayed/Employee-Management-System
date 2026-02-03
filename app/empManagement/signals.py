from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from departments.models import Department
from employees.models import Employee

@receiver([post_save, post_delete], sender=Department)
def update_company_departments_count(sender, instance, **kwargs):
    company = instance.company
    company.departments_count = company.departments.count()
    company.save(update_fields=['departments_count'])

@receiver([post_save, post_delete], sender=Employee)
def update_employee_counters(sender, instance, **kwargs):
    company = instance.company
    department = instance.department


    company.employees_count = company.employees.count()
    department.employees_count = department.employees.count()


    company.save(update_fields=['employees_count'])
    department.save(update_fields=['employees_count'])


@receiver(post_save, sender=Employee)
def update_days_employed(sender, instance, **kwargs):
    instance.calculate_days_employed()
    Employee.objects.filter(id=instance.id).update(days_employed=instance.days_employed)    