# Generated by Django 3.0.2 on 2020-04-06 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicApp', '0011_auto_20200406_1435'),
    ]

    operations = [
        migrations.AddField(
            model_name='musiclist',
            name='sheetDetail',
            field=models.ManyToManyField(to='musicApp.SheetDetail'),
        ),
    ]
