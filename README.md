# SXT-Music
A Vue Project

该项目是由Nuxt.js作为前端框架，结合网易官方API和Django框架完成的API提供服务端操作，该项目实现了简单的WEB版音乐播放器。

> 项目大致结构

```
- SXT-music             # 项目根目录
  - client              # 前端项目
  - NeteaseCloudMusicApi  # 网易api项目
  - server              # Django api 项目
  - README.md           # 项目概要
```

## 前端项目

项目运行步骤
```
$ cd client
$ yarn && yarn install
$ yarn dev
```
项目node环境
> v10.13.0

## 网易接口API
项目运行步骤
```
$ cd NeteaseCloudMusicApi
$ npm run start
```

## Django API 项目

项目运行步骤
```
$ cd server
$ python3 manage.py runserver
```

