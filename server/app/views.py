from django.shortcuts import render, HttpResponse, redirect
from django.views.decorators.http import require_http_methods
from django.core import serializers
from django.http import JsonResponse, QueryDict
from .models import UserList
import json
# Create your views here.

@require_http_methods(["POST"])
def register(request):
  '''
  注册信息
  '''
  response = {}
  try:
    req = json.loads(request.body.decode())['params']
    print(req)
    user_name = req['userName']
    pass_word = req['passWord']
    gender = req['gender']
    print(user_name, pass_word, gender)
    res = UserList.objects.filter(userName=user_name)
    if res.count() == 0:
      UserList.objects.create(userName=user_name, gender=gender, passWord=pass_word)
      userList = UserList.objects.filter(userName=user_name).values()
      response['msg'] = 'success'
      response['code'] = 200
      response['user'] = userList[0]
    else:
      response['msg'] = '用户名已存在。。。'
      response['code'] = 400
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)

@require_http_methods(["GET"])
def login(request):
  '''
  登录信息
  '''
  response = {}
  try:
    user_name = request.GET.get('userName')
    pass_word = request.GET.get('passWord')
    print('request', user_name, pass_word)
    userList = UserList.objects.filter(userName=user_name).values()
    if userList.count() == 0:
      response['msg'] = '用户名不存在。。。'
      response['code'] = 400
    else:
      if userList[0]['passWord'] == pass_word:
        response['msg'] = 'login success'
        response['code'] = 200
        response['user'] = userList[0]
      else:
        response['msg'] = '密码错误。。。'
        response['code'] = 500
  except Exception as e:
    response['msg'] = str(e)
    response['code'] = 500
  return JsonResponse(response)