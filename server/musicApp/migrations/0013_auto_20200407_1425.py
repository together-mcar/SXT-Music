# Generated by Django 3.0.2 on 2020-04-07 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicApp', '0012_musiclist_sheetdetail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='musicsheet',
            name='sheetName',
            field=models.CharField(max_length=32),
        ),
    ]
