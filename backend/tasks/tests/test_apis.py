from django.forms.models import model_to_dict

from rest_framework.test import APITestCase
from rest_framework import status
from ..models import Task, TaskStatus



class TaskStatusAPITest(APITestCase):
    
    def setUp(self):
        TaskStatus.objects.create(name='Done', description='Done task status', order=2)
        TaskStatus.objects.create(name='TO DO', description='Initial task status', order=1)
    
    def test_fetch_all_status_objects(self):
        response = self.client.get('/api/task-statues/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)



class TaskAPITest(APITestCase):
    
    def setUp(self):
        # Set up non-modified objects used by all test methods
        status = TaskStatus.objects.create(name='Done', description='Done task status', order=1)
        task = {
                'title': 'Test Object 1',
                "description": "test object 1 description",
                "status": status,
                "complete_on": "2024-02-10T10:56:32.596Z"
            }
        self.task = Task.objects.create(**task)

    def test_create_object(self):
        response = self.client.post('/api/tasks/', 
                                    {
                                        'title': 'Test Object',
                                        "description": "test object description",
                                        "status": 1,
                                        "complete_on": "2024-02-10T10:56:32.596Z"
                                     })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    
    def test_fetch_all_objects(self):
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    
    def test_update_objects(self):
        update_object = { **model_to_dict(self.task), 'title': 'Update Object'}
        response = self.client.put(f'/api/tasks/{self.task.id}/', update_object)
        task = Task.objects.get(id=self.task.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(task.title, update_object['title'])
