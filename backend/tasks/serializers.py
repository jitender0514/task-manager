from rest_framework import serializers
from django.utils import timezone

from .models import Task, TaskStatus


class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskStatus
        fields = ('id', 'name', 'description')
        read_only_fields = ('id', 'name', 'description')



class TaskSerializer(serializers.ModelSerializer):
    status_detail = TaskStatusSerializer(source='status', read_only=True)
    
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'status_detail', 'created_at', 'updated_at', 'complete_on')
        read_only_fields = ('id', 'created_at', 'updated_at', 'status_detail')
        
    
    def validate_complete_on(self, value):
        """
        Validate the `complete_on` field, only on POST requests.
        - `completed_on` datetime should not be less than current datetime
        """
        if self.context['request'].method == 'POST':
            if value:
                if value < timezone.now():
                    raise serializers.ValidationError({'complete_on': 'The task must be completed at a later time.'})
        return value