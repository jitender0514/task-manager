# Generated by Django 5.0.1 on 2024-02-01 10:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_alter_taskstatus_options_taskstatus_order'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='taskstatus',
            options={'ordering': ['order', 'name']},
        ),
        migrations.AddField(
            model_name='task',
            name='complete_on',
            field=models.DateTimeField(default=datetime.datetime(2024, 2, 1, 10, 56, 32, 596818, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
    ]
