# Generated by Django 3.0.2 on 2020-04-01 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicApp', '0006_auto_20200401_0704'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sheetdetail',
            name='musicList',
        ),
        migrations.AddField(
            model_name='sheetdetail',
            name='musicList',
            field=models.ManyToManyField(to='musicApp.MusicList'),
        ),
        migrations.RemoveField(
            model_name='sheetdetail',
            name='tagList',
        ),
        migrations.AddField(
            model_name='sheetdetail',
            name='tagList',
            field=models.ManyToManyField(to='musicApp.TagList'),
        ),
    ]
