from rest_framework import serializers
from .models import Employee


ALLOWED_TRANSITIONS = {
'APPLICATION_RECEIVED': ['INTERVIEW_SCHEDULED', 'NOT_ACCEPTED'],
'INTERVIEW_SCHEDULED': ['HIRED', 'NOT_ACCEPTED'],
}


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


    def validate(self, data):
        company = data.get('company')
        department = data.get('department')


        if company and department and department.company != company:
            raise serializers.ValidationError('Department does not belong to selected company')


        instance = self.instance
        new_status = data.get('status')


        if instance and new_status and instance.status != new_status:
            allowed = ALLOWED_TRANSITIONS.get(instance.status, [])
            if new_status not in allowed:
                raise serializers.ValidationError('Invalid status transition')


        if new_status == Employee.Status.HIRED and not data.get('hired_on'):
            raise serializers.ValidationError('hired_on is required when status is HIRED')


        return data