from django.urls import include, path
from rest_framework import routers

from .views import TaskViewSet, TaskStatusViewSet

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'task-statues', TaskStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns += router.urls