# Generated by Django 3.0.2 on 2020-04-06 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicApp', '0008_auto_20200403_0455'),
    ]

    operations = [
        migrations.AddField(
            model_name='musicsheet',
            name='isMusicApi',
            field=models.BooleanField(choices=[(0, 'False'), (1, 'True')], default=0, max_length=1),
        ),
    ]
