# Generated by Django 3.0.2 on 2020-03-31 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='musicsheet',
            name='userId',
            field=models.IntegerField(),
        ),
    ]
