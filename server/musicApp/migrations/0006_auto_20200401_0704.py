# Generated by Django 3.0.2 on 2020-04-01 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicApp', '0005_auto_20200331_1442'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taglist',
            name='name',
            field=models.CharField(max_length=32, unique=True),
        ),
    ]
