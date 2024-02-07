from django.db import models

# Create your models here.

class BaseDateTimeModel(models.Model):
    """
    Base abstract class for date-time models.

    Attributes:
        created_at (datetime): The date and time the object was created.
        updated_at (datetime): The date and time the object was last updated.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True



class TaskStatus(BaseDateTimeModel):
    """
    Class representing the status of a task. [Inherited from BaseDateTimeModel]

    Attributes:
        name (str): The name of the task-status. [Required]
        description (str): The description of the task-status.
        order (int): The order of the task-status. Lower numbers has higher priority.
    """
    name = models.CharField(max_length=255)
    description = models.TextField( null=True, blank=True)  # TODO: The description of the task-status.
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order', 'name']


class Task(BaseDateTimeModel):
    """
    Class representing a task. [Inherited from BaseDateTimeModel]

    Attributes:
        title (str): The title of the task. [Required]
        description (str): The description of the task.
        status (TaskStatus): The status of the task. [Required]
        complete_on (datetime.datetime): The time when the task needs to be completed [Required]
    """
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)  # Not required field
    status = models.ForeignKey(TaskStatus, related_name='task_status', on_delete=models.CASCADE)
    complete_on = models.DateTimeField()

    def __str__(self):
        return self.title
