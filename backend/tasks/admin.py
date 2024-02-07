from django.contrib import admin
from .models import TaskStatus, Task

# Register your models here.

@admin.register(TaskStatus)
class TaskStatusAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'order')
    list_editable = ('order',)
    list_filter = ('order',)
    search_fields = ('name', 'description')




admin.site.register(Task)