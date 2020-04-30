from django.shortcuts import render, HttpResponse, redirect
from django.views.decorators.http import require_http_methods
from django.core import serializers
from django.http import JsonResponse, QueryDict
from .models import *
import time, datetime
import json
# Create your views here.

def querySetToList(targetList, artistObj=None):
  saveList = []
  for item in targetList:
    if artistObj is not None:
      item['artist'] = artistObj
      if item['musicNum'] == 0:
        item['musicCount'] = getMusicCount(item['id'])
    saveList.append(item)
  return saveList

def toJSON(self):
  fields = []
  for field in self._meta.fields:
    fields.append(field.name)
  d = {}
  for attr in fields:
    if isinstance(getattr(self, attr), datetime.datetime):
      d[attr] = getattr(self, attr).strftime('%Y-%m-%d %H:%M:%S')
    elif isinstance(getattr(self, attr), datetime.date):
      d[attr] = getattr(self, attr).strftime('%Y-%m-%d')
    else:
      d[attr] = getattr(self, attr)
  return json.dumps(d)

def getMusicCount(sheetId):
  sheetDetailObj = SheetDetail.objects.get(sheetId=sheetId)
  musicListList = sheetDetailObj.musicList.all().values()
  return musicListList.count()


@require_http_methods(["POST"])
def add_artist_to_db(request):
  '''
    将作者信息添加到数据库中
  '''
  response = {}
  query = {
    'cover': '',
    'desc': '',
    'name': '',
    'artistId': 0
  }
  try:
    req = json.loads(request.body.decode())['params']
    print('add_artist_to_db - req ==> ', req)
    for item in req:
      query[item] = req[item]
    if (query['name'] is not '' and query['artistId'] is not -1):
      artistModel = Artist()
      artistModel.cover = query['cover']
      artistModel.desc = query['desc']
      artistModel.name = query['name']
      artistModel.artistId = query['artistId']
      artistModel.save()
      response['msg'] = 'add successfully'
      response['code'] = 200
    else:
      response['msg'] = 'params error'
      response['code'] = 400
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["POST"])
def post_music_sheet(request):
  '''
    上传歌单基本信息
  '''
  response = {}
  query = {
    'sheetId': 0,
    'userId': -1,
    'sheetName': '',
    'love': 0,
    'musicNum': 0,
    'artist': {},
    'isCollection': 0,
    'cover': '',
    'createTime': time.strftime('%Y-%m-%d',time.localtime(time.time())),
    'updateTime': time.strftime('%Y-%m-%d',time.localtime(time.time()))
  }
  try: 
    req = json.loads(request.body.decode())['params']
    print('post_music_sheet - req ==> ', req)
    for item in req:
      query[item] = req[item]
    print('post_music_sheet', query)
    if (query['sheetName'] is not '' and query['userId'] is not -1):
      msuicSheetList = MusicSheet.objects.filter(userId=query['userId'], sheetName=query['sheetName']).values()
      if msuicSheetList.count() >= 1:
        response['msg'] = 'music sheet already exists'
        response['code'] = 400
      else:
        artistObj = Artist.objects.get(artistId=query['artist']['artistId'])
        musicSheetModel = MusicSheet(artist=artistObj)
        musicSheetModel.sheetId = query['sheetId']
        musicSheetModel.userId = query['userId']
        musicSheetModel.sheetName = query['sheetName']
        musicSheetModel.love = query['love']
        musicSheetModel.musicNum = query['musicNum']
        musicSheetModel.isCollection = query['isCollection']
        musicSheetModel.cover = query['cover']
        musicSheetModel.createTime = query['createTime']
        musicSheetModel.updateTime = query['updateTime']
        musicSheetModel.save()
        # 将信息同步到详情列表中
        sheetDetailModel = SheetDetail()
        sheetDetailModel.sheetId = msuicSheetList[0]['id']
        sheetDetailModel.sheetName = query['sheetName']
        sheetDetailModel.save()
        response['msg'] = 'create successfully'
        response['code'] = 200
    else:
      print('post_music_sheet - 400 - error')
      response['msg'] = 'create params error'
      response['code'] = 400
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def get_love_music_sheet(request):
  '''
    获取喜爱的歌单
  '''
  response = {}
  print('get_love_music_sheet - request.GET ==> ', request.GET)
  try:
    isLove = request.GET.get('love', 0)
    userId = request.GET.get('userId')
    musicSheetList = MusicSheet.objects.filter(love=isLove, userId=userId).values()
    musicSheetObj = musicSheetList[0]
    artistList = Artist.objects.filter(artistId=userId).values()
    artistObj = artistList[0]
    musicSheetObj['artist'] = artistObj
    musicSheetObj['musicCount'] = getMusicCount(musicSheetObj['id'])
    if musicSheetList.count() == 0:
      response['msg'] = 'params error'
      response['code'] = 400
    else:
      response['msg'] = 'successfully'
      response['code'] = 200
      response['musicSheet'] = musicSheetObj
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def get_music_sheet(request):
  '''
    获取音乐列表
  '''
  response = {}
  print('get_music_sheet - request.GET ==> ', request.GET)
  try:
    userId = request.GET.get('userId')
    musicSheetList = MusicSheet.objects.filter(love=0, userId=userId).values()
    artistList = Artist.objects.filter(artistId=userId).values()
    artistObj = artistList[0]
    print('get_music_sheet - querySetToList', querySetToList(musicSheetList, artistObj))
    response['msg'] = 'successfully'
    response['code'] = 200
    response['musicSheet'] = querySetToList(musicSheetList, artistObj)
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def del_music_sheet(request):
  '''
    删除歌单
  '''
  response = {}
  print('del_music_sheet - request.GET ==> ', request.GET)
  try:
    userId = request.GET.get('userId')
    id = request.GET.get('id')
    sheetId = request.GET.get('sheetId', 0)
    sheetName = request.GET.get('sheetName', '')
    isDelete = MusicSheet.objects.filter(id=id, userId=userId, sheetId=sheetId, sheetName=sheetName).delete()
    SheetDetail.objects.filter(sheetName=sheetName).delete()
    if isDelete[0] == 1:
      response['msg'] = 'delete ' + sheetName + ' success'
      response['code'] = 200
    else:
      response['msg'] = 'delete ' + sheetName + ' fail'
      response['code'] = 400
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def init_music_sheet_tag(request):
  '''
    初始化歌单类型
  '''
  response = {}
  print('init_music_sheet_tag - request.GET ==> ', request.GET)
  try:
    name = request.GET.get('name', '')
    category = request.GET.get('category')
    tagListObj = TagList(name=name, category=category)
    tagListObj.save()
    response['msg'] = 'successfully'
    response['code'] = 200
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def get_music_sheet_tag(request):
  '''
    获取歌单类型
  '''
  response = {}
  print('get_music_sheet_tag - request.GET ==> ', request.GET)
  try:
    tagListList = TagList.objects.all().values()
    response['msg'] = 'successfully'
    response['code'] = 200
    response['data'] = querySetToList(tagListList)
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def get_music_sheet_detail(request):
  '''
    得到歌单详情
  '''
  response = {}
  print('get_music_sheet_detail - request.GET ==> ', request.GET)
  try:
    sheetId = request.GET.get('sheetId')
    sheetDetailObj = SheetDetail.objects.get(sheetId=sheetId)
    obj = toJSON(sheetDetailObj)
    tagList = sheetDetailObj.tagList.all().values()
    obj = json.loads(obj)
    obj['tagList'] = querySetToList(tagList)
    response['msg'] = 'successfully'
    response['code'] = 200
    response['data'] = obj
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def modify_music_sheet_detail(request):
  '''
    修改歌单详情
  '''
  response = {}
  print('modify_music_sheet_detail - request.GET ==> ', request.GET)
  try:
    sheetId = request.GET.get('sheetId')
    sheetName = request.GET.get('sheetName')
    desc = request.GET.get('desc', '')
    tagList = request.GET.getlist('tagList[]', [])
    tagObjList = []
    print('sheetId={}, sheetName={}, desc={}, tagList={}'.format(sheetId, sheetName, desc, tagList))
    for item in tagList:
      itemObj = json.loads(item)
      tag = TagList.objects.get(id=itemObj['id'], name=itemObj['name'])
      tagObjList.append(tag)
    print('tagObjList', tagObjList)
    SheetDetail.objects.filter(sheetId=sheetId).update(sheetName=sheetName, desc=desc)
    MusicSheet.objects.filter(id=sheetId).update(sheetName=sheetName)
    obj = SheetDetail.objects.filter(sheetId=sheetId).first()
    obj.tagList.set(tagObjList)
    response['msg'] = 'successfully'
    response['code'] = 200
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def get_music_list_by_sheetId(request):
  '''
    根据歌单id获取歌曲列表
  '''
  response = {}
  print('get_music_list_by_sheetId - request.GET ==> ', request.GET)
  try:
    sheetId = request.GET.get('sheetId')
    print('sheetId: ', sheetId)
    sheetDetailObj = SheetDetail.objects.get(sheetId=sheetId)
    musicListList = sheetDetailObj.musicList.all().values()
    sheetDetailObj = toJSON(sheetDetailObj)
    if musicListList.count() == 0:
      response['msg'] = '暂无歌曲'
      response['data'] = []
    else:
      response['msg'] = 'successfully'
      response['data'] = querySetToList(musicListList)
    response['code'] = 200
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def add_music_to_music_sheet(request):
  '''
    添加歌曲到自己的歌单中
  '''
  response = {}
  print('add_music_to_music_sheet - request.GET ==> ', request.GET)
  try:
    sheetId = request.GET.get('sheetId')
    musicIdList = request.GET.getlist('musicIdList[]', [])
    print('sheetId={}, musicIdList={}'.format(sheetId, musicIdList))
    sheetDetailObj = SheetDetail.objects.filter(sheetId=sheetId).first()
    musicAll = sheetDetailObj.musicList.all()
    for item in musicIdList:
      isHaveMusic = False
      for el in querySetToList(musicAll):
        if el.musicId == item:
          isHaveMusic = True
      if isHaveMusic:
        response['msg'] = '歌曲已添加'
        response['code'] = 400
      else:
        musicListList = MusicList.objects.filter(musicId=item).values()
        # 判断这个歌曲是不是在歌曲表中存在
        if musicListList.count() == 0:
          musicListObj = MusicList()
          musicListObj.musicId = item
          musicListObj.save()
          sheetDetailObj.musicList.add(musicListObj)
        else:
          musicListObj = MusicList.objects.get(musicId=item)
          sheetDetailObj.musicList.add(musicListObj)
        response['msg'] = '歌曲添加成功'
        response['code'] = 200
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def collection_music_sheet(request):
  '''
    收藏歌单，收藏网易歌单
  '''
  response = {}
  print('collection_music_sheet - request.GET ==> ', request.GET)
  try:
    sheetId = request.GET.get('sheetId')
    userId = request.GET.get('userId')
    sheetName = request.GET.get('sheetName')
    musicNum = request.GET.get('musicNum')
    isCollection = request.GET.get('isCollection')
    cover = request.GET.get('cover')
    if (sheetName is not '' and userId is not -1):
      msuicSheetList = MusicSheet.objects.filter(userId=userId, sheetName=sheetName).values()
      if msuicSheetList.count() >= 1:
        response['msg'] = 'music sheet already exists'
        response['code'] = 400
      else:
        artistObj = Artist.objects.get(artistId=userId)
        musicSheetModel = MusicSheet(artist=artistObj)
        musicSheetModel.sheetId = sheetId
        musicSheetModel.userId = userId
        musicSheetModel.sheetName = sheetName
        musicSheetModel.musicNum = musicNum
        musicSheetModel.isCollection = isCollection
        musicSheetModel.cover = cover
        musicSheetModel.createTime = time.strftime('%Y-%m-%d',time.localtime(time.time()))
        musicSheetModel.updateTime = time.strftime('%Y-%m-%d',time.localtime(time.time()))
        musicSheetModel.save()
        response['msg'] = 'collection successfully'
        response['code'] = 200
    else:
      response['msg'] = 'create params error'
      response['code'] = 400
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)
