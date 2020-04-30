# Generated by Django 3.0.2 on 2020-03-30 15:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cover', models.URLField()),
                ('desc', models.TextField(blank=True, null=True)),
                ('name', models.CharField(max_length=32)),
                ('artistId', models.IntegerField(unique=True)),
            ],
            options={
                'db_table': 'artist',
            },
        ),
        migrations.CreateModel(
            name='MusicList',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('mvId', models.IntegerField(null=True, unique=True)),
                ('musicId', models.IntegerField(unique=True)),
                ('duration', models.IntegerField(unique=True)),
                ('name', models.CharField(max_length=32)),
            ],
            options={
                'db_table': 'musicList',
            },
        ),
        migrations.CreateModel(
            name='MusicLyric',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('musicId', models.IntegerField(unique=True)),
                ('lyric', models.TextField(blank=True)),
            ],
            options={
                'db_table': 'musicLyric',
            },
        ),
        migrations.CreateModel(
            name='MusicUrl',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('musicId', models.IntegerField(unique=True)),
                ('url', models.URLField()),
                ('isPlay', models.BooleanField(choices=[(0, 'False'), (1, 'True')], default=1, max_length=1)),
            ],
            options={
                'db_table': 'musicUrl',
            },
        ),
        migrations.CreateModel(
            name='MvUrl',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('mvId', models.IntegerField(unique=True)),
                ('url', models.URLField()),
                ('isPlay', models.BooleanField(choices=[(0, 'False'), (1, 'True')], default=1, max_length=1)),
            ],
            options={
                'db_table': 'mvUrl',
            },
        ),
        migrations.CreateModel(
            name='TagList',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('sheetId', models.IntegerField(unique=True)),
                ('name', models.CharField(max_length=32)),
            ],
            options={
                'db_table': 'tagList',
            },
        ),
        migrations.CreateModel(
            name='SheetDetail',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('sheetId', models.IntegerField(unique=True)),
                ('desc', models.TextField(blank=True)),
                ('musicList', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicApp.MusicList', to_field='musicId')),
                ('tagList', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicApp.TagList')),
            ],
            options={
                'db_table': 'sheetDetail',
            },
        ),
        migrations.CreateModel(
            name='MvDetail',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('mvId', models.IntegerField(unique=True)),
                ('cover', models.URLField()),
                ('name', models.CharField(max_length=32)),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicApp.Artist', to_field='artistId')),
                ('mvUrl', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicApp.MvUrl', to_field='mvId')),
            ],
            options={
                'db_table': 'mvDetail',
            },
        ),
        migrations.CreateModel(
            name='MusicSheet',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('sheetId', models.IntegerField(null=True)),
                ('userId', models.IntegerField(unique=True)),
                ('sheetName', models.CharField(max_length=32)),
                ('love', models.BooleanField(choices=[(0, 'False'), (1, 'True')], default=0, max_length=1)),
                ('musicNum', models.IntegerField(default=0)),
                ('isCollection', models.BooleanField(choices=[(0, 'False'), (1, 'True')], default=0, max_length=1)),
                ('cover', models.URLField()),
                ('createTime', models.DateTimeField(verbose_name='创建时间')),
                ('updateTime', models.DateTimeField(auto_now_add=True, verbose_name='更新时间')),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicApp.Artist', to_field='artistId')),
            ],
            options={
                'db_table': 'musicSheet',
            },
        ),
    ]