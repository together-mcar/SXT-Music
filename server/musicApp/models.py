from django.db import models

# Create your models here.

class MusicSheet(models.Model):
  '''
    歌单表
  '''  
  id = models.AutoField(primary_key=True)
  sheetId = models.BigIntegerField(null=True)
  userId = models.IntegerField()
  sheetName = models.CharField(max_length=32)
  love = models.BooleanField(max_length=1, choices=((0, 'False'), (1, 'True')), default=0)
  isMusicApi = models.BooleanField(max_length=1, choices=((0, 'False'), (1, 'True')), default=0)
  musicNum = models.IntegerField(default=0)
  artist = models.ForeignKey(to='Artist', to_field='artistId', on_delete=models.CASCADE)
  isCollection = models.BooleanField(max_length=1, choices=((0, 'False'), (1, 'True')), default=0)
  cover = models.URLField()
  createTime = models.DateTimeField(verbose_name="创建时间")
  updateTime = models.DateTimeField(verbose_name="更新时间", auto_now_add=True)

  def __str__(self):
    return 'MusicSheet object (sheetName: %s)' % (self.sheetName)
  class Meta:
    db_table = 'musicSheet'

class SheetDetail(models.Model):
  '''
    歌单详情
  '''
  id = models.AutoField(primary_key=True)
  sheetId = models.BigIntegerField(unique=True)
  desc = models.TextField(blank=True)
  sheetName = models.CharField(max_length=32)
  tagList = models.ManyToManyField(to='TagList')
  musicList = models.ManyToManyField(to='MusicList')

  def __str__(self):
    return 'SheetDetail object (sheetId: %s)' % (self.sheetId)
  class Meta:
    db_table = 'sheetDetail'

class TagList(models.Model):
  '''
    标签表
  '''
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=32, unique=True)
  category = models.CharField(max_length=16)

  def __str__(self):
    return 'TagList object (name: %s)' % (self.name)
  class Meta:
    db_table = 'tagList'

class MusicList(models.Model):
  '''
    歌曲列表
  '''
  musicId = models.CharField(max_length=32, unique=True, null=True)
  sheetDetail = models.ManyToManyField(to='SheetDetail')
  # mvId = models.IntegerField(unique=True, null=True)
  # musicId = models.IntegerField(unique=True)
  # duration = models.IntegerField(unique=True)
  # name = models.CharField(max_length=32)

  def __str__(self):
    return 'MusicList object (musicId: %s)' % (self.musicId)
  class Meta:
    db_table = 'musicList'

class Artist(models.Model):
  '''
    作者列表
  '''
  id = models.AutoField(primary_key=True)
  cover = models.URLField()
  desc = models.TextField(blank=True, null=True)
  name = models.CharField(max_length=32)
  artistId = models.IntegerField(unique=True)

  def __str__(self):
    return 'Artist object (name: %s)' % (self.name)
  class Meta:
    db_table = 'artist'

class MusicUrl(models.Model):
  '''
    歌曲Url
  '''
  id = models.AutoField(primary_key=True)
  musicId = models.IntegerField(unique=True)
  url = models.URLField()
  isPlay = models.BooleanField(max_length=1, choices=((0, 'False'), (1, 'True')), default=1)

  def __str__(self):
    return 'MusicUrl object (musicId: %s)' % (self.musicId)
  class Meta:
    db_table = 'musicUrl'

class MusicLyric(models.Model):
  '''
    歌词
  '''
  id = models.AutoField(primary_key=True)
  musicId = models.IntegerField(unique=True)
  lyric = models.TextField(blank=True)

  def __str__(self):
    return 'MusicLyric object (musicId: %s)' % (self.musicId)
  class Meta:
    db_table = 'musicLyric'

class MvDetail(models.Model):
  '''
    mv详情
  '''
  id = models.AutoField(primary_key=True)
  mvId = models.IntegerField(unique=True)
  artist = models.ForeignKey(to='Artist', to_field='artistId', on_delete=models.CASCADE)
  cover = models.URLField()
  name = models.CharField(max_length=32)
  mvUrl = models.ForeignKey(to='MvUrl', to_field='mvId', on_delete=models.CASCADE)

  def __str__(self):
    return 'MvDetail object (name: %s)' % (self.name)
  class Meta:
    db_table = 'mvDetail'

class MvUrl(models.Model):
  '''
    mv url
  '''
  id = models.AutoField(primary_key=True)
  mvId = models.IntegerField(unique=True)
  url = models.URLField()
  isPlay = models.BooleanField(max_length=1, choices=((0, 'False'), (1, 'True')), default=1)

  def __str__(self):
    return 'MvUrl object (mvId: %d)' % (self.mvId)
  class Meta:
    db_table = 'mvUrl'


