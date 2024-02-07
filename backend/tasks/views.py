from django.shortcuts import render
from rest_framework import permissions, viewsets
from django_filters import rest_framework as filters


from .serializers import TaskSerializer, TaskStatusSerializer
from .models import Task, TaskStatus


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.AllowAny]


class TaskStatusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TaskStatus.objects.all()
    serializer_class = TaskStatusSerializer
    permission_classes = [permissions.AllowAny]
    
    filterset_fields = ['name', 'order']