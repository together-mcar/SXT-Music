
## 后端部分（Django框架）

**项目运行命令**
> python3 manage.py runserver

**生成一个新的app的命令**
> django-admin startapp (your app name) ----> 在项目根目录下运行

#### 数据库相关操作

> 更新数据库的两步操作
> 1. python3 manage.py makemigrations  ----> 让Django知道我们更改了数据库的那一部分
> 2. python3 manage.py migrate         ----> 将我们更改的表结构更新到数据库中
> 注意： 这两条命令运行在项目的根目录下； 并且两条命令的执行顺序不能更变

```
数据库介绍：
  'ENGINE': 'django.db.backends.mysql',
  'HOST': 'localhost',
  'PORT': 3306,
  'USER': 'root',
  'PASSWORD': '12345678',
  'NAME': 'music_player'
```



## FQA

> Q: 当碰到这个错误的时候 django.core.exceptions.ImproperlyConfigured: mysqlclient 1.3.13 or newer is required; you have 0.9.3.

```
A: (https://blog.csdn.net/weixin_45476498/article/details/100098297)[https://blog.csdn.net/weixin_45476498/article/details/100098297]
```
